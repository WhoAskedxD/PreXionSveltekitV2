import { serializeNonPOJOs } from '$lib/utils';

export const load = (async ({locals}) => {
    const contactList = serializeNonPOJOs(await locals.pb.collection('contacts').getFullList(50,{sort:'department'}));
    return {
        contacts:contactList,
    };
})