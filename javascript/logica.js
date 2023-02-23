$(document).ready(function() {

    let tarea = setInterval(() => {
        if(cantidadLlamadas == 2)
        {
            CargarBebidasEnInicio(estanteriaBebida);
            clearInterval(tarea);
        }
    }, 500);
});

let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []
let ModalCarrito = document.getElementById("modal-bodyCarrito");
let precioTotal = document.getElementById("precioTotal")

function recargarCarrito(){
    let carrito = [];
    productosEnCarrito.forEach((bebida) => {
        carrito.push(new Bebidas(bebida));
    });
    productosEnCarrito = carrito;
    MostrarProductosEnCarrito(productosEnCarrito)
}
recargarCarrito();
// BUSCADOR 
function buscar() {
    const resultadoBuscar = document.getElementById("resultadoBuscar").value;

    const resultado = estanteriaBebida.filter((bebida)=> {
        if(bebida.nombre.toLowerCase().includes(resultadoBuscar.toLowerCase()))
            return bebida;
    })
    CargarBebidasEnInicio(resultado)


}
// BOTON AGREGAR BEBIDA 
function CargarBebida (){
    let inputBebida = document.getElementById("BebidaInput") 
    let inputPrecio = document.getElementById("precioInput")
    let InputAlcohol = document.getElementById("TieneAlcoholInput")

    const bebida = {
        id: estanteriaBebida.length+1, 
        tieneAlcohol: TieneAlcoholInput.checked, 
        nombre: inputBebida.value,
        precio: inputPrecio.value,
        imagen: "imagen/vodkasmirnoff.jpg",
        cantidad:1
    };
    const BebidaNueva = new Bebidas(bebida);


    estanteriaBebida.push(BebidaNueva)

    inputBebida.value = ""
    inputPrecio.value = ""
    InputAlcohol.value = ""
    CargarBebidasEnInicio(estanteriaBebida)
}
// Capturar evento y agregar swal fire
document.getElementById('guardarBebidaBtn').addEventListener("click", ()=>{
    CargarBebida()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'La bebida ha sido agregada a la estanteria',
        showConfirmButton: false,
        timer: 2500
      })
})
// CARGAR TODAS LAS BEBIDAS DE LA ESTANTERIA EN EL INDEX
function CargarBebidasEnInicio (array) {
    let divbebidas = document.getElementById("bebidas")
    divbebidas.innerHTML=""

    for(let Bebida of array){
    
        let nuevodivbebida = document.createElement("div")
        nuevodivbebida.classList.add("col-12", "col-md-6", "col-lg-3", "my-4")
        nuevodivbebida.innerHTML=`
        <div id="${Bebida.id}" class="card" style="width: 18rem;">
                <img class="card-img-top img-fluid" style="height: 200px;"src="${Bebida.imagen}" alt="${Bebida.nombre}">
                <div class="card-body">
                    <p class="card-title">${Bebida.nombre}</p>
                    <p class="">Precio: ${Bebida.precio}</p>
                    <button id="agregarAlCarro${Bebida.id}" class="btn btn-outline-success">Agregar al carrito</button>
                </div>
        </div>` 
        // CAPTURAR EL EVENTO AGREGAR AL CARRITO
        divbebidas.appendChild(nuevodivbebida)
        let BotonAgregar =  document.getElementById(`agregarAlCarro${Bebida.id}`)
        
        BotonAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(Bebida)
            Toastify({
                text: `${Bebida.nombre} ha sido agregado al carrito`,
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){}
            }).showToast();
        })

    }


}
CargarBebidasEnInicio(estanteriaBebida)

// DARLE UN ORDEN
let selectOrden = document.getElementById('selectOrden')
selectOrden.addEventListener("change", ()=>{
    if(selectOrden.value=="1")
        ordenarBebida()
    else if(selectOrden.value=="2")
        ordenarBebidaMenAMay()
    else if(selectOrden.value=="3")
        ordenarBebidaAlf()
})


function ordenarBebidaMenAMay (){
    // MENOR A MAYOR
    estanteriaBebida.sort((a,b) => a.precio - b.precio)
    CargarBebidasEnInicio(estanteriaBebida)
}
function ordenarBebida(){
    // MAYOR A MENOr
    estanteriaBebida.sort((a,b) => b.precio - a.precio)
    CargarBebidasEnInicio(estanteriaBebida)
}
function ordenarBebidaAlf(){
    // ALFABETICAMENTE
    estanteriaBebida.sort((a,b) => {
        if ( a.nombre > b.nombre)
            return 1;
        else if ( a.nombre < b.nombre)
            return -1;
        return 0;
    })
    CargarBebidasEnInicio(estanteriaBebida)
}

// MODO OSCURO Y MODO CLARO
let ModoOscuro = document.getElementById('botonModoOscuro')
ModoOscuro.addEventListener("click",()=> {
    document.body.classList.add("darkMode")
    localStorage.setItem("modoOscuro", true)
})
let ModoClaro = document.getElementById("botonModoClaro")
ModoClaro.addEventListener("click",()=>{
    document.body.classList.remove("darkMode")
    localStorage.setItem("modoOscuro", false)
})

let oscuro 
if(localStorage.getItem("modoOscuro")){
    oscuro = JSON.parse(localStorage.getItem("modoOscuro"))
}else{
    console.log("Entra por primera vez")
    localStorage.setItem("modoOscuro", false)
    oscuro = JSON.parse(localStorage.getItem("modoOscuro"))
} 

// CARRITO

function agregarAlCarrito(bebida){
    productosEnCarrito.push(bebida)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}

function MostrarProductosEnCarrito(array){
    ModalCarrito.innerHTML=""
    array.forEach((productoEnCarrito) => {
        let child = document.createElement("div")
        child.innerHTML = `
        <div class="card border-primary mb-3" id ="productoCarrito${productoEnCarrito.id}" style="max-width: 450px;">
                 <img class="card-img-top" height="250px" width= "200px" src="${productoEnCarrito.imagen}" alt="">
                 <div class="card-body">
                    <h4 class="card-title">${productoEnCarrito.nombre}</h4>
                    
                    <p class="card-text">$${productoEnCarrito.precio}</p> 
                    <p class="card-text">Total de unidades: ${productoEnCarrito.cantidad}</p>
                    <p class="card-text">Subtotal: ${productoEnCarrito.precio * productoEnCarrito.cantidad}</p>
                    <button class= "btn btn-success" id="botonSumarUnidad${productoEnCarrito.id}"><i class=""></i>+1</button>
                    <button class= "btn btn-danger" id="botonEliminarUnidad${productoEnCarrito.id}"><i class=""></i>-1</button>
                    <button class= "btn btn-danger" id="botonEliminar${productoEnCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                </div>    
        </div>
        `
        ModalCarrito.appendChild(child);
        // ELIMINAR DEL CARRITO
        let botonEliminar = document.getElementById(`botonEliminar${productoEnCarrito.id}`)
        botonEliminar.addEventListener("click",  ()=>{
            eliminarProducto(productoEnCarrito.id);
        });
        // SUMAR CANTIDAD
        document.getElementById(`botonSumarUnidad${productoEnCarrito.id}`).addEventListener("click", ()=> {
            productoEnCarrito.sumarCantidad()
            localStorage.setItem("carrito", JSON.stringify(array))
            MostrarProductosEnCarrito(array)
        })
        // RESTAR CANTIDAD  
        document.getElementById(`botonEliminarUnidad${productoEnCarrito.id}`).addEventListener("click", ()=>{
            productoEnCarrito.restaCantidad()
            if( productoEnCarrito.cantidad <= 0 ){
                let nuevoCarrito2 = [];
                array.forEach((bebida) => {
                    if(bebida.id != productoEnCarrito.id)
                        nuevoCarrito2.push(bebida);
                });

                array = nuevoCarrito2;
            }
            localStorage.setItem("carrito", JSON.stringify(array))
            MostrarProductosEnCarrito(array)
        })

    })

    calcularTotal(array)
}
// CALCULAR EL PRECIO TOTAL DEL CARRITO
function calcularTotal(array){
    let total = array.reduce((acc, productoCarrito) => acc + productoCarrito.precio*productoCarrito.cantidad, 0)
    console.log(total)
    precioTotal.innerHTML = `El total del carrito es $${total}`     
}


let botonCarrito = document.getElementById("botonCarrito")
botonCarrito.addEventListener("click", ()=>{
    MostrarProductosEnCarrito(productosEnCarrito)
})

// ELIMINAR PRODUCTOS DEL CARRITO 
const eliminarProducto = (id) => {

    Swal.fire({
        title: '¿Desea eliminar este producto de su carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, deseo eliminarlo!',
        cancelButtonText: 'Cancelar'
        })
        .then((result) => {
            if (result.isConfirmed) {
                let nuevoCarrito2 = [];
                productosEnCarrito.forEach((bebida) => {
                    if(bebida.id != id)
                        nuevoCarrito2.push(bebida);
                });

                productosEnCarrito = nuevoCarrito2;
                MostrarProductosEnCarrito(productosEnCarrito)

                localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
            }
        }
    )

}
//  FINALIZAR COMPRA - ESTILO
document.getElementById("botonFinalizarCompra").addEventListener("click", ()=>{
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su compra ha sido finalizada',
        showConfirmButton: false,
        timer: 2500
      })
})
