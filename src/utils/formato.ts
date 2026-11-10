// Formatea un número como pesos colombianos: 15000 -> $15.000
export function formatearPesos(valor: number): string {
  const [entero, decimales] = valor.toFixed(2).split('.');
  const conPuntos = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return decimales === '00' ? `$${conPuntos}` : `$${conPuntos},${decimales}`;
}