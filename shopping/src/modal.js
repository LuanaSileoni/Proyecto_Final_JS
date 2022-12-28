import { eliminarProductoCarrito, eliminarTodoElCarrito } from "./accionesCarrito.js";
import { obtenerCarritoStorage } from './storage.js';

const modalContenedor = document.querySelector('.modal-contenedor');
const abrirCarrito = document.getElementById('cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');
const modalCarrito = document.querySelector('.modal-carrito')

abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

cerrarCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

modalContenedor.addEventListener('click', () => {
    cerrarCarrito.click()
});

modalCarrito.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('boton-eliminar')) { //Hay productos en el carrito, permite eliminar el seleccionado específicamente
        Swal.fire({
            title: '¿Esta seguro?',
            text: 'Va a eliminar el producto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarProductoCarrito(e.target.value);
                Swal.fire(
                    'Eliminado',
                    'El producto ha sido eliminado',
                    'success'
                )
            }
        })
    }else if ((e.target.classList.contains('boton-eliminar-todo'))) { //Se toca el botón para eliminar todos los productos
        const carrito = obtenerCarritoStorage();
        if (carrito.length > 0) { // Hay productos, por lo tanto permite eliminarlos todos
            Swal.fire({
                title: '¿Esta seguro?',
                text: 'Va a eliminar todos los productos',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarTodoElCarrito();
                    Swal.fire(
                        'Eliminado',
                        'Se eliminaron todos los productos',
                        'success'
                    )
                }
            })
        }else { //No hay productos, solo permite volver hacia atrás
            Swal.fire({
                title: 'Carrito Vacío',
                text: 'Actualmente no tenés ningún producto para eliminar en el carrito',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Volver',
            })
        }
 
    }
});