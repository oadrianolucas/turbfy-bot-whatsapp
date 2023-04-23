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

    const msg = `🙌 Obrigado por compartilhar informações conosco!
    
Em breve, nossa equipe entrará em contato para ajudar com suas necessidades.
    
Fique atento ao seu WhatsApp! 📲`;

    await VenomBot.getInstance().sendText({ to: from, message: msg });
  },
};
