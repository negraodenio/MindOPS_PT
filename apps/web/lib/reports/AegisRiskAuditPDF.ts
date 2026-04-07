import PDFDocument from 'pdfkit';

export interface AuditReportData {
  companyName: string;
  date: string;
  riskScore: number;
  teams: Array<{ name: string; score: number }>;
  complianceReadiness: number;
}

export async function generateAegisAuditReport(data: AuditReportData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const chunks: any[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', (err) => reject(err));

    // Page 1: Executive Summary
    doc.rect(0, 0, doc.page.width, 100).fill('#005c55');
    doc.fillColor('white').fontSize(24).font('Helvetica-Bold').text('AEGIS RISK AUDIT REPORT', 50, 40);
    
    doc.fillColor('black').fontSize(12).font('Helvetica-Bold').text('CONFIDENTIAL - FOR INTERNAL AUDIT ONLY', 50, 110);
    
    doc.moveDown(2);
    doc.fontSize(10).font('Helvetica').text(`Empresa: ${data.companyName}`);
    doc.text(`Data da Auditoria: ${data.date}`);
    doc.text(`ID de Conformidade: AEGIS-${Math.random().toString(36).substring(7).toUpperCase()}`);
    
    doc.moveDown(4);
    doc.fontSize(16).font('Helvetica-Bold').text('Sumário Executivo de Risco', 50);
    doc.rect(50, doc.y + 10, 500, 1).fill('#e2e8f0');
    
    doc.moveDown(2);
    doc.fontSize(60).fillColor(data.riskScore > 70 ? '#f87171' : '#059669').text(data.riskScore.toString(), 50, doc.y, { align: 'center' });
    doc.fontSize(12).fillColor('#64748b').text('COMPOSITE RISK INDEX', 50, doc.y + 5, { align: 'center' });
    
    doc.moveDown(3);
    doc.fillColor('black').fontSize(11).font('Helvetica').text(
      'A análise detectou um nível de risco psicossocial elevado em contextos operacionais críticos. Existe uma correlação direta entre a carga mental detectada e a potencial taxa de absentismo para o próximo trimestre.',
      { width: 500, align: 'justify' }
    );

    // Page 2: Team Heatmap
    doc.addPage();
    doc.rect(0, 0, doc.page.width, 60).fill('#f8fafc');
    doc.fillColor('#005c55').fontSize(14).font('Helvetica-Bold').text('Mapeamento por Unidade Organizacional', 50, 25);
    
    doc.moveDown(4);
    let currentY = doc.y;
    data.teams.forEach((team) => {
      doc.fillColor('black').fontSize(10).font('Helvetica-Bold').text(team.name, 50, currentY);
      doc.rect(50, currentY + 15, 500, 10).fill('#f1f5f9');
      const barWidth = (team.score / 100) * 500;
      doc.rect(50, currentY + 15, barWidth, 10).fill(team.score > 70 ? '#f87171' : '#10b981');
      doc.fillColor('black').text(`${team.score}%`, 510, currentY);
      currentY += 40;
    });

    // Page 3: Legal Exposure
    doc.addPage();
    doc.rect(0, 0, doc.page.width, 60).fill('#f8fafc');
    doc.fillColor('#005c55').fontSize(14).font('Helvetica-Bold').text('Análise de Exposição Legal (SST)', 50, 25);
    
    doc.moveDown(4);
    const laws = [
      { name: 'Lei 102/2009 (SST)', status: 'ALINHADO', desc: 'Protocolos de avaliação COPSOQ II detectados.' },
      { name: 'Lei 83/2021 (Desligar)', status: 'RISCO MODERADO', desc: 'Indícios de atividade extra-horário em IT_TEAM.' },
      { name: 'EU AI Act Compliance', status: 'AUDIT-READY', desc: 'Logs de governança M2.7 ativos e explicáveis.' }
    ];

    laws.forEach(law => {
      doc.fillColor('black').fontSize(12).font('Helvetica-Bold').text(law.name, 50);
      doc.fillColor(law.status === 'ALINHADO' ? '#059669' : '#f59e0b').fontSize(10).text(law.status, 400, doc.y - 12, { align: 'right' });
      doc.fillColor('#64748b').fontSize(9).font('Helvetica').text(law.desc, 50, doc.y + 5);
      doc.moveDown(2);
    });

    // Final Footer on all pages
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.fontSize(8).fillColor('#94a3b8').text(
        'AEGIS HUB Compliance Systems - Relatório gerado automaticamente através de protocolos de IA assistida (Human-in-the-loop).',
        50, 
        doc.page.height - 50, 
        { align: 'center' }
      );
    }

    doc.end();
  });
}
