import {
    error,      // creates error responses
    json,       // creates JSON responses
    Router,     // the ~440 byte router itself
    withParams, // middleware: puts params directly on the Request
  } from 'itty-router'
import { getAllProducts } from './products/products';
import { findItemByPK, findItemByKeyword, getPopularItem, findItemByGTIN } 
from './products/[[productId]]';

export interface Env {
    // If you set another name in wrangler.toml as the value for 'binding',
    // replace "DB" with the variable name you defined.
    DB: D1Database;
}

// Create a new router
const router = Router();

/*
Our index route, a simple hello world.
*/
router.get('/', () => {
	return new Response('Hello, world! This is the root page of your Worker template.');
});

/** TODO: finish routers below:
router.post("/", authJwt.verifyAdmin, create);
router.get("/", findAll);
router.get("/sp", findAllPopularItems)
router.get("/stockout", authJwt.verifyAdmin, findAllUnavailableProducts);
router.get("/:id", findByGTIN);
router.put("/:id/stock", authJwt.verifyUser, updateStock);
router.put("/:id", authJwt.verifyAdmin, update);
router.delete("/:id", authJwt.verifyAdmin, deleteOne);
router.delete("/", authJwt.verifyAdmin, deleteAll);
 */

router.get('/products', async(req, env:Env) => {
	const results = await getAllProducts(env);
	return results || error(404, 'No product found')}
)

router.get('/product/:pk', async({params}, env:Env) => {
	const key = Number(decodeURIComponent(params.pk));
	const result = await findItemByPK(env, key);
	return	result || error(404, `Product pk:${key} not found`)
	}
)

router.get('/products/:id', async({params}, env:Env) => {
	const GTIN = decodeURIComponent(params.id);
	const result = await findItemByGTIN(env, GTIN);
	return	result || error(404, `Item GTIN:${GTIN} not found`);
})

router.get('/products/k=:text', async({params}, env:Env) => {
	const k:string = decodeURIComponent(params.text);
	const results:Response = await findItemByKeyword(env, k);
	return	results || error(404, `Product name includes '${k}' not found`);
})

router.get('/products/popularItem', async(req, env:Env) => {
	const results = await getPopularItem(env);
	return results || error(404, 'No popular item found');
})

/*
This route demonstrates path parameters, allowing you to extract fragments from the request
URL.

Try visit /example/hello and see the response.
*/
/*router.get('/example/:text', ({ params }) => {
	// Decode text like "Hello%20world" into "Hello world"
	let input = decodeURIComponent(params.text);

	// Serialise the input into a base64 string
	let base64 = btoa(input);

	// Return the HTML with the string to the client
	return new Response(`<p>Base64 encoding: <code>${base64}</code></p>`, {
		headers: {
			'Content-Type': 'text/html',
		},
	});
});*/

/*
This shows a different HTTP method, a POST.

Try send a POST request using curl or another tool.

Try the below curl command to send JSON:

$ curl -X POST <worker> -H "Content-Type: application/json" -d '{"abc": "def"}'
*/
/*router.post('/post', async request => {
	// Create a base object with some fields.
    if (!request.cf) {
        return new Response('Sorry, requested cf property is undefined.');
    }
	let fields = {
		asn: request.cf.asn,
		colo: request.cf.colo
	};

	// If the POST data is JSON then attach it to our response.
	if (request.headers.get('Content-Type') === 'application/json') {
		let json = await request.json();
		Object.assign(fields, { json });
	}

	// Serialise the JSON to a string.
	const returnData = JSON.stringify(fields, null, 2);

	return new Response(returnData, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
});*/

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all('*', () => new Response('404, not found!', { status: 404 }));

export default {
	fetch: router.handle,
};