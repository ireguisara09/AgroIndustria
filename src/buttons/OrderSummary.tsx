import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedido } from '../types/order';
import { formatearPesos } from '../utils/formato';

interface OrderSummaryProps {
  pedido: Pedido | null;
}

export default function OrderSummary({ pedido }: OrderSummaryProps) {
  if (!pedido) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.confirmacion}>Pedido registrado correctamente</Text>
      <Text style={styles.linea}>Cliente: {pedido.cliente}</Text>
      <Text style={styles.linea}>Producto: {pedido.producto}</Text>
      <Text style={styles.linea}>Cantidad: {pedido.cantidad}</Text>
      <Text style={styles.linea}>Precio unitario: {formatearPesos(pedido.precioUnitario)}</Text>
      <Text style={styles.total}>Total: {formatearPesos(pedido.total)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: '#dcfce7',
    borderRadius: 12,
  },
  confirmacion: { fontSize: 16, fontWeight: '700', color: '#166534', marginBottom: 8 },
  linea: { fontSize: 15, color: '#14532d', marginTop: 2 },
  total: { fontSize: 18, fontWeight: '700', color: '#14532d', marginTop: 8 },
});