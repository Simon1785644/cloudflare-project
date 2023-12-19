// Note: You would need to compile your TS into JS and output it as a `_worker.js` file. We do not read `_worker.ts`

interface Env {
    ASSETS: Fetcher;
}
  
  export default {
    async fetch(request: Request, env: Env) {
      const { pathname } = new URL(request.url);
      if (pathname.startsWith('/api/')) {
        // TODO: Add your custom /api/* logic here.
        return new Response('Ok');
      }
      // Otherwise, serve the static assets.
      // Without this, the Worker will error and no assets will be served.
      return env.ASSETS.fetch(request);
    },
  }
  