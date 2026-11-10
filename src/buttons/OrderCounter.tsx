import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface OrderCounterProps {
  total: number;
}

export default function OrderCounter({ total }: OrderCounterProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Pedidos registrados en esta sesión:</Text>
      <Text style={styles.numero}>{total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  texto: { fontSize: 15, color: '#374151', flex: 1 },
  numero: { fontSize: 24, fontWeight: 'bold', color: '#31720b' },
});