## Algoritmo de la Cotización del Seguro de Automóviles

### Según la Marca de Auto que seleccionemos se hacen las respectivas Cotizaciones, incrementándose el valor del seguro según la marca del auto, por ejemplo, si es un auto Americano el seguro tendrá un incremento del 15%, y así sucesivamente por cada marca que seleccionemos tendrá un porcentaje diferente:

#### ( Para este Ejercicio tenemos cómo base que el seguro sin ningún incremento vale $2000 dólares )

1. Americano = 1.15 (15%)
2. Asiático = 1.05 (5%)
3. Europeo = 1.35 (35%)

### Entre más antiguo sea el año del auto, el costo del seguro va a reducirse en un 3%.

```javascript
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
```

* * *

### Si el tipo de seguro es Básico se multiplica por un 30%. Porcentaje que se adiciona al total.
### Si el tipo de seguro es Completo se multiplica por un 50%. Porcentaje que se adiciona al total.
```javascript
if (this.tipo === 'basico') {
    cantidad *= 1.30;
  } else {
    cantidad *= 1.50;
  }

  return cantidad;
```

