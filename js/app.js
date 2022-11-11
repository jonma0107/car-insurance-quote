// Constructor
function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
};

// Prototype para Seguro, que realiza la cotización con los Datos Selecconados
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
  console.log(cantidad);
}


//*********************************************************************************************/

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
  div.textContent = mensaje;

  // INSERTAR EN HTML
  const formulario = document.querySelector('#cotizar-seguro'); //no importa que se llame igual, está en diferente función
  formulario.insertBefore(div, document.querySelector('#resultado'));

  setTimeout(() => {
    div.remove();
  }, 3000);

} // Fin deL segundo Proto de UI

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
    //Instanciar el Seguro
    const seguro = new Seguro(marca, year, tipo);
    seguro.cotizacion();
  }

} // Fin función cotizarSeguro
