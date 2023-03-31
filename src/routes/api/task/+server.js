import { json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    const body = await request.json();
    const {boardId , tasksOrder } = body
    console.log(`body is :`,boardId, tasksOrder);
    try {
        locals.pb.collection('boards').update(boardId,{tasks:tasksOrder})
    } catch (error) {
        console.log(`Server error on tasks `,error.data);
    }
    return json({
        message:`New Task order for board id `,
        newTask:body
    })
}