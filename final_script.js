let distribuidores = [];

class ProductoFaltante{
    static id = 0;

    constructor(articulo, cantidad){
        this.id = ++ProductoFaltante.id;
        
        this.articulo = articulo;
        this.cantidad = cantidad;
    }
}

let home = document.getElementById("inicio-container")

const distriButton = document.getElementById("distribuidor-bttn")

let distribuidoresContainer = document.createElement("div")

let cardsContainer = document.createElement("div")

cardsContainer.className = "cards-container"

distriButton.onclick = () => {
    distribuidor();
    home.remove()
    
}

function distribuidor(){
    
    distribuidoresContainer.className = "distribuidores-container"

    distribuidoresContainer.innerHTML = `<h3 class = "seleccione-distri">Por favor, seleccione el distribuidor</h3>
                                    <select name="" id="distri-selector">
                                    <option value="">Seleccione una opción</option>
                                    <option value="">Coca Cola Company</option>
                                    <option value="">Pepsi</option>
                                    <option value="">Quilmes Distribuidora</option>
                                    <option value="">San Martín Bebidas</option>
                                    
                                    </select>
                                    <button type="submit" id="agregar-distribuidor" > Agregar </button>
                                    <a href="pages/allDis.html" class="made-button">Click aquí para finalizar</a>
                                    
                                    
                                    `
                                    // <button id="final-true">Click aquí para finalizar</button>
                                    // <option value="">Ingresar otro distribuidor... </option>
    document.body.appendChild(distribuidoresContainer)

    let distriSelected = document.getElementById("distri-selector")
    
    document.body.appendChild(cardsContainer)

    let distriSelectedValue
    distriSelectedValue = distriSelected.onchange = () => { 
        distriSelectedValue = distriSelected.options[distriSelected.selectedIndex].text
        return;
    }

    let agregarDistri = document.getElementById("agregar-distribuidor");
    agregarDistri.onclick = () => {
        if((distriSelectedValue === "Seleccione una opción") || typeof(distriSelectedValue) == "function"){
            
        }
        else{
            if(distribuidores.some(d => d[0] == distriSelectedValue)){

                for (distribuidor of distribuidores){

                    if (distriSelectedValue == distribuidor[0]){

                        let faltantesContainer = document.createElement("div");

                        faltantesContainer.innerHTML = `Por favor, ingrese articulo faltante del distribuidor  ${distriSelectedValue} :
                                                                <input id="art-faltante" type="text" placeholder="Articulo">
                                                                <input type="number" name="" id="cant-faltante">
                                                                <button type="submit" id="agregar-articulo" > Agregar </button>
                                                                <button id="fin-articulos"> Proximo distribuidor </button>`
                    
                        distribuidoresContainer.appendChild(faltantesContainer);

                        const agregarArticulo = document.getElementById("agregar-articulo");
                        const finalizarArticulos = document.getElementById("fin-articulos");
        
                        agregarUno(agregarArticulo, distribuidor)

                        finalizarArt(agregarDistri, finalizarArticulos, faltantesContainer)
                        
                    }
                }

            }
            else{
                faltantes = agregarProductos(distriSelectedValue, agregarDistri);
                agregarDistri.disabled = true;
                distribuidores.push([distriSelectedValue, faltantes]);        
            }
            
        }
        
    }
    
    // const finalizarDistri = document.getElementById("final-true")
}

function agregarProductos(distri, addDisButton) {
    let productosFaltantes = [];

    let faltantesContainer = document.createElement("div");

    faltantesContainer.innerHTML = `Por favor, ingrese articulo faltante del distribuidor  ${distri} :
                                            <input id="art-faltante" type="text" placeholder="Articulo">
                                            <input type="number" name="" id="cant-faltante">
                                            <button type="submit" id="agregar-articulo" > Agregar </button>
                                            <button id="fin-articulos"> Proximo distribuidor </button>`

    distribuidoresContainer.appendChild(faltantesContainer);

    const articuloFaltante = document.getElementById("art-faltante");
    const cantidadFaltante = document.getElementById("cant-faltante");
    const agregarArticulo = document.getElementById("agregar-articulo");
    const finalizarArticulos = document.getElementById("fin-articulos");


    let totalCard = document.createElement("div");
    let distriName = document.createElement("div");

    totalCard.className = "total-card"


    cardsContainer.appendChild(totalCard);

    distriName.innerHTML = `<h2 class = "distri-name">${distri}</h2>`;
    totalCard.appendChild(distriName);

    agregarArticulo.onclick = () =>{

        const productoFaltante = new ProductoFaltante(articuloFaltante.value.toUpperCase(), cantidadFaltante.value);
        
        productosFaltantes.push(productoFaltante);

        let articuloNameCant = renderArticulos(productoFaltante);
        
        totalCard.appendChild(articuloNameCant);
        eliminarArticulo()
        }
    finalizarArt(addDisButton, finalizarArticulos, faltantesContainer)
    
    return productosFaltantes;
}

function renderArticulos(productoFaltante){
    let articuloText = document.createElement("div");
    articuloText.innerHTML = `<p>${productoFaltante.articulo}              ${productoFaltante.cantidad} 
                            <button class= "artic-remove" id="${productoFaltante.id}"> Eliminar </button>`
                            
                            
    return articuloText
    
}

function eliminarArticulo(){
    removeButton = document.querySelectorAll(".artic-remove")
    removeButton.forEach(button =>{
        button.onclick = (e) => {
            for (distribuidor of distribuidores){
                    const articuloID = e.currentTarget.id

                    const selectedArticle = distribuidor[1].find(producto => producto.id == articuloID)
        
                    if(typeof(selectedArticle) !== "undefined"){
                        console.log(selectedArticle)
                        
                        distribuidor[1] = distribuidor[1].filter(
                        producto => producto.id !== selectedArticle.id
                        )
                        console.log(distribuidores)
                        renderAll()
                        localStorage.setItem("distribuidores", JSON.stringify(distribuidores));
                    }
            }
        }
    })
    
}

function renderAll(){

    let cards= document.querySelectorAll(".total-card")

    for (card of cards){
        card.remove()
    }

    for (distribuidor of distribuidores){

        let totalCard = document.createElement("div");
        let distriName = document.createElement("div");

        totalCard.className = "total-card"

        cardsContainer.appendChild(totalCard);

        distriName.innerHTML = `<h2 class = "distri-name">${distribuidor[0]}</h2>`;
        
        totalCard.appendChild(distriName);
        
        for (producto of distribuidor[1]){
            let articuloNameCant = renderArticulos(producto);
        
            totalCard.appendChild(articuloNameCant);

        }
        eliminarArticulo()

    }

}

function agregarUno(addButton, distribuidor){

    addButton.onclick = () =>{
        const articuloFaltante = document.getElementById("art-faltante");
        const cantidadFaltante = document.getElementById("cant-faltante");

        const productoFaltante = new ProductoFaltante(articuloFaltante.value.toUpperCase(), cantidadFaltante.value);

        distribuidor[1].push(productoFaltante);
        renderAll()
        eliminarArticulo()
    }
}

function finalizarArt(addDisButton, finButton, faltantesContainer){
        finButton.onclick = () => {
        faltantesContainer.remove()
        addDisButton.disabled = false
        localStorage.setItem("distribuidores", JSON.stringify(distribuidores));
        }
}