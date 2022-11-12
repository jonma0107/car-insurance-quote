// ******************************************* Constructor ******************************************//
function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
};

// ********* Prototype para Seguro, que realiza la COTIZACIÓN con los Datos Seleccionados **********//
Seguro.prototype.cotizacion = function () {
  /*
  1 = Americano 1.15
  2 = Asiatico 1.05
  3 = Europeo 1.35
  */
  let cantidad;
  const base = 2000;
  switch (this.marca) {
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
      break;

    default: // el default es obligatorio en switch
      break;
  }

  // Leer el año
  const diferencia = new Date().getFullYear() - this.year;

  // Cada año que la diferencia es mayor, el costo va a reducirse un 3% en el valor del Seguro
  cantidad -= ((diferencia * 3) * cantidad) / 100;

  /*
  Si el seguro es básico se multiplica por un 30% más
  Si el seguro es completo se multiplica por un 50% más
  */

  if (this.tipo === 'basico') {
    cantidad *= 1.30;
  } else {
    cantidad *= 1.50;
  }

  return cantidad; // FUNCIONES QUE RETORNAN VALORES ES PORQUE VAMOS HACER ALGO MÁS


} // Fin proto cotizacion


//************************************ FUNCIÓN PRINCIPAL ***************************************/

function UI() { }

// **************** PROTO EXCLUSIVO DE UI que llena las opciones de los años *****************//
UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
    min = max - 20;

  const selectYear = document.querySelector('#year');

  for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
} // Fin del Proto

// ************************* PROTO DE UI que muestra ALERTAS en pantalla **********************//
UI.prototype.muestraAlertas = (mensaje, tipo) => { // Se utiliza arrow function porque la función UI no tiene propiedades que hagan referencia al Constructor
  const div = document.createElement('div');

  if (tipo === 'error') {
    div.classList.add('error');
  } else {
    div.classList.add('correcto');

  }

  div.classList.add('mensaje', 'mt-10');
  div.style.fontSize = '22px'
  div.textContent = mensaje;

  // INSERTAR EN HTML
  const formulario = document.querySelector('#cotizar-seguro'); //no importa que se llame igual, está en diferente función
  formulario.insertBefore(div, document.querySelector('#resultado'));

  setTimeout(() => {
    div.remove();
  }, 3000);

} // Fin deL segundo Proto de UI

//********************** ------- PROTOTYPE DE UI PARA MOSTRAR EL TOTAL ------- ***********************//
UI.prototype.mostrarTotal = (total, seguro) => {
  // Destructuring
  const { marca, year, tipo } = seguro;

  let textoMarca;
  switch (marca) {
    case '1':
      textoMarca = 'Americano';
      break;
    case '2':
      textoMarca = 'Asiatico';
      break;
    case '3':
      textoMarca = 'Europeo';
      break;

    default:
      break;
  }

  // Crear el resultado
  const div = document.createElement('div');
  div.classList.add('mt-10');
  div.innerHTML = `
    <p class="header">Tu Resumen</p>
    <p class="font-bold">Marca: ${textoMarca}</p>
    <p class="font-bold">Año: ${year}</p>
    <p class="font-bold capitalize">Tipo de seguro: ${tipo}</p>
    <p class="font-bold">Total: $ ${total}</p>
  `;

  const resultadoDiv = document.querySelector('#resultado');
  // resultadoDiv.appendChild(div);


  // Mostrar el SPINNER
  const spinner = document.querySelector('#cargando');
  spinner.style.display = 'block';

  setTimeout(() => {
    spinner.style.display = 'none'; // se borra el spinner
    resultadoDiv.appendChild(div); // y se muestra el resultado
  }, 3000);


} // Fin tercer Proto de UI


/********************************* INSTANCIAMOS LA FUNCION PRINCIPAL ******************************** */

// Instanciamos el Objeto UI con sus protos
const ui = new UI() // es una instancia GLOBAL


// ********************************************* EVENTOS ********************************************//

document.addEventListener('DOMContentLoaded', () => {
  ui.llenarOpciones(); // llena el Select con los años
})


eventListeners();
function eventListeners() {
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.addEventListener('submit', cotizarSeguro);
} // Fin evento SUBMIT

function cotizarSeguro(e) {
  e.preventDefault();

  // leer la marca seleccionada
  const marca = document.querySelector('#marca').value;

  // leer el año seleccionado
  const year = document.querySelector('#year').value;

  // leer el tipo de seguro seleccionado
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (marca === '' || year === '' || tipo === '') {
    ui.muestraAlertas('Todos los campos son obligatorios', 'error');
  } else {
    ui.muestraAlertas('Cotizando...', 'correcto');

    // Ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
      resultados.remove();
    }

    //Instanciar el Seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizacion();

    //Mostrar el resultado de cotización
    ui.mostrarTotal(total, seguro);

  } // fin del else

} // Fin función cotizarSeguro
