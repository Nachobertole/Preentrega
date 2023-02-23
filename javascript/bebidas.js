class Bebidas {
    constructor(bebida){
        this.id = bebida.id,
        this.tieneAlcohol = bebida.tieneAlcohol,
        this.nombre = bebida.nombre,
        this.precio = bebida.precio,
        this.imagen = bebida.imagen,
        this.cantidad = bebida.cantidad
    }
    MostrarDetalle(){
        console.log(`La bebida es ${this.nombre} y su precio es ${this.precio}`)
    }
    sumarCantidad(){
        this.cantidad = this.cantidad + 1
        return this.cantidad
    } 
    restaCantidad(){
        this.cantidad = this.cantidad - 1 
        return this.cantidad

    }
}
