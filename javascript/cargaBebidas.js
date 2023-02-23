// CARGAR ESTANTERIA DESDE API EXTERNA
let estanteriaBebida = [];
let cantidadLlamadas = 0;

const cargarEstanteriaDesdeApi = () => {
    
    let bebidasAlcoholicas = [];
    let bebidasNoAlcoholicas = [];
    
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
        .then(response => response.json())
        .then(response => bebidasAlcoholicas = response)
        .then(() => {
            bebidasAlcoholicas.drinks.forEach((bebida) => {
                const rand = Math.floor(Math.random() * (1500 - 150) + 150);
                const drink = {
                    id: bebida.idDrink, 
                    tieneAlcohol: true, 
                    nombre: bebida.strDrink,
                    precio: rand,
                    imagen: bebida.strDrinkThumb,
                    cantidad: 1
                };
                estanteriaBebida.push(new Bebidas(drink));
            });
            cantidadLlamadas++;
        })
        .catch(err => console.error(err));

    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
        .then(response => response.json())
        .then(response => bebidasNoAlcoholicas = response)
        .then(() => {
            bebidasNoAlcoholicas.drinks.forEach((bebida) => {
                const rand = Math.floor(Math.random() * (1500 - 150) + 150);
                const drink2 = {
                    id: bebida.idDrink, 
                    tieneAlcohol: true, 
                    nombre: bebida.strDrink,
                    precio: rand,
                    imagen: bebida.strDrinkThumb,
                    cantidad: 1
                };
                estanteriaBebida.push(new Bebidas(drink2));
            });
            cantidadLlamadas++;
        })
        .catch(err => console.error(err));
}
cargarEstanteriaDesdeApi()