import React, { useState } from "react";
import styles from "./navbar.module.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import products from "../products/products";

function Nabvar() {
  const [display, setDisplay] = useState(false);

  const categoriasS = ["Perifericos", "Gabinetes", "Software", "Audifonos"];

  const displayOn = () => {
    setDisplay(!display);
  };

  const catLink = display ? `${styles.catDiv}` : `${styles.catLink}`;
  return (
    <>
    <div className={styles.contTop}>
      <div className={styles.contTopChild}>
        <img src="/logo.svg" alt="" />
      </div>
    </div>
    <div className={`container2`}>
      <div className={` ${styles.cont}`}>
        <div>
          <Link to="/">Inicio</Link>
        </div>
        <div className={` ${styles.catSelect}`}>
          <Link onClick={displayOn}>categorias</Link>
          <div className={catLink}>
            <a href={`/category/all`}>Todos</a>
            {categoriasS.map((dat) => {
              return <a href={`/category/${dat.toLowerCase()}`}>{dat}</a>;
            })}
          </div>
        </div>
        
      </div>
    </div>
    </>
  );
}
export default Nabvar;
