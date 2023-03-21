import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  table: {
    margin: 20,
    width: 600,
    border: 1,
    borderStyle: "solid",
    borderColor: "#e1e1e1",
    borderRadius: 8,
    backgroundColor: "#fff"
  },
  th: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    textAlign: "left",
    backgroundColor: "#e1e1e1"
  },
  td: {
    padding: 10
  },
});

const QuotationTable = ({ quotation, total }) => {
  return (
    <View style={styles.table}>
      <View>
        <Text style={styles.th}>Description</Text>
        <Text style={styles.th}>Quantity</Text>
        <Text style={styles.th}>Type of Payment</Text>
        <Text style={styles.th}>Amount</Text>
      </View>
      {quotation.map(service => (
        <View key={service.name}>
          <Text style={styles.td}>{service.name}</Text>
          <Text style={styles.td}>{service.quantity}</Text>
          <Text style={styles.td}>{service.paymentPlan}</Text>
          <Text style={styles.td}>{service.totalPrice}</Text>
        </View>
      ))}
      <View>
        <Text style={styles.td}>Total</Text>
        <Text style={styles.td}>{total}</Text>
      </View>
    </View>
  );
};

export default QuotationTable;