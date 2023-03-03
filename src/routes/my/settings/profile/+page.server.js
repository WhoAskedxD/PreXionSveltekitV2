import { error, fail } from '@sveltejs/kit';

export const actions = {
	updateProfile: async ({ request, locals }) => {
		let data = await request.formData();
		const userAvatar = data.get('avatar');
		if (userAvatar.size === 0) {
			data.delete('avatar');
		}
		try {
			const { name, avatar } = await locals.pb.collection('users').update(locals?.user?.id, data);
			locals.user.name = name;
			locals.user.avatar = avatar;
		} catch (err) {
			console.log('Error: ', err.data);
			if(err.data){
				return fail(400,{
					fail:err.data.message
				})
			}
			throw error(400, 'Something went wrong updating your profile');
		}
		return {
			success: true
		};
	},
	updateEmail: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('users').requestEmailChange(data.email);
		} catch (err) {
			throw error(err.status, err.message);
		}

		return {
			success: true
		};
	},
};
