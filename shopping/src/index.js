import { mostrarProductos } from "./App.js";
import { obtenerCarritoStorage } from "./storage.js";
import { pintarCarrito } from "./accionesCarrito.js";
import { actualizarTotalesCarrito } from "./actualizarCarrito.js";


fetch("./src/data/stock.json") // Petición asincrónica de datos
    .then(response => response.json()) // Traducción de JSON a Objeto JS
    .then(productos => {
            mostrarProductos( productos);
            if (localStorage.getItem("carrito")) {
                const carrito = obtenerCarritoStorage();
                pintarCarrito(carrito);
                actualizarTotalesCarrito(carrito);
            };
    })
    .catch(error => console.log('Error:',error))