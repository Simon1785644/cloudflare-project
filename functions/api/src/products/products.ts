
export async function getAllProducts(env:Env) {
    const stmt = await env.DB.prepare('SELECT * FROM products').all();
    return Response.json(stmt.results);
}