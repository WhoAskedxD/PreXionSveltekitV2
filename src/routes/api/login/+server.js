import { json } from '@sveltejs/kit';
 
/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
  const body = await event.request.formData();
  console.log(body.get('email'),body)
  // log all fields 
  console.log([...body]);
 
  return json({
    // get a specific field's value
    name: body.get('name') ?? 'world'
  });
}