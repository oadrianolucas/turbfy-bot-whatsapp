import { storage } from "../storage.js";
import { VenomBot } from "../venom.js";
import { STAGES } from "./index.js";

export const initialStage = {
  async exec({ from }) {
    const currentHour = new Date().getHours();
    let message;
    const venombot = await VenomBot.getInstance();

    if (currentHour < 8 || currentHour >= 17) {
      message = `Olá! Nosso atendimento está fora do ar no momento.
Por favor, retorne entre 🕗 08:00 e 17:00.
Agradecemos pela compreensão!`;
    } else {
      storage[from].stage = STAGES.MENU;
      message = `Olá, como você está? 😁

Me chamo *Fabi* 👩 assistente virtual da ${venombot.getSessionName}🚀.
    
Como posso te ajudar hoje?
    
1️⃣ - Marketing Digital.
2️⃣ - Materiais Gráficos.
3️⃣ - Sistemas.
4️⃣ - Status do Projeto/Pedido.
0️⃣ - Falar com um atendente humano.
`;
    }
    await venombot.sendText({ to: from, message });
  },
};
