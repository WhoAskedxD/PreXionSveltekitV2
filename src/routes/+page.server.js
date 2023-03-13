import { error, fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			await locals.pb.collection('users').authWithPassword(body.email, body.password);
			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err) {
			// console.log('Error: ', err.data);
			if(err.data){
				return fail(400,{
					fail:err.data.message
				})
			}
			throw error(500, 'Something went wrong logging in');
		}
		throw redirect(303, '/');
	},
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		let username = (body.name.split(' ').join('')).toLowerCase();
		const {confirm_password:passwordConfirm } = body
		try {
			await locals.pb.collection('users').create({ username,passwordConfirm, ...body });
			await locals.pb.collection('users').requestVerification(body.email);
		} catch (err) {
			if (err.data.data){
				const {email = '',password = '',passwordConfirm = ''} = err.data.data
				return fail(400,{
					error: email.message || password.message || passwordConfirm.message
				})
			}
			throw error(500, `Something went wrong ${JSON.stringify(err.data)}`);
		}
		return {
			registered:true
		}
	},
	resetPassword: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('users').requestPasswordReset(body.email);
			return {
				success: true
			};
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong');
		}
	},
};

export async function load({locals}) {
	const taskData = await fetch(`http://192.168.1.100:5000/api/collections/task/records/?filter=(user=${locals.user.id})`); 
	return {
		task: structuredClone(taskData)
	};
};