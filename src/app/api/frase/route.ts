import { NextResponse } from 'next/server';

export async function GET() {

  try {
    const apiKey = process.env.COHERE_API_KEY;

    if(!apiKey){
      throw new Error("API Key no encontrada")
    }

    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Escribe una frase motivacional para una persona con depresion, diferente y única. Tiempo: ${new Date().toISOString()}`,
        temperature: 0.9,
      }),
    });

    const data = await response.json();
    const frase = data.text?.trim() || 'No se pudo generar una frase.';

    return NextResponse.json({ frase });
  } catch (error) {
    console.error('Error al generar la frase:', error);
    return NextResponse.json({ error: 'Error generando frase' }, { status: 500 });
  }
}
