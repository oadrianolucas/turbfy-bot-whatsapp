import { VenomBot } from "../venom.js";
import { storage } from "../storage.js";
import { STAGES } from "./index.js";

export const stageFour = {
  async exec({ from, message }) {
    storage[from].stage = STAGES.FALAR_COM_ATENDENTE;

    storage[from].finalStage = {
      startsIn: new Date().getTime(),
      endsIn: new Date().setSeconds(60),
    };

    const itens = storage[from].itens;
    const desserts = itens.map((item) => item.description).join(", ");
    const total = storage[from].itens.length;

    const msg = `🙌 Agradecemos por compartilhar as informações sobre
sua empresa ou projeto conosco! Em breve, nossa equipe entrará em
contato para oferecer a melhor solução para suas necessidades.
Fique atento ao seu WhatsApp! 📲`;

    await VenomBot.getInstance().sendText({ to: from, message: msg });
  },
};
