const readline = require('readline');

function mostrarMenu() {
  console.log('\n===== MENÚ DE OPCIONES =====');
  console.log('1. Cargar archivo CSV');
  console.log('2. Cargar archivo Excel');
  console.log('3. Salir');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('\nSeleccione una opción: ', (respuesta) => {
    if (respuesta === '1') {
      rl.close();
      cargarCSV('./src/data/ventas.csv');
    } else if (respuesta === '2') {
      rl.close();
      cargarExcel('./src/data/ventas.xlsx');
    } else {
      console.log('¡Hasta pronto!');
      rl.close();
    }
  });
}

const fs = require('fs');
const csv = require('csv-parser');
const xlsx = require('xlsx');

const filePath = './ventas.csv';

function validarDatos(datos) {
  return datos.filter((fila, i) => {
    let errores = [];

    if (!fila.Producto || fila.Producto.trim() === '') errores.push('Producto vacío');
    if (!fila.Cantidad || isNaN(Number(fila.Cantidad))) errores.push('Cantidad inválida');
    if (!fila.Precio || isNaN(Number(fila.Precio))) errores.push('Precio inválido');
    if (!fila.Fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fila.Fecha)) errores.push('Fecha inválida');

    if (errores.length > 0) {
      console.log(`Fila ${i + 1} con errores: ${errores.join(', ')}`);
      return false;
    }
    return true;
  });
}

function eliminarDuplicados(datos) {
  const vistos = new Set();
  return datos.filter(fila => {
    const clave = `${fila.Producto}-${fila.Cantidad}-${fila.Precio}-${fila.Fecha}`;
    if (vistos.has(clave)) return false;
    vistos.add(clave);
    return true;
  });
}
  const path = require('path');

function guardarLimpios(datos) {
  const dir = path.join(__dirname, 'src', 'data');
  const rutaArchivo = path.join(dir, 'ventas_limpias.csv');

  // Crea la carpeta si no existe
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const encabezado = Object.keys(datos[0]).join(',') + '\n';
  const filas = datos.map(fila => Object.values(fila).join(',')).join('\n');
  fs.writeFileSync(rutaArchivo, encabezado + filas);

  console.log(" Datos limpios guardados en 'src/data/ventas_limpias.csv'");
}

function cargarCSV(path) {
  const resultados = [];
  fs.createReadStream(path)
    .pipe(csv())
    .on('data', (data) => resultados.push(data))
    .on('end', () => {
      console.log(" Datos originales:");
      console.table(resultados);

      const validados = validarDatos(resultados);
      const limpios = eliminarDuplicados(validados);

      console.log("🧹 Datos limpios:");
      console.table(limpios);

      guardarLimpios(limpios);
    });
}

function cargarExcel(path) {
  const workbook = xlsx.readFile(path);
  const hoja = workbook.Sheets[workbook.SheetNames[0]];
  const datos = xlsx.utils.sheet_to_json(hoja);

  console.log("Datos originales:");
  console.table(datos);

  const validados = validarDatos(datos);
  const limpios = eliminarDuplicados(validados);
  console.log(" Datos limpios:");
  console.table(limpios);

  guardarLimpios(limpios);
}

mostrarMenu();