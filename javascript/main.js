// Seleccionamos el botón y el contenedor donde irán los productos
const boton = document.querySelector('.btn-success');
const contenedor = document.getElementById('prodRow');

// Agregamos un event listener al botón para que escuche el clic
boton.addEventListener('click', () => {
    
    // Limpiamos el contenedor por si ya hay productos (evita duplicados)
    contenedor.innerHTML = '';
    
    // Hacemos la petición a la API de Fake Store
    fetch('https://fakestoreapi.com/products')
        .then(respuesta => {
            // Convertimos la respuesta a formato JSON
            return respuesta.json();
        })
        .then(productos => {
            // Recorremos el arreglo de productos
            productos.forEach(producto => {
                
                // Creamos el HTML de la card usando Template Literals
                const cardHTML = `
                    <div class="col-md-3 mb-4">
                        <div class="card h-100 shadow-sm">
                            <img src="${producto.image}" class="card-img-top p-3" alt="${producto.title}" style="height: 200px; object-fit: contain;">
                            <div class="card-body d-flex flex-column">
                                <h6 class="card-subtitle mb-2 text-muted text-uppercase small">${producto.category}</h6>
                                <h5 class="card-title">${producto.title}</h5>
                                <p class="card-text text-primary fw-bold fs-5 mt-auto">$${producto.price}</p>
                            </div>
                        </div>
                    </div>
                `;
                
                // Insertamos la card en el contenedor usando insertAdjacentHTML
                contenedor.insertAdjacentHTML('beforeend', cardHTML);
            });
        })
        .catch(error => {
            // Manejo de errores por si algo falla
            console.error('Error al obtener los productos:', error);
            contenedor.innerHTML = '<div class="col-12"><p class="text-danger text-center">Error al cargar los productos. Intenta de nuevo.</p></div>';
        });
});