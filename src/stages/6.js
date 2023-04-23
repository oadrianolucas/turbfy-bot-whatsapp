import { VenomBot } from "../venom.js";
import { menu_grafica } from "../menu_grafica.js";
import { storage } from "../storage.js";
import { STAGES } from "./index.js";
import { outros_grafica } from "./outros_grafica.js";

export const stageSix = {
  async exec(params) {
    const message = params.message.trim();
    const isMsgValid = /[1|2|3|4|5|✅|❌|/]/.test(message);

    let msg =
      "❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️";

    if (isMsgValid) {
      if (["✅", "❌"].includes(message)) {
        const option = options[message]();
        msg = option.message;
        storage[params.from].stage = option.nextStage;
      } else {
        msg =
          `🖌 *${menu_grafica[message].title}* \n` +
          "```Está correto sua escolha?``` \n" +
          "\n-----------------------------------\n✅ - Confirmar Escolha! \n❌ - Voltar para  inícial.";
        storage[params.from].itens.push(menu_grafica[message]);
      }

      if (storage[params.from].stage === STAGES.INICIAL) {
        storage[params.from].itens = [];
      }
    }

    await VenomBot.getInstance().sendText({ to: params.from, message: msg });
  },
};

const options = {
  "❌": () => {
    const message =
      "🚫 Atendimento *CANCELADO* com sucesso. \nVolte Sempre! 👋";

    return {
      message,
      nextStage: STAGES.INICIAL,
    };
  },
  "✅": () => {
    const message =
      "🧙 Agora, informe o seu *NOME COMPLETO*. \n ( ```Ex: José Augusto...``` ) \n\n " +
      "\n-----------------------------------\n* - Voltar para  inícial.";

    return {
      message,
      nextStage: STAGES.RESUMO,
    };
  },
};
