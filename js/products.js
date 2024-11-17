// Array para almacenar los productos en el carrito
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(nombreProducto, precioProducto) {
  const productoExistente = carrito.find(producto => producto.nombreProducto === nombreProducto);

  if (productoExistente) {
      // Si el producto ya existe, incrementa la cantidad
      productoExistente.cantidadProducto += 1;
  } else {
      // Si no existe, crea un nuevo objeto del producto con cantidad 1
      carrito.push({ nombreProducto, precioProducto, cantidadProducto: 1 });
  }
     actualizarCarrito();
}

function actualizarCarrito() {
    const carritoProductos = document.getElementById('productos-carrito');
    // Limpiamos el contenido del carrito
    carritoProductos.innerHTML = '';
  
    let total = 0;
  
    // Si el carrito está vacío, mostramos un mensaje
    if (carrito.length === 0) {
      carritoProductos.innerHTML = '<p>Aún no has agregado productos al carrito.</p>';
    } else {
  
    // Si el carrito tiene productos, los mostramos
      carrito.forEach((producto, index) => {
          total += producto.precioProducto * producto.cantidadProducto;
          carritoProductos.innerHTML += `
              <div class="cart-item d-flex justify-content-between align-items-center">
                  <span>${producto.nombreProducto}</span>
                  <span>$${producto.precioProducto}</span>
                  <span>
                  <button class="btn btn-secondary btn-sm" onclick="modificarCantidad(${index}, -1)">-</button>
                  ${producto.cantidadProducto}
                  <button class="btn btn-secondary btn-sm" onclick="modificarCantidad(${index}, 1)">+</button>
                  </span>
                  <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
              </div>
              `;
          });
      }
      document.getElementById('total').textContent = total.toFixed(2);
  }

// Función para modificar la cantidad de un producto
function modificarCantidad(index, cantidad) {
    const producto = carrito[index];
  
    // Si la cantidad es negativa, solo decrementamos si es mayor que 1
    if (cantidad < 0 && producto.cantidadProducto > 1) {
      producto.cantidadProducto += cantidad;
    } else if (cantidad > 0) {
      producto.cantidadProducto += cantidad;
    }
  
    actualizarCarrito();
  }


  // Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1); // Eliminamos el producto del carrito
    actualizarCarrito();
  }

// // Muestra un mensaje de confirmación
// alert(`${nombreProducto} ha sido agregado al carrito. Precio: $${precioProducto}`);

// // Función para mostrar el contenido del carrito 
// function mostrarCarrito() {
//     if (carrito.length === 0) {
//         alert("El carrito está vacío.");
//         return;
//     }

//     let mensaje = "Productos en el carrito:\n";
//     let total = 0;

//     carrito.forEach((producto, index) => {
//         mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio}\n`;
//         total += producto.precio;
//     });

//     mensaje += `\nTotal: $${total}`;
//     alert(mensaje);
// }
