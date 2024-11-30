// Recuperar el carrito desde el localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar los productos del carrito
document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
});

// Mostrar los productos del carrito en la página
function mostrarCarrito() {
    const carritoLista = document.getElementById("productos-carrito");
    const totalElemento = document.getElementById("total");
    carritoLista.innerHTML = "";

    // Mostrar cada producto en el carrito
    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio} (x${producto.cantidad})`;
        carritoLista.appendChild(li);
    });

    // Calcular el total
    const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalElemento.textContent = `Total: $${total}`;
}

// Manejar el envío del formulario
const formularioEnvio = document.getElementById("form-envio");
formularioEnvio.addEventListener("submit", (e) => {
    e.preventDefault(); // Evitar que se recargue la página

    // Obtener los datos del formulario
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const direccion = document.getElementById("direccion").value;

    // Mostrar la alerta de confirmación de compra
    Swal.fire({
        title: "¿Confirmas tu compra?",
        text: "Asegúrate de que la información sea correcta antes de continuar.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmar compra",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            // Crear el objeto de datos de envío
            const datosEnvio = {
                nombre,
                apellido,
                email,
                direccion,
                carrito
            };

            // Guardar los datos en el localStorage
            localStorage.setItem("datosEnvio", JSON.stringify(datosEnvio));

            // Mostrar mensaje de éxito
            Swal.fire("Compra confirmada", "¡Gracias por tu compra!", "success").then(() => {
                // Vaciar carrito después de mostrar el mensaje de éxito
                localStorage.removeItem("carrito");
                location.reload();  // Recarga la página

            });
        } else {
            Swal.fire("Compra cancelada", "No se realizó ninguna compra.", "info");
        }
    });
});


