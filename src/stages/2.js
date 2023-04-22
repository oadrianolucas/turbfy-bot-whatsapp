import { VenomBot } from "../venom.js";
import { menu } from "../menu.js";
import { storage } from "../storage.js";
import { STAGES } from "./index.js";

export const stageTwo = {
  async exec(params) {
    const message = params.message.trim();
    const isMsgValid = /[1|2|3|4|5|#|*]/.test(message);

    let msg =
      "❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️";

    if (isMsgValid) {
      if (["1", "2"].includes(message)) {
        const option = options[message]();
        msg = option.message;
        storage[params.from].stage = option.nextStage;
      } else {
        msg =
          `🖌 *${menu[message].description}* \n\n` +
          "```Está correto sua escolha?``` \n" +
          "\n-----------------------------------\n1 - ✅ Confirmar Escolha! \n2 - ❌ Voltar para  inícial.";
        storage[params.from].itens.push(menu[message]);
      }

      if (storage[params.from].stage === STAGES.INICIAL) {
        storage[params.from].itens = [];
      }
    }

    await VenomBot.getInstance().sendText({ to: params.from, message: msg });
  },
};

const options = {
  "*": () => {
    const message = "Atendimento *CANCELADO* com sucesso. \n Volte Sempre!";

    return {
      message,
      nextStage: STAGES.INICIAL,
    };
  },
  "#": () => {
    const message =
      "🧙 Agora, informe o seu *NOME COMPLETO*. \n ( ```Ex: José Augusto...``` ) \n\n " +
      "\n-----------------------------------\n[ * ] - Voltar para menu inícial.";

    return {
      message,
      nextStage: STAGES.RESUMO,
    };
  },
};
