import { VenomBot } from "../venom.js";
import { menu } from "../menu.js";
import { storage } from "../storage.js";
import { graphicServices } from "./graphicServices.js";
import { initialStage } from "./0.js";
import { STAGES } from "./index.js";

export const stageOne = {
  async exec(params) {
    const message = params.message.trim();
    const isMsgValid = /[0|1|2]/.test(message);

    let msg = `❌ Por favor, insira uma opção válida, apenas uma de cada vez.`;

    if (isMsgValid) {
      const option = options[Number(message)];
      if (option) {
        const optionResult = option();
        msg = optionResult.message;
        storage[params.from].stage = optionResult.nextStage || STAGES.INICIAL;
      }
    }

    await VenomBot.getInstance().sendText({ to: params.from, message: msg });

    if (storage[params.from].stage === STAGES.INICIAL) {
      await initialStage.exec(params);
    } else if (storage[params.from].stage === STAGES.FALAR_COM_ATENDENTE) {
      storage[params.from].finalStage = {
        startsIn: new Date().getTime(),
        endsIn: new Date().setSeconds(60), // 1 minute of inactivity
      };
    }
  },
};

const options = {
  1: () => {
    let message = "Estratégias de Marketing Digital 🌐 \n\n";
    let footerMsg =
      "Escolha uma das opções a cima 👆 para agilizar o seu atendimento.";

    Object.keys(menu).forEach((value) => {
      message += `${numbers[value]} - _${menu[value].description}_ \n`;
    });

    return {
      message,
      nextStage: STAGES.CARRINHO,
      footerMsg,
    };
  },
  2: () => {
    const message =
      "\n-----------------------------------\n1️⃣ - ```FAZER PEDIDO``` \n0️⃣ - ```FALAR COM ATENDENTE```\n\n" +
      graphicServices +
      "\n-----------------------------------\n1️⃣ - ```FAZER PEDIDO``` \n0️⃣ - ```FALAR COM ATENDENTE``` ";

    return {
      message,
      nextStage: null,
    };
  },
  0: () => {
    return {
      message:
        "🔃 Encaminhando você para um atendente. \n⏳ *Aguarde um instante*.\n \n⚠️ A qualquer momento, digite *ENCERRAR* para encerrar o atendimento. ⚠️",
      nextStage: STAGES.FALAR_COM_ATENDENTE,
    };
  },
};

const numbers = {
  1: "1️⃣",
  2: "2️⃣",
  3: "3️⃣",
  4: "4️⃣",
  5: "5️⃣",
};
