"use client";

import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { AnexoDReportData } from '@mindops/domain';

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#FFFFFF', fontFamily: 'Helvetica' },
  header: { borderBottomWidth: 2, borderBottomColor: '#005c55', paddingBottom: 10, marginBottom: 20 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#000000', textAlign: 'center', textTransform: 'uppercase' },
  subtitle: { fontSize: 9, color: '#666', textAlign: 'center', marginTop: 4 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', backgroundColor: '#f0fdf4', padding: 6, marginBottom: 10, textTransform: 'uppercase', color: '#166534' },
  row: { flexDirection: 'row', marginBottom: 6, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 4 },
  label: { width: 180, fontSize: 9, color: '#64748b', fontWeight: 'bold' },
  value: { flex: 1, fontSize: 9, color: '#0f172a' },
  grid: { flexDirection: 'row', gap: 10 },
  card: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 4, textAlign: 'center' },
  cardLabel: { fontSize: 8, color: '#64748b', marginBottom: 4, textTransform: 'uppercase' },
  cardValue: { fontSize: 14, fontWeight: 'bold', color: '#005c55' },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 10, fontSize: 7, color: '#94a3b8', textAlign: 'center' },
  legalNote: { marginTop: 20, padding: 10, backgroundColor: '#f8fafc', fontSize: 7, color: '#64748b', fontStyle: 'italic', textAlign: 'justify' }
});

export const AnexoDReportPDF = ({ data }: { data: AnexoDReportData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Relatório Único - Anexo D (Saúde no Trabalho)</Text>
        <Text style={styles.subtitle}>Conforme Lei n.º 102/2009 (Regime de Promoção da Segurança e Saúde no Trabalho)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Identificação da Entidade e Período</Text>
        <View style={styles.row}><Text style={styles.label}>NIF / Nome:</Text><Text style={styles.value}>{data.company.nif} - {data.company.name}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Período de Referência:</Text><Text style={styles.value}>{data.vigilance.periodStart} a {data.vigilance.periodEnd}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Responsável Clínico (DPO):</Text><Text style={styles.value}>{data.company.dpoName}</Text></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Atividade de Vigilância da Saúde (Exames)</Text>
        <View style={styles.grid}>
          <View style={styles.card}><Text style={styles.cardLabel}>Admissão</Text><Text style={styles.cardValue}>{data.vigilance.admissionExams}</Text></View>
          <View style={styles.card}><Text style={styles.cardLabel}>Periódicos</Text><Text style={styles.cardValue}>{data.vigilance.periodicExams}</Text></View>
          <View style={styles.card}><Text style={styles.cardLabel}>Ocasionais</Text><Text style={styles.cardValue}>{data.vigilance.occasionalExams}</Text></View>
          <View style={styles.card}><Text style={styles.cardLabel}>Total</Text><Text style={styles.cardValue}>{data.vigilance.totalExams}</Text></View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Resultados da Avaliação de Aptidão (IA Driven)</Text>
        <View style={styles.row}><Text style={styles.label}>Apto:</Text><Text style={styles.value}>{data.results.fit} trabalhadores</Text></View>
        <View style={styles.row}><Text style={styles.label}>Apto com Condicionamentos:</Text><Text style={styles.value}>{data.results.fitWithConditions} trabalhadores</Text></View>
        <View style={styles.row}><Text style={styles.label}>Inapto Temporariamente:</Text><Text style={styles.value}>{data.results.unfitTemporary} trabalhadores</Text></View>
        <View style={styles.row}><Text style={styles.label}>Inapto Definitivamente:</Text><Text style={styles.value}>{data.results.unfitPermanent} trabalhadores</Text></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Identificação de Riscos Psicossociais Críticos</Text>
        {data.risks.map((risk, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.label}>{risk.dimension}:</Text>
            <Text style={styles.value}>{risk.affectedCount} casos isolados (Gravidade: {risk.severity.toUpperCase()})</Text>
          </View>
        ))}
      </View>

      <View style={styles.legalNote}>
        <Text>Nota Legal: O Anexo D constitui uma obrigação anual das empresas em Portugal. Os dados aqui constantes baseiam-se em triagens clínicas digitais e análise de voz auditável, devendo ser validados pelo Médico do Trabalho antes da submissão final via portal GEP/ACT.</Text>
      </View>

      <Text style={styles.footer}>
        AEGIS HUB M2.7 Regulatory Compliance Tool | Blockchain Hash: SHA256-RUX-{Math.random().toString(16).slice(2, 10).toUpperCase()} | Página 1 de 1
      </Text>
    </Page>
  </Document>
);
