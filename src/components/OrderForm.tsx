import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Pedido } from '../types/order';
import { validarPedido } from '../utils/validaciones';

interface OrderFormProps {
  onRegistrar: (pedido: Pedido) => void;
  onOcultarConfirmacion: () => void;
}

export default function OrderForm({ onRegistrar, onOcultarConfirmacion }: OrderFormProps) {
  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [errores, setErrores] = useState<string[]>([]);

  const handleRegistrar = () => {
    const resultado = validarPedido(cliente, producto, cantidad, precio);

    if (resultado.errores.length > 0 || !resultado.pedido) {
      setErrores(resultado.errores);
      onOcultarConfirmacion(); // no se confirma ningún pedido si hay errores
      return;
    }

    setErrores([]);
    onRegistrar(resultado.pedido);
  };

  const handleLimpiar = () => {
    setCliente('');
    setProducto('');
    setCantidad('');
    setPrecio('');
    setErrores([]);
    onOcultarConfirmacion();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuevo pedido</Text>

      <Text style={styles.label}>Nombre del cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: María Pérez"
        value={cliente}
        onChangeText={setCliente}
      />

      <Text style={styles.label}>Producto solicitado</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Camiseta"
        value={producto}
        onChangeText={setProducto}
      />

      <Text style={styles.label}>Cantidad (unidades)</Text>
      <TextInput
        style={styles.input}
        placeholder="Número de unidades"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />

      <Text style={styles.label}>Precio unitario ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 3000"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      {errores.length > 0 && (
        <View style={styles.errorBox}>
          {errores.map((error) => (
            <Text key={error} style={styles.errorTexto}>
              • {error}
            </Text>
          ))}
        </View>
      )}

      <Pressable style={styles.botonPrimario} onPress={handleRegistrar}>
        <Text style={styles.botonPrimarioTexto}>Registrar pedido</Text>
      </Pressable>

      <Pressable style={styles.botonSecundario} onPress={handleLimpiar}>
        <Text style={styles.botonSecundarioTexto}>Limpiar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginBottom: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  titulo: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  label: { fontSize: 14, fontWeight: '500', color: '#374151', marginTop: 8, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
  },
  errorBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
  },
  errorTexto: { color: '#b91c1c', fontSize: 14 },
  botonPrimario: {
    marginTop: 16,
    backgroundColor: '#31720b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonPrimarioTexto: { color: '#fff', fontWeight: '600' },
  botonSecundario: {
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#31720b',
  },
  botonSecundarioTexto: { color: '#31720b', fontWeight: '600' },
});