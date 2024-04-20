import React, { useState, useContext } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from "./main.module.css";

function Main() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const productsPerPage = 6;

  const products = [
    { id: 1, name: 'Gabinete Épico', category: 'gabinetes', price: 180 },
    { id: 2, name: 'Ratón Mágico', category: 'perifericos', price: 75 },
    { id: 3, name: 'Suite de Productividad', category: 'software', price: 299 },
    { id: 4, name: 'Audífonos Estéreo', category: 'audifonos', price: 99 },
    { id: 5, name: 'Teclado Brillante', category: 'perifericos', price: 120 },
    { id: 6, name: 'Gabinete Futurista', category: 'gabinetes', price: 220 },
    { id: 7, name: 'Software de Seguridad', category: 'software', price: 199 },
    { id: 8, name: 'Audífonos Inalámbricos', category: 'audifonos', price: 149 },
    { id: 9, name: 'Ratón Ergonómico', category: 'perifericos', price: 90 },
    { id: 10, name: 'Gabinete de Alta Velocidad', category: 'gabinetes', price: 250 },
    { id: 11, name: 'Software de Edición de Video', category: 'software', price: 349 },
    { id: 12, name: 'Auriculares Deportivos', category: 'audifonos', price: 79 },
    { id: 13, name: 'Kit de Periféricos Gamer', category: 'perifericos', price: 299 },
    { id: 14, name: 'Gabinete Compacto', category: 'gabinetes', price: 150 },
    { id: 15, name: 'Software de Diseño Gráfico', category: 'software', price: 249 },
    { id: 16, name: 'Audífonos con Cancelación de Ruido', category: 'audifonos', price: 199 },
    { id: 17, name: 'Teclado Retroiluminado', category: 'perifericos', price: 110 },
    { id: 18, name: 'Gabinete Minimalista', category: 'gabinetes', price: 180 },
    { id: 19, name: 'Suite de Oficina', category: 'software', price: 199 },
    { id: 20, name: 'Auriculares Bluetooth', category: 'audifonos', price: 129 }
    // Agrega más productos si es necesario
];


  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const filteredProducts = products.filter(product => product.category === selectedCategory);
  const filtered = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  
   
  const categories = ['all', 'gabinetes', 'perifericos', 'software', "audifonos"];
  return (
    
      <div className={`container ${styles.cont}`}>
        <div className={styles.side}>
          
          <div>
            {categories.map(category => (
              <Link
                key={category}
                to={`/category/${category}`}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1); // Reiniciar currentPage a 1 al cambiar de categoría
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.productsCont}>
          
            <Routes>
           
              <Route path="/category/:category" element={<CategoryProducts currentPage={currentPage} setCurrentPage={setCurrentPage} currentProducts={currentProducts} filtered={filtered} productst={products} filteredProducts={filteredProducts}  productsPerPage={productsPerPage} selectedCategory={selectedCategory} />} />
              
             
             
            </Routes>
          
        
        </div>
      </div>
    
  );
}

function Inicio (
){
  return  (
    <div className={`${styles.div32}`}>
      
    </div>
  )
}

function CategoryProducts({ currentProducts, selectedCategory, filtered, productsPerPage, filteredProducts, productst, currentPage, setCurrentPage }) {
  var products = currentProducts;
  var totalProducts = productst;

  // Filtrar los productos si la categoría seleccionada no es "all"
  if (selectedCategory !== 'all') {
    totalProducts = filteredProducts;
    products = filtered;
  }

  const totalPages = Math.ceil(totalProducts.length / productsPerPage);
  const botones = [];

  // Bucle para generar los botones
  for (let i = 0; i < totalPages; i++) {
    // Genera la URL dinámica para cada página
    const pageUrl = `/category/${selectedCategory}/${i + 1}`;
    // Agrega cada botón al array
    botones.push(
      <Link key={i} >
        <button onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
      </Link>
    );
  }
  
  return (
    <>
      <div className={styles.products}>
        {products.map(product => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div> 
      <div className={styles.pages}>
        {botones}
      </div>
    </>
  );
}







export default Main;
