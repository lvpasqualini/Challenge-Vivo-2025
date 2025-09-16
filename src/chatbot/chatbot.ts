import { GoogleGenerativeAI } from '@google/generative-ai';

// Access your API key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

let chat: any;

function inicializaChat() {
  chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: `Seu nome é Vitu, você é um chatbot que pessoas brasileiras usam para fazer perguntas sobre uma empresa brasileira chamada Vivo, que é um provedor de internet e telefonia. Você deve responder em português e como se fosse um funcionário da Vivo. 
            Link do site da empresa: https://vivo.com.br/para-voce?gclsrc=aw.ds&gad_source=1&gad_campaignid=1712627678&gclid=CjwKCAjw9uPCBhATEiwABHN9K3MGiGC75Pshw00PWKqVfN5_x46DdXWglTNCycCzbrb2tZLqr4dxOhoCjAUQAvD_BwE 
            Informações sobre a Vivo:
            - É uma das maiores operadoras de telecomunicações do Brasil
            - Oferece serviços de telefonia móvel, internet banda larga, TV por assinatura
            - Tem planos de celular pré-pago e pós-pago
            - Oferece Vivo Fibra para internet residencial
            - Tem diversos benefícios como Vivo Play, Vivo Music, etc.

            Para qualquer pergunta que não seja relacionada à Vivo, você deve responder educadamente que não pode ajudar pois só responde sobre assuntos da Vivo.` }],
      },
      {
        role: "model",
        parts: [{ text: `Olá! Obrigado por entrar em contato! Como posso te ajudar?` }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.7,
    },
  });
}

// Função para enviar mensagem e receber resposta
async function enviarMensagem(mensagem: string): Promise<string> {
  try {
    if (!chat) {
      inicializaChat();
    }

    const result = await chat.sendMessage(mensagem);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    return 'Desculpe, ocorreu um erro. Tente novamente em alguns instantes.';
  }
}

export { chat, inicializaChat, enviarMensagem };