  
export default {
    async fetch(request: Request, env: Env) {
      const { pathname } = new URL(request.url);
      let stmt:D1Result<Record<string, unknown>>;
  
      switch (pathname) {
        case "/api/products":
          const stmt = await env.DB.prepare('SELECT * FROM products').all();
          return stmt.results;
      };
      if (pathname === "/api/users") {
        // If you did not use `DB` as your binding name, change it here
        const { results } = await env.DB.prepare(
          "SELECT * FROM users WHERE isAdmin = ?"
        // Call bind() to safely and securely bind a value to 
        // that placeholder.
        // Using bind() prevents users from executing arbitrary SQL 
        // (known as “SQL injection”) modify your database.
        ).bind(0)
        // Call all() to return all rows (or none, if the query returns none).
        .all();
        // Return results in JSON format.
        return Response.json(results);
      } else if (pathname === "/api/users/:id") {
        const stmt = await env.DB.prepare('SELECT * FROM users WHERE username = ?1').bind('Martin').all();
        return Response.json(stmt.results);
      };
  
      return new Response(
        "Oops! Nothing found here, did you type in wrong path?"
      );
    }
};
  