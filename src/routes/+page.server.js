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
			const body = Object.fromEntries(await request.formData());
			const { boardId, title } = body;
			await locals.pb.collection('boards').update(boardId,{title});
			return {
				success:true
			}
		} catch (error) {
			console.log(`ran into an issue`,error.data)
		}
	},
	createBoard: async({ request, locals}) => {
		try {
			const body = Object.fromEntries(await request.formData());
			const { user, title, assigned, boardOrder, boardOrderId} = body;
			const newboardList = boardOrder.split(',');
			const data = {title,user,assigned};
			const newBoard =  await locals.pb.collection('boards').create(data);
			const { id } = newBoard;
			newboardList.push(id)
			await locals.pb.collection('boardorder').update(boardOrderId, {boards:newboardList});
			return {
				success:true
			}
		} catch (error) {
			console.log(`ran into an issue`,error.data)
		}
	},
	createTask: async ({ request, locals }) => {
		try {
			const body = Object.fromEntries(await request.formData());
			console.log(`body :`,body)
			const {title, userId:user, assignedUsers, boardId, boardTasks} = body;
			const assigned = []
			if(assignedUsers){
				assigned.push(...assignedUsers.split(','));	
			}
			const newTask = {title,user,assigned};
			const {id:newTaskId} = await locals.pb.collection('tasks').create(newTask);
			const newTaskList = [newTaskId];
			newTaskList.push(...boardTasks.split(','));
			const taskData = {newTask,newTaskId,newTaskList,boardId};
			await locals.pb.collection('boards').update(boardId,{tasks:newTaskList});
			return {
				success: true,
				taskData: taskData
			};
		} catch (error) {
			console.log(error.data);
			return fail(400,
				{
					error:error.data					
				})
		}
	},
};

export async function load({ locals }) {
	if(locals.user){
		const boards = await locals.pb.collection('boards').getFullList(200, {
			expand: 'tasks,tasks.files,tasks.assigned'
		});
		const users = await locals.pb.collection('users').getFullList(200, {
			filter: `verified=true`
		});
		const boardOrderList = await locals.pb.collection('boardorder').getFullList(200,{});
		const newBoards = boardOrderList[0].boards;
		const newList = [];
		newBoards.map((element) => {
			boards.forEach((board) => {
				if(!board.expand.tasks){
					board.expand.tasks = [];
				}
				if(board.id == element) {
					newList.push(board);
				}
				
			});
		});
		const boardInfo = structuredClone(boardOrderList);
		const boardData = structuredClone(newList);
		const userData = structuredClone(users);
		return {
			boards: boardData,
			boardInfo: boardInfo,
			users: userData
		};
	};
}
