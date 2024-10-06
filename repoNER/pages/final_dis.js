let distribuidoresSerializado = localStorage.getItem("distribuidores")

let distribuidores = JSON.parse(distribuidoresSerializado)

let cardsContainer = document.createElement("div")

cardsContainer.className = "cards-container"

document.body.append(cardsContainer)

renderAll()

function renderArticulos(productoFaltante){
    let articuloText = document.createElement("div");
    articuloText.innerHTML = `<p>${productoFaltante.articulo}              ${productoFaltante.cantidad} 
                            <button class= "artic-remove" id="${productoFaltante.id}"> Eliminar </button>`
                            
                            
    return articuloText
    
}

function renderAll(){


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


    }

}