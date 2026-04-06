import { MiniMaxSimulator } from "../ai/m27-simulator";

export interface SOSRiskAnalysis {
  risk_score: number; // 0 to 1
  intent: "normal" | "distress" | "crisis" | "whistleblower";
  summary: string;
  recommended_action: string;
  requires_human: boolean;
}

export class SOSRiskEngine {
  private ai: MiniMaxSimulator;

  constructor() {
    this.ai = new MiniMaxSimulator({
      memory: { sampling_temperature: 0.1 } // High precision for clinical triage
    });
  }

  public async analyzeMessage(message: string, history?: string[]): Promise<SOSRiskAnalysis> {
    const systemPrompt = `
      Você é o PsicoRisco SOS Triage Engine (M2.7). 
      Sua missão é avaliar o risco psicossocial imediato em mensagens de colaboradores.
      
      Classifique o risco de 0 a 1 e identifique a intenção:
      - 'normal': Dúvidas gerais ou conversa casual.
      - 'distress': Sinais de stress, cansaço extremo ou desabafo emocional.
      - 'crisis': Sinais de desespero, ideação de auto-flagelação ou pedido direto de socorro.
      - 'whistleblower': Indícios de assédio moral/sexual, fraude, corrupção ou denúncia grave.
      
      Responda ESTRITAMENTE em JSON:
      {
        "risk_score": number,
        "intent": "normal" | "distress" | "crisis" | "whistleblower",
        "summary": "resumo de 1 frase",
        "recommended_action": "orientação curta",
        "requires_human": boolean
      }
    `;

    const userPrompt = `Mensagem do colaborador: "${message}". ${history ? `Contexto anterior: ${history.join(" | ")}` : ""}`;

    // Reutilizando o padrão invoker do projeto
    const response = await (this.ai as any).invokeMinimax(systemPrompt, userPrompt);

    if (response) {
      try {
        const cleanJson = response.replace(/```json\n?|\n?```/g, '').trim();
        return JSON.parse(cleanJson) as SOSRiskAnalysis;
      } catch (e) {
        console.error("[SOS_RISK_ENGINE] Erro no parse da IA:", e);
      }
    }

    // Fallback de Segurança (Lei 102/2009 Compliance & Lei 93/2021)
    const isCrisis = /socorro|ajuda|morrer|acabar|urgente|112/i.test(message);
    const isWhistleblower = /assédio|abuso|fraude|corrupção|denúncia/i.test(message);
    
    let intentLabel: "normal" | "distress" | "crisis" | "whistleblower" = "normal";
    let score = 0.3;
    let rec = "Monitorização basal.";
    let human = false;

    if (isCrisis) {
      intentLabel = "crisis"; score = 0.9;
      rec = "Escalar para humano imediatamente."; human = true;
    } else if (isWhistleblower) {
      intentLabel = "whistleblower"; score = 0.95;
      rec = "Encaminhar para Canal Seguro do DPO/Compliance."; human = true;
    }

    return {
      risk_score: score,
      intent: intentLabel,
      summary: "Análise via fallback de segurança dinâmico.",
      recommended_action: rec,
      requires_human: human
    };
  }
}
