import PocketBase from 'pocketbase'
import { serializeNonPOJOs } from './lib/utils';

export const handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase('http://127.0.0.1:8090')
    // load the store data from the request cookie string
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
        if (event.locals.pb.authStore.isValid) {
            event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model)
        } else {
            event.locals.user = undefined;
        }
        if (event.url.pathname.startsWith("/.")) {
            if(!event.locals.user) {
                return Response.redirect(`${event.url.origin}`,303)
    
            }
        }
        
    } catch (_) {
        // clear the auth store on failed refresh
        event.locals.pb.authStore.clear();
    }
    
    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));
    return response;
}