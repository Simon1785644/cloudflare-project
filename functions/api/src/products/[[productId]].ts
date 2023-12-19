
/**
 * Perform a search by PK.
 * 
 * @param env 
 * @param id 
 * @returns 
 */
export async function findItemByPK(env:Env, id:number) {
    const stmt = await env.DB.prepare('SELECT * FROM products WHERE id = ?1').bind(id).all();
    return Response.json(stmt.results);
}

export async function findItemByGTIN(env:Env, gtin:string) {
    const { results } = await env.DB.prepare('SELECT * FROM products WHERE gtin = ?1').bind(gtin).all();
    return Response.json(results);
}

/**
 * Perform a search using SQL’s LIKE operator.
 * 
 * @param env 
 * @param keyword 
 * @returns 
 */
export async function findItemByKeyword(env:Env, keyword:string) {
    const { results } = await env.DB.prepare('SELECT * FROM products WHERE title LIKE ?1').bind(`%${keyword}%`).all();
    return Response.json(results);
}

export async function getPopularItem(env:Env) {
    const stmt = await env.DB.prepare('SELECT * FROM products WHERE popularItem = ?').bind(1).all();
    return Response.json(stmt.results);
}

/*export function onRequestGet(context:EventContext<Env, any, Record<string, unknown>>):PagesFunction<Env> {
    const id = context.params.id;

    if (!id) {
        return new Response('Not found', { status: 404 })
    }

    const post = posts.find(post => post.id === Number(id))

    if (!post) {
        return new Response('Not found', { status: 404 })
    }

    return Response.json(post)
}*/