import React, { useState } from "react";
import styles from "./main.module.css";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
//// IMPORTS COMPONENTES
import ProductosPorCategoriaYPagina from "../products/products.jsx";
import subCategorias from "../products/categorias.js";

function Main() {
  const [searchP, setSearchP] = useSearchParams();
  const [display, setDisplay] = useState([])

  const handleDisplayClick = (nombre) => {
    if (display.includes(nombre)) {
      setDisplay(
        display.filter((item) => item !== nombre)
      );
    } else {
      setDisplay([...display, nombre]);
    }
  };
  







  const agregarParametro = (parametro, valor) => {
    const nuevoSearchParams = new URLSearchParams(searchP);

    let valoresActuales = nuevoSearchParams.getAll(parametro);

    if (!valoresActuales.includes(valor)) {
      nuevoSearchParams.append(parametro, valor);
      setSearchP(nuevoSearchParams);
    }
  };

  const { categoria } = useParams();

  const categoriaFind = subCategorias.find((cat) =>
    cat.hasOwnProperty(categoria)
  );

  const categoriaFindFix = categoriaFind ? categoriaFind[categoria] : [];

  const [dataFromChild, setDataFromChild] = useState("");

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  const shouldAddClass = dataFromChild < 2;

  const [elementosClickeados, setElementosClickeados] = useState([]);

  const handleElementoClick = (nombre) => {
    if (elementosClickeados.includes(nombre)) {
      setElementosClickeados(
        elementosClickeados.filter((item) => item !== nombre)
      );
    } else {
      setElementosClickeados([...elementosClickeados, nombre]);
    }
  };
console.log(display)
  const objeto = {
    audifonos: "rojo,verde",
    microfono: "si,no",
  };
  /// Objeto creado
  var objetoCreado = {};

  categoriaFindFix.map((elem) => {
    objetoCreado[elem.nombre] = "";
  });

  elementosClickeados.map((dat) => {
    let variable = dat.split(",");
    if (objetoCreado[variable[0]] == "") {
      objetoCreado[variable[0]] += variable[1];
    } else {
      objetoCreado[variable[0]] += "," + variable[1];
    }
  });

  console.log(elementosClickeados);
  console.log(objetoCreado);

  const filterFix = () => {
    setSearchP("");
  };
  const HandleFilter = () => {
    Object.keys(objetoCreado).forEach((clave) => {
      if (objetoCreado[clave] == "") {
        delete objetoCreado[clave];
      }
    });
    const nuevoSearchParams = new URLSearchParams();

    Object.keys(objetoCreado).forEach((clave) => {
      nuevoSearchParams.append(clave, objetoCreado[clave]);
    });

    setSearchP(nuevoSearchParams);
  };

  return (
    <>
      <div className={`container `}>
        <div className={styles.cont}>
          <div className={styles.side}>
            <div className={styles.sideFiltros}>
              <p>Filtros</p>
              <a href="" onClick={filterFix}>
                Borrar Filtros
              </a>
            </div>
            <div className={`${styles.sideFiltrosContcont}`}>
            <div
            onClick={() => handleDisplayClick("marca")}
              className={`${styles.sideFiltrosCont} ${styles.sideFiltrosContFirst}`}
            >
              <p>Marca</p>
            </div>
            
            <div className={ `${styles.rangePrice} ${display.includes("marca") ? styles.onn : styles.offf}`}></div>
            </div>
            {categoriaFindFix.map((dat) => {
              return (
                <div className={`${styles.sideFiltrosContcont}`}>
                  <div onClick={() => handleDisplayClick(dat.nombre)}  id={dat.nombre} className={`${styles.sideFiltrosCont}`}>
                    <p>{dat.nombre}</p>
                  </div>
                  <div  className={`${styles.s} ${display.includes(dat.nombre) ? styles.onn : styles.offf}`}>
                    {dat.sub.map((subItem) => {
                      return (
                        <div className={`${styles.contR}`}>
                        <div onClick={() =>
                            handleElementoClick(`${dat.nombre},${subItem}`)
                          }
                        className={`${elementosClickeados.includes(`${dat.nombre},${subItem}`) ? styles.on : styles.off}`}
                      >
                       
                      </div>
                        <p
                          key={subItem}
                          
                        >
                       
                          {subItem}
                          {}
                          
                        </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div className={styles.filtrarSelectButton}>
              <p onClick={HandleFilter}>Filtrar</p>
            </div>
          </div>
          <div
            className={`${styles.gridCont} ${
              shouldAddClass ? styles.additionalClass : ""
            }`}
          >
            <ProductosPorCategoriaYPagina
              onDataReceived={handleDataFromChild}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Main;
