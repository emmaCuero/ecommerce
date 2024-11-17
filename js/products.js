// Array para almacenar los productos en el carrito
// let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(nombreProducto, precioProducto) {
  // Vamos a utilizar el LocalStorage para almacenar los productos y que sean persistentes
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Tenemos que verificar si el producto ya existe en el carrito, para que no haya duplicidad.
  const productoExiste = carrito.find(item => item.nombreProducto === nombreProducto);

  if (productoExiste) {
      // Si dado el caso ya existe, incrementamos.
      productoExiste.cantidadProducto += 1;
  } else {
      // Sino existe, se agrega.
      carrito.push({nombreProducto, precioProducto, cantidadProducto: 1});
  }
  
  // Guardamos el carrito con los productos actualizados
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Actualizamos el contador del carrito
  actualizarCarrito();
  actualizarContadorCarrito();

  alert(`${nombreProducto} ha sido agregado al carrito`);
}

function actualizarCarrito() {

  // Vamos a recuperar el carrito del LocalStorage
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const carritoProductos = document.getElementById('productos-carrito');
  // Limpiamos el contenido del carrito
  carritoProductos.innerHTML = '';

  let total = 0;

  // Si el carrito está vacío, mostramos un mensaje
  if (carrito.length === 0) {
    carritoProductos.innerHTML = '<p>Aún no has agregado productos al carrito.</p>';
  } else {

      const productosEnCarrito = document.createElement('div');
      productosEnCarrito.className = 'container mt-4';

      // Si el carrito tiene productos, los mostramos
      carrito.forEach((producto, index) => {
        total += producto.precioProducto * producto.cantidadProducto;

      // Creamos la tarjeta para el producto
      const carritoProductos = document.createElement('div');
          carritoProductos.className = 'card mb-3';
        carritoProductos.innerHTML = `
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
            productosEnCarrito.appendChild(carritoProductos);
        });

        // Agregamos el total
      const totalElement = document.createElement('div');
      totalElement.className = 'card mt-3';
      totalElement.innerHTML = `
          <div class="card-body">
              <h4 class="text-end">Total: $${total.toFixed(2)}</h4>
          </div>
      `;
      
      carritoProductos.appendChild(productosEnCarrito);
      carritoProductos.appendChild(totalElement);
    }
    document.getElementById('total').textContent = total.toFixed(2);
}

// Función para modificar la cantidad de un producto
function modificarCantidad(index, cantidad) {

  // Recuperamos el carrito del LocalStorage
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const producto = carrito[index];

  // Si la cantidad es negativa, solo decrementamos si es mayor que 1
  if (cantidad < 0 && producto.cantidadProducto > 1) {
    producto.cantidadProducto += cantidad;
  } else if (cantidad > 0) {
    producto.cantidadProducto += cantidad;
  }
  
  // Guardar el carrito actualizado
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}


// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  // Recuperamos el carrito del LocalStorage
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Eliminamos el producto del carrito
  carrito.splice(index, 1); 

  // Guardar el carrito actualizado
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

// Agregar esta función para actualizar el contador
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const contador = document.getElementById('cart-count');
  if (contador) {
      contador.textContent = carrito.length;
  }
}

// Llamar a esta función después de cada modificación del carrito
// y al cargar la página
window.onload = function() {
  actualizarContadorCarrito();
  if (document.getElementById('productos-carrito')) {
      actualizarCarrito();
  }
};