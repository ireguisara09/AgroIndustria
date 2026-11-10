import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
  titulo: string;
  bienvenida: string;
}

export default function Header({ titulo, bienvenida }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.bienvenida}>{bienvenida}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#31720b',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  bienvenida: {
    marginTop: 6,
    fontSize: 16,
    color: '#dbeafe',
  },
});