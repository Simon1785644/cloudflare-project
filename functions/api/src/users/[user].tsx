interface IContext {
    env:Env
    params:{ 
        user: BodyInit | undefined; 
    };
}

export function onRequest(context:IContext) {
    return new Response(context.params.user)
}  