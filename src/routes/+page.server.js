import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());
        try {
			await locals.pb.collection('users').authWithPassword(body.email, body.password);
			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				console.log(`notVerified!`)
				return {
					notVerified: true
				};
			}
		} catch (err) {
			console.log('Error: ', err.data);
			throw error(500, 'Something went wrong logging in');
		}
		throw redirect(303, '/home');
    // TODO log the user in
  },
	register: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());
		console.log(`testing register`)
		console.log(body)
		throw redirect(303, '/');

        // let username = generateUsername(body.name.split(' ').join('')).toLowerCase();

		// try {
		// 	await locals.pb.collection('users').create({ username, ...body });
		// 	await locals.pb.collection('users').requestVerification(body.email);
		// } catch (err) {
		// 	console.log('Error: ', err);
		// 	throw error(500, 'Something went wrong');
		// }

	},
    // TODO log the user in
};