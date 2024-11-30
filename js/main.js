// Carrito inicializado con localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    fetchProductos();
    actualizarCarrito();
});

// Fetch de los productos desde JSON
function fetchProductos() {
    fetch("./db/data.json")
        .then(response => response.json())
        .then(productos => {
            const container = document.getElementById("productos-lista");
            container.innerHTML = ""; // Limpia el contenedor por si se recarga
            productos.forEach(producto => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <h2>${producto.nombre}</h2>
                    <p>Precio: $${producto.precio}</p>
                    <button data-id="${producto.id}">Agregar al carrito</button>
                `;
                container.appendChild(card);
            });

            // Asignar eventos a los botones
            document.querySelectorAll("#productos-lista button").forEach(boton => {
                boton.addEventListener("click", () => {
                    const id = parseInt(boton.getAttribute("data-id"));
                    agregarAlCarrito(id, productos);
                });
            });
        })
        .catch(err => console.error("Error al cargar los productos:", err));
}

// Agregar producto al carrito y actualizar localStorage
function agregarAlCarrito(id, productos) {
    const producto = productos.find(prod => prod.id === id);
    if (producto) {
        const productoEnCarrito = carrito.find(prod => prod.id === id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        // Intentar guardar el carrito en el localStorage
        try {
            localStorage.setItem("carrito", JSON.stringify(carrito)); // Este es el único try-catch
        } catch (err) {
            Swal.fire("Error", "Hubo un problema al guardar los datos del carrito", "error");
            console.error("Error al guardar en el carrito:", err);
            return; // Detiene la ejecución en caso de error
        }

        actualizarCarrito();
    }
}

// Actualizar carrito en el DOM
function actualizarCarrito() {
    const carritoLista = document.getElementById("carrito-lista");
    carritoLista.innerHTML = ""; // Limpia el contenido del carrito

    // Mostrar cada producto en el carrito
    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio} (x${producto.cantidad})`;

        // Botón para eliminar una unidad
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar una unidad";
        botonEliminar.onclick = () => eliminarProducto(index);

        li.appendChild(botonEliminar);
        carritoLista.appendChild(li);
    });

    // Calcular y mostrar el total
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

    // Intentar guardar el carrito en el localStorage
    try {
        localStorage.setItem("carrito", JSON.stringify(carrito)); // Este es el único try-catch
    } catch (err) {
        Swal.fire("Error", "Hubo un problema al eliminar el producto", "error");
        console.error("Error al eliminar producto del carrito:", err);
        return; // Detiene la ejecución en caso de error
    }

    actualizarCarrito();
}




