import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./home.module.css";
import "./home.css";
import ProductosPorCategoriaYPagina from "../products/products.jsx";

function Home() {
  const [dataFromChild, setDataFromChild] = useState("");

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };
  console.log(dataFromChild);
  return (
    <div className={`container `}>
      <div className={`${styles.contImageTop}`}>
       
      </div>
     
      <div className={`${styles.cont}`}>
        <div className={`${styles.test}`}></div>
        <div className={styles.gridCont}>
          <ProductosPorCategoriaYPagina
            porPage="5"
            text={"Novedades"}
            noRenderPages={true}
            subCat={"novedades"}
            onDataReceived={handleDataFromChild}
          />
           <ProductosPorCategoriaYPagina
            porPage="5"
            text={"ofertas"}
            noRenderPages={true}
            subCat={"ofertas"}
            onDataReceived={handleDataFromChild}
          />
            <ProductosPorCategoriaYPagina
            porPage="5"
            text={"Test"}
            noRenderPages={true}
            subCat={"novedades"}
            onDataReceived={handleDataFromChild}
          />
            <ProductosPorCategoriaYPagina
            porPage="5"
            text={"Test2"}
            noRenderPages={true}
            subCat={"novedades"}
            onDataReceived={handleDataFromChild}
          />
        </div>
      </div>
    </div>
  );
}
export default Home;
