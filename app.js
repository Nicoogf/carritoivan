// Variables que mantienen el estado visible del carrtio

let carritoVisible = false ;

//Esperamos que todos los elementos de la pagina se carguen para continuar con la ejecucion

if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded" , ready )
}else{
    ready()
}

function ready(){
    //Se agrega funcionalidad a los botones del carrtio

    let botonesEliminarItem = document.getElementsByClassName("btn-eliminar")
    for (let i = 0 ; i < botonesEliminarItem.length; i++){
        let button = botonesEliminarItem[i];
        button.addEventListener("click" , eliminarItemCarrito);
    }


    //Agregar funcionalidad al boton de sumar cantidad

    let botonSumarCantidad = document.getElementsByClassName("sumar-cantidad");
        for (let i = 0 ; i < botonSumarCantidad.length ; i++){
                let button = botonSumarCantidad[i];
                button.addEventListener("click",  sumarCantidad ) ;

        }
}


//eliminar item seleccionado del carrtio

function eliminarItemCarrito(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    //actualizar el total del carrito una vez eliminado el producto

    actualizarTotalCarrito();

        //La siguiente funcion verifica si hay elementos en el carrito una vez que se elimino 
        // Si no hay nada , se oculta el carrito
        ocultarCarrito () ;
}

//Actualziar Carrito
function actualizarTotalCarrito(){
    //Seleccionar el contenedor del carrito
    let carritoContendor = document.getElementsByClassName("carrito")[0];
    let carritoItems = carritoContendor.getElementsByClassName("carrito-item");
    let total = 0

    //recorre el elemento del carrito para actualizar el total
    for (let  i = 0 ; i < carritoItems.length ; i++){
        let item= carritoItems[i];
        let precioElemento = item.getElementsByClassName("carrito-item-precio")[0];
        console.log(precioElemento);

        //se quita el simbolo peso 
        let precio = parseFloat(precioElemento.innerText.replace("$" , "").replace("." , ""));
        console.log(precio)
        let cantidadItem = item.getElementsByClassName("carrito-item-cantidad")[0];
        let cantidad = cantidadItem.value;
        console.log(cantidad)
        total = total + (precio * cantidad);
        
    }

    total = Math.round(total*100)/100
    document.getElementsByClassName("carrito-precio-total")[0].innerText = "$" + total.toLocaleString("es") + ",00";
}

function ocultarCarrito () {
    let carritoItems = document.getElementsByClassName("carrito-items")[0];
    if(carritoItems.childElementCount == 0){
        let carrito = document.getElementsByClassName("carrito")[0]
        carrito.style.marginRight = "-100%";
        carrito.style.opacity = "0";
        carritoVisible = false ;


    //ahora maximizo el contenedor de los elementos
     let items = document.getElementsByClassName("contenedor-items")[0];
     items.style.width = "100%";

    }
}



//Aumentar en uno la cantidad del elemento seleccionado 

function sumarCantidad(event) {
    let  buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName("carrito-item-cantidad")[0].value ;
   console.log(cantidadActual)
   cantidadActual++;
   selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadActual;
}