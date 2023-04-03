import { json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    const body = await request.json();
    const {recordID , boardorder } = body
    try {
        locals.pb.collection('boardorder').update(recordID,{boards:boardorder})
    } catch (error) {
        console.log(`Server error on tasks `,error.data);
    }
    return json({
        message:`New board order for boardorder id `,
        newTask:body
    })
}