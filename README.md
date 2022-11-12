## Algotitmo de la Cotización del Seguro de Automóviles

### Según la Marca de Auto que seleccionemos se hacen los respectivos descuentos:

#### ( Para este Ejercicio tenemos cómo base que el seguro sin ningún descuento vale $2000 dólares )

1. Americano = 1.15 (15%)
2. Asiático = 1.05 (5 %)
3. Europeo = 1.35 (35%)

### Entre más antiguo sea el año del auto, el costo va a reducirse un 3% en el valor del Seguro.

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

### Si el seguro es básico se multiplica por un 30% más.
### Si el seguro es completo se multiplica por un 50% más.
```javascript
if (this.tipo === 'basico') {
    cantidad *= 1.30;
  } else {
    cantidad *= 1.50;
  }

  return cantidad;
```

