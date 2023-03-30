import { json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    const body = await request.json();
    console.log(`body is :`,body);

    return json({
        message:`New Task order for board id `,
        newTask:body
    })
}