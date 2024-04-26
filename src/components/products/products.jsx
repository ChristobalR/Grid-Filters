import { React, useState, useRef, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import styles from "./products.module.css";
import products from "./products.js";
import subCategorias from "./categorias.js";
import filtrarPorCoincidencia from "./coincidenciaArrays.js";

const ProductosPorCategoriaYPagina = ({
  porPage,
  text,
  noRenderPages,
  subCat,
  onDataReceived,
}) => {
  const [filter, setFilter] = useState(false);
  const [display1, setDisplay1] = useState(false);
  const setDis = () => {
    setDisplay1((prevDisplay) => !prevDisplay);
  };


  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current.contains(event.target)) {
        setDisplay1(false);
      }
    };

    if (display1) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [display1]);


  const subCategory = subCat;
  const { categoria } = useParams();
  const [searchP] = useSearchParams();
  const currentPage = searchP.get("page") ? searchP.get("page") : 1;
  const marca = searchP.get("marca");
  const price = searchP.get("price");
  const navigate = useNavigate();
  var objetoPropiedades = {};



  const propiedades = subCategorias.find((cat) => cat.hasOwnProperty(categoria))
    ? subCategorias.find((cat) => cat.hasOwnProperty(categoria))
    : [];
  if (propiedades[categoria]) {
    propiedades[categoria].forEach((propiedad) => {
      const valor = searchP.get(propiedad.nombre);
      if (valor) {
        objetoPropiedades[propiedad.nombre] = valor;
      }
    });
  }

  const renderPages = noRenderPages ? false : true;

  const productsPerPage = porPage ? parseInt(porPage) : 6;

  const allProducts = products;

  var filteredProducts = categoria
    ? allProducts.filter((product) => product.category === categoria)
    : allProducts;
  if (subCategory != null) {
    filteredProducts = allProducts.filter((product) =>
      product.subcategory?.includes(subCategory)
    );
  }

  const valor = Object.entries(objetoPropiedades);

  const valorArray = valor.map((elemento) => elemento[1]);

  const nuevoArray = valorArray.map((elemento) => elemento.split(","));


  const filteredProductsFix = filtrarPorCoincidencia(
    filteredProducts,
    nuevoArray
  );

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  var fixtest = !isEmpty(objetoPropiedades)
    ? filteredProductsFix
    : filteredProducts;

  if (price === "menorPrecio") {
    fixtest = fixtest.sort(function (a, b) {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    });
  } else if (price === "mayorPrecio") {
    fixtest = fixtest.sort(function (a, b) {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      return 0;
    });

  }
  const startIndex = (currentPage - 1) * productsPerPage;

  const paginatedProducts = fixtest.slice(
    startIndex,
    startIndex + productsPerPage
  );
  const endIndex = startIndex + productsPerPage;

  const maxPages = fixtest.length;

  var productsRender = 0;
  paginatedProducts.filter((product, index) => {
    productsRender = productsRender + 1;
  });
  onDataReceived?.(productsRender);
  let pProducts;
  if (endIndex > fixtest.length) {
    pProducts = fixtest.length;
  } else {
    pProducts = endIndex;
  }
  const next = () => {
    if (currentPage < Math.ceil(maxPages / productsPerPage)) {
      navigate(`?page=${parseInt(currentPage) + 1}`);
    }
  };
  const previous = () => {
    if (currentPage > 1) {
      navigate(`?page=${parseInt(currentPage) - 1}`);
    }
  };
  return (
    <>
      {text ? <h3>{text}</h3> : null}
      {text ? null : (
        <div className={styles.contUls}>
          <div className={styles.select1}>
            <button onClick={setDis}>
              <p>Ordenar por</p>
              <div></div>
            </button>
            <div ref={containerRef} className={display1 ? styles.on : styles.off}></div>
          </div>
        </div>
      )}
      <div className={` contGridItems ${styles.cont}`}>
        {paginatedProducts.map((product, index) => (
          <div className={`${styles.contGrid}`}>
            <div className={styles.productName}>
              <h4>{product.brand}</h4>
              <h3>{product.name} </h3>
            </div>
            <div className={styles.productTop}>
              <p>SKU {product.id}</p>
              <p>{product.stock} unid</p>
            </div>
            <img src={product.img} alt="" />
            <div className={styles.productBot}>
              <div className={styles.priceBox}>
                <span className={styles.price}>${product.price}</span>
                <span className={styles.Transf}>Transferencia o efectivo</span>
              </div>
              <div className={styles.carrito}></div>
            </div>
          </div>
        ))}
      </div>
      {renderPages ? (
        <div>
          <p>
            Mostrando del <b>{startIndex + 1}</b> al <b>{pProducts}</b> de{" "}
            <b>{fixtest.length}</b>{" "}
          </p>
          <button onClick={previous}>Pagina Prev</button>
          <button onClick={next}>Pagina sig</button>
        </div>
      ) : null}
    </>
  );
};

export default ProductosPorCategoriaYPagina;
