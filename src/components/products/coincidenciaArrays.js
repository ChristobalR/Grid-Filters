const filtrarPorCoincidencia = (objetoFiltrado,objetoPropiedadesParam) => {
  
    const coincidencias = objetoFiltrado.filter(elem => {
        const valor2 = Object.entries(elem.subcategoria);
        const valor2Array = valor2.map(elemento => elemento[1]);
        const Array22 = valor2Array.map(elem => elem.split(","));
        
        let coincidenciaEncontrada = false;
    
        for (let i = 0; i < Array22.length; i++) {
          const arrayTest = Array22[i];
          
          for (let j = 0; j < arrayTest.length; j++) {
            if (objetoPropiedadesParam.flat().includes(arrayTest[j])) {
              coincidenciaEncontrada = true;
              break;
            }
          }
          
          if (coincidenciaEncontrada) {
            break;
          }
        }
    
        return coincidenciaEncontrada;
      });
    
      return coincidencias
    }
    
    export default filtrarPorCoincidencia