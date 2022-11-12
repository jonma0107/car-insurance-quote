## Algotitmo de la Cotización del Seguro de Automóviles

### Según la Marca de Auto que seleccionemos se hacen los respectivos descuentos:

1. Americano = 1.15 (15%)
2. Asiatico = 1.05 (5 %)
3. Europeo = 1.35 (35%)

### Entre más antiguo sea el año del auto, el costo va a reducirse un 3% en el valor del Seguro.

* * *

### Si el seguro es básico se multiplica por un 30% más
### Si el seguro es completo se multiplica por un 50% más
```javascript
if (this.tipo === 'basico') {
    cantidad *= 1.30;
  } else {
    cantidad *= 1.50;
  }

  return cantidad;
```

