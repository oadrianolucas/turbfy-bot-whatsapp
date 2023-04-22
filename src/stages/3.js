import { VenomBot } from "../venom.js";
import { storage } from "../storage.js";
import { STAGES } from "./index.js";

export const stageThree = {
  async exec({ from, message }) {
    storage[from].address = message;
    storage[from].stage = STAGES.PEDIDO;

    let msg = "Atendimento *CANCELADO* com sucesso. \n Volte Sempre!";
    if (message === "*") {
      storage[from].stage = STAGES.INICIAL;
    } else {
      const itens = storage[from].itens;
      const desserts = itens.map((item) => item.description).join(", ");
      msg =
        `🗒️ *RESUMO DO ATENDIMENTO*: \n🔥 Produto: *${desserts}* \n😄 Nome: *${message}* \n\n` +
        "🔊 ```Agora, gostaríamos de saber mais sobre sua empresa ou projeto. Por favor, envie-nos um áudio ou texto com mais informações.```";
    }
    await VenomBot.getInstance().sendText({ to: from, message: msg });
  },
};
