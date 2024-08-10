import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 1,
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    flexGrow: 1,
  },
  headerCell: {
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 2,
  },
});

const PDFGenerator = ({ factures }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Facture</Text>
      
      <Text>Nom du Client: {factures[0].nom}</Text>
      <Text> </Text>
      
      <Text>Date: {factures[0].date}</Text>
      <Text> </Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.headerCell]}>Désignation</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Quantité</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Prix</Text>
        </View>
        {factures.map((facture, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{facture.designation}</Text>
            <Text style={styles.tableCell}>{facture.quantite}</Text>
            <Text style={styles.tableCell}>{facture.prix_unitaire}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFGenerator;
