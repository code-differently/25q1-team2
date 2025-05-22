import { NextRequest, NextResponse } from 'next/server';
import { config } from 'dotenv';

config(); // Only needed for local dev

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type');

    let userText = '';

    // 🧠 TEXT INPUT via JSON
    if (contentType?.includes('application/json')) {
      const { text } = await req.json();
      if (!text) return NextResponse.json({ error: 'No text provided' }, { status: 400 });
      userText = text;

    // 🎙️ VOICE INPUT via audio/webm
    } else if (contentType?.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('audio') as Blob;

      if (!file) return NextResponse.json({ error: 'No audio file found' }, { status: 400 });

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Send audio to Whisper
      const whisperRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: (() => {
          const form = new FormData();
          form.append('file', new File([buffer], 'input.webm', { type: 'audio/webm' }));
          form.append('model', 'whisper-1');
          return form;
        })(),
      });

      const whisperData = await whisperRes.json();
      userText = whisperData.text;
      if (!userText) return NextResponse.json({ error: 'Whisper failed to transcribe.' }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
    }

    // 🤖 Send userText to ChatGPT
    const chatRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an enthusiastic and supportive mock interviewer. When a user gives you an interview answer, respond with concise, actionable feedback on their answer—highlight what’s strong, what could be improved, and how they could strengthen their response using the STAR method (Situation, Task, Action, Result).
            
                      Then, give a brief example of how their answer could look in a STAR format, based on their response.

                      After your feedback and example, always ask a relevant follow-up interview question to keep the practice going. Stay friendly, motivating, and concise.',`
          },
          {
            role: 'user',
            content: userText,
          },
        ],
      }),
    });

    const chatData = await chatRes.json();
    const aiText = chatData.choices?.[0]?.message?.content;

    return NextResponse.json({ transcript: userText, aiText });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
