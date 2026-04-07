export interface ACTReportData {
  company: {
    name: string;
    nif: string;
    actCode: string;
    dpoName: string;
  };
  assessment: {
    periodStart: string;
    periodEnd: string;
    methodology: string;
    totalWorkersCovered: number;
    participationRate: number;
  };
  departments: {
    name: string;
    workersCount: number;
    overallRisk: "baixo" | "medio" | "alto";
    criticalDimensions: string[];
  }[];
  preventionPlan: {
    dimension: string;
    proposedMeasures: string[];
  }[];
}

export interface AnexoDReportData {
  company: {
    name: string;
    nif: string;
    actCode: string;
    dpoName: string;
  };
  vigilance: {
    periodStart: string;
    periodEnd: string;
    totalExams: number;
    admissionExams: number;
    periodicExams: number;
    occasionalExams: number;
  };
  results: {
    fit: number;
    fitWithConditions: number;
    unfitTemporary: number;
    unfitPermanent: number;
  };
  risks: {
    dimension: string;
    affectedCount: number;
    severity: "low" | "moderate" | "high";
  }[];
}

export function generateACTReportMockData(companyName: string): ACTReportData {
  return {
    company: {
      name: companyName,
      nif: "501234567",
      actCode: "62010 - Consultoria em Informática",
      dpoName: "Dr. João Silva",
    },
    assessment: {
      periodStart: "01/01/2024",
      periodEnd: "31/12/2024",
      methodology: "COPSOQ-II (Versão Portuguesa Media - 44 Itens)",
      totalWorkersCovered: 124,
      participationRate: 0.92,
    },
    departments: [
      { name: "Suporte Técnico", workersCount: 45, overallRisk: "alto", criticalDimensions: ["Exigências Emocionais", "Sintomas de Burnout"] },
      { name: "Engenharia de Software", workersCount: 60, overallRisk: "medio", criticalDimensions: ["Ritmo de Trabalho"] },
      { name: "Recursos Humanos", workersCount: 19, overallRisk: "baixo", criticalDimensions: [] },
    ],
    preventionPlan: [
      {
        dimension: "Exigências Emocionais (Suporte Técnico)",
        proposedMeasures: [
          "1. Triagem automática de tickets sensíveis.",
          "2. Rotação de tarefas a cada 4 horas.",
          "3. Implementação de pausas não estruturadas adicionais."
        ]
      },
      {
        dimension: "Ritmo de Trabalho (Engenharia)",
        proposedMeasures: [
          "1. Revisão do ciclo de Sprints (aumento para 3 semanas).",
          "2. Garantia do 'Direito a Desligar' após as 18h00."
        ]
      }
    ]
  };
}

export function generateAnexoDReportMockData(companyName: string): AnexoDReportData {
  return {
    company: {
      name: companyName,
      nif: "501234567",
      actCode: "62010 - Consultoria em Informática",
      dpoName: "Dr. João Silva",
    },
    vigilance: {
      periodStart: "01/01/2024",
      periodEnd: "31/12/2024",
      totalExams: 124,
      admissionExams: 15,
      periodicExams: 98,
      occasionalExams: 11,
    },
    results: {
      fit: 85,
      fitWithConditions: 32,
      unfitTemporary: 7,
      unfitPermanent: 0,
    },
    risks: [
      { dimension: "Fadiga Vocal (Biometria)", affectedCount: 22, severity: "moderate" },
      { dimension: "Risco de Burnout (PHQ-9 Higher)", affectedCount: 12, severity: "high" },
      { dimension: "Ansiedade Ocupacional (GAD-7)", affectedCount: 35, severity: "low" }
    ]
  };
}
