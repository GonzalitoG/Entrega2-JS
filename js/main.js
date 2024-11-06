// Array de objetos para productos
const productos = [
    { id: 1, nombre: "Café", precio: 100 },
    { id: 2, nombre: "Té", precio: 80 },
    { id: 3, nombre: "Chocolate", precio: 120 }
];

// Carrito inicializado con storage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Actualizar el DOM al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
    actualizarCarrito();
});

// Mostrar productos en el DOM
function mostrarProductos() {
    const productosLista = document.getElementById("productos-lista");
    productosLista.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        productosLista.appendChild(div);
    });
}

// Agregar producto al carrito y actualizar storage
function agregarAlCarrito(id) {
    const producto = productos.find(prod => prod.id === id);
    if (producto) {
        const productoEnCarrito = carrito.find(prod => prod.id === id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }
}

// Actualizar carrito en el DOM
function actualizarCarrito() {
    const carritoLista = document.getElementById("carrito-lista");
    carritoLista.innerHTML = "";

    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio} (x${producto.cantidad})`;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar una unidad";
        botonEliminar.onclick = () => eliminarProducto(index);

        li.appendChild(botonEliminar);
        carritoLista.appendChild(li);
    });

    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    document.getElementById("total").textContent = `Total: $${total}`;
}

// Eliminar producto del carrito
function eliminarProducto(index) {
    const producto = carrito[index];
    if (producto.cantidad > 1) {
        producto.cantidad -= 1;
    } else {
        carrito.splice(index, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Confirmar compra
document.getElementById("btn-confirmar").addEventListener("click", () => {
    if (carrito.length === 0) {
        mostrarModal("El carrito está vacío.");
        return;
    }

    const totalCompra = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    const mensaje = carrito.map(p => `${p.nombre} x${p.cantidad} unidades`).join(", ");

    mostrarModal(`Estás comprando: ${mensaje}\nTotal a pagar: $${totalCompra}`);
});

// Función para mostrar modal de confirmación
function mostrarModal(mensaje) {
    const modalMensaje = document.getElementById("modal-mensaje");
    modalMensaje.textContent = mensaje;

    const modal = document.getElementById("modal-confirmacion");
    modal.style.display = "block";

    document.getElementById("btn-confirmar-modal").onclick = () => { // Usar el nuevo ID aquí
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
        modal.style.display = "none";
        mostrarModal("¡Compra realizada con éxito!");
    };
    document.getElementById("btn-cancelar").onclick = () => {
        modal.style.display = "none";
    };
}

// Cerrar el modal cuando se hace clic fuera de él
window.onclick = (event) => {
    const modal = document.getElementById("modal-confirmacion");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
