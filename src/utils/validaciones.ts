import { Pedido } from '../types/order';

export interface ResultadoValidacion {
  errores: string[];
  pedido?: Pedido;
}

// Acepta "3000", "3.000" (separador de miles), "3000.50" o "3000,50".
// Rechaza vacío, negativos y cualquier texto no numérico.
function interpretarPrecio(texto: string): number | null {
  const t = texto.trim();
  if (/^\d{1,3}(\.\d{3})+$/.test(t)) return Number(t.replace(/\./g, ''));
  if (/^\d+([.,]\d+)?$/.test(t)) return Number(t.replace(',', '.'));
  return null;
}

export function validarPedido(
  cliente: string,
  producto: string,
  cantidadTexto: string,
  precioTexto: string
): ResultadoValidacion {
  const errores: string[] = [];

  if (!cliente.trim()) {
    errores.push('Debe ingresar el nombre del cliente');
  }

  if (!producto.trim()) {
    errores.push('Debe ingresar un producto');
  }

  // Cantidad: solo enteros positivos (rechaza 0, negativos, decimales, vacío y texto)
  const cantidadLimpia = cantidadTexto.trim();
  const cantidad = /^\d+$/.test(cantidadLimpia) ? parseInt(cantidadLimpia, 10) : NaN;
  if (isNaN(cantidad) || cantidad <= 0) {
    errores.push('Ingrese una cantidad válida');
  }

  // Precio unitario: vacío, negativo o no numérico -> error
  const precioUnitario = interpretarPrecio(precioTexto);
  if (precioUnitario === null) {
    errores.push('Ingrese un precio unitario válido');
  }

  if (errores.length > 0) {
    return { errores };
  }

  return {
    errores,
    pedido: {
      cliente: cliente.trim(),
      producto: producto.trim(),
      cantidad,
      precioUnitario: precioUnitario as number,
      total: cantidad * (precioUnitario as number),
    },
  };
}