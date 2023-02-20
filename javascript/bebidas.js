class Bebidas {
    constructor(id, tieneAlcohol, nombre, precio, imagen){
        this.id = id,
        this.tieneAlcohol = tieneAlcohol,
        this.nombre = nombre,
        this.precio = precio,
        this.imagen = imagen
    }
    MostrarDetalle(){
        console.log(`La bebida es ${this.nombre} y su precio es ${this.precio}`)
    }
}
