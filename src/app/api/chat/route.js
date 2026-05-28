export async function POST(request) {
     try {
       const { message, model, messages } = await request.json();

       const response = await fetch('http://localhost:11434/api/chat', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           model: model,
           messages: [...messages, { role: 'user', content: message }],
           stream: false
         })
       });

       const data = await response.json();
       return Response.json(data);
     } catch (error) {
       return Response.json({ error: error.message }, { status: 500 });
     }
   }