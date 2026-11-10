import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from './src/components/Header';
import OrderForm from './src/components/OrderForm';
import OrderSummary from './src/buttons/OrderSummary';
import OrderCounter from './src/buttons/OrderCounter';
import { Pedido } from './src/types/order';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Cambia aquí el nombre de tu emprendimiento
const NOMBRE_EMPRENDIMIENTO = 'AgroIndustria';

export default function App() {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [ultimoPedido, setUltimoPedido] = useState<Pedido | null>(null);

  const registrarPedido = (pedido: Pedido) => {
    setTotalPedidos((prev) => prev + 1); // +1 por cada pedido válido
    setUltimoPedido(pedido);
  };

  const ocultarConfirmacion = () => setUltimoPedido(null);

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
          <Header
            titulo={NOMBRE_EMPRENDIMIENTO}
            bienvenida="¡Bienvenido! Registra aquí los pedidos de tus clientes."
          />
          <OrderForm onRegistrar={registrarPedido} onOcultarConfirmacion={ocultarConfirmacion} />
          <OrderSummary pedido={ultimoPedido} />
          <OrderCounter total={totalPedidos} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  scroll: { paddingBottom: 32 },
});