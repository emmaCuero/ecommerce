// Array para almacenar los productos en el carrito
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(nombreProducto, precioProducto) {
    // Crea un objeto del producto
    const producto = {
        nombre: nombreProducto,
        precio: precioProducto
    };

    // Agrega el producto al carrito
    carrito.push(producto);

    // Muestra un mensaje de confirmación
    alert(`${nombreProducto} ha sido agregado al carrito. Precio: $${precioProducto}`);
}

// Función para mostrar el contenido del carrito 
function mostrarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let mensaje = "Productos en el carrito:\n";
    let total = 0;

    carrito.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio}\n`;
        total += producto.precio;
    });

    mensaje += `\nTotal: $${total}`;
    alert(mensaje);
}

