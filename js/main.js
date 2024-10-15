// Variables y arrays
const productos = ["Café", "Té", "Chocolate"];
const precios = [100, 80, 120];
let carrito = [];
let total = 0;

// Función para mostrar los productos disponibles
function mostrarProductos() {
    let lista = "Productos disponibles:\n";
    for (let i = 0; i < productos.length; i++) {
        lista += `${i + 1}. ${productos[i]} - $${precios[i]}\n`;
    }
    return lista;
}

// Función para agregar productos al carrito
function agregarProducto() {
    let seleccion = parseInt(prompt(mostrarProductos() + "Selecciona un producto por su número (1, 2 o 3):"));

    if (seleccion > 0 && seleccion <= productos.length) {
        carrito.push(productos[seleccion - 1]);
        total += precios[seleccion - 1];
        alert(`Agregaste ${productos[seleccion - 1]} al carrito. Total: $${total}`);
        console.log("Producto seleccionado: ", productos[seleccion - 1]);
        console.log("Carrito actual: ", carrito);
    } else {
        alert("Selección inválida. No se ha agregado ningún producto.");
        console.log("El usuario ingresó una selección inválida.");
    }
}


// Función para confirmar la compra
function confirmarCompra() {
    if (carrito.length > 0) {
        let confirmar = confirm(`Estás comprando: ${carrito.join(", ")}\nTotal a pagar: $${total}\n¿Deseas confirmar la compra?`);
        if (confirmar) {
            alert("¡Compra realizada con éxito!");
        } else {
            alert("Compra cancelada.");
        }
    } else {
        alert("El carrito está vacío.");
    }
}
// Ciclo de compra
let seguirComprando = true;

while (seguirComprando) {
    agregarProducto();
    seguirComprando = confirm("¿Deseas agregar otro producto?");
}

confirmarCompra();
