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
			if (err.data) {
				return fail(400, {
					fail: err.data.message
				});
			}
			throw error(500, 'Something went wrong logging in');
		}
		throw redirect(303, '/');
	},
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		let username = body.name.split(' ').join('').toLowerCase();
		const { confirm_password: passwordConfirm } = body;
		try {
			await locals.pb.collection('users').create({ username, passwordConfirm, ...body });
			await locals.pb.collection('users').requestVerification(body.email);
		} catch (err) {
			if (err.data.data) {
				const { email = '', password = '', passwordConfirm = '' } = err.data.data;
				return fail(400, {
					error: email.message || password.message || passwordConfirm.message
				});
			}
			throw error(500, `Something went wrong ${JSON.stringify(err.data)}`);
		}
		return {
			registered: true
		};
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
	updateBoard: async({ request, locals}) => {
		try {
			console.log(`running updateBoard.`);
		} catch (error) {
			console.log(`ran into an issue`,error.data)
		}
	},
	createTask: async ({ request, locals }) => {
		try {
			const body = Object.fromEntries(await request.formData());
			const {title, userId:user, boardId} = body;
			const newTask = {title,user};
			const {id:newTaskId} = await locals.pb.collection('tasks').create(newTask);
			const taskData = {newTask,boardId,newTaskId};
			console.log(taskData);
			return {
				success: true,
				taskData: taskData
			};
		} catch (error) {
			console.log(error.data);
		}
	},

};

export async function load({ locals }) {
	const boards = await locals.pb.collection('boards').getFullList(200, {
		filter: `assigned~"${locals.user?.id}" || user="${locals.user?.id}"`,
		expand: 'tasks,tasks.files,tasks.assigned'
	});
	const users = await locals.pb.collection('users').getFullList(200, {
		filter: `verified=true`
	});
	const boardData = structuredClone(boards);
	const userData = structuredClone(users);
	return {
		boards: boardData,
		users: userData
	};
}
