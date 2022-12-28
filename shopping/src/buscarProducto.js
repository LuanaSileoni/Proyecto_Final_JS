import { mostrarProductos } from "./App.js";


fetch("./src/data/stock.json") // Petición asincrónica de datos
    .then(response => response.json()) // Traducción de JSON a Objeto JS
    .then(productos => {
        const inputSearch = document.getElementById("buscarProducto");

        const buscarProducto = (productos, productoNombre) => {
            const productosFiltrados = productos.filter( producto => producto.nombre.toLowerCase().includes(productoNombre.toLowerCase()));
            mostrarProductos(productosFiltrados);
        };
        
        inputSearch.addEventListener("input", (e) => {
            buscarProducto(productos, e.target.value);
        });
    })
    .catch(error => console.log('Error:',error))