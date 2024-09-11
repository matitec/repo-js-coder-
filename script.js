let distribuidores = [];

class ProductoFaltante{
    static id = 0;

    constructor(articulo, cantidad){
        this.id = ++ProductoFaltante.id;
        
        this.articulo = articulo;
        this.cantidad = cantidad;
    }
}

let continuar = true;
// let productosFaltantes = [];

let lista = prompt("Buenos días, vamos a Reponer! ¿Cómo deseas listar hoy? Presiona 1 para listar por distribuidor.");

// while (lista != 1 && lista != 2)
while (lista != 1){
    lista = prompt("Por favor ingrese 1(Por distribuidor) o 2(Por marca)");
}

if(lista == 1){
    distribuidor();
}

// Proximamente
// else if(lista == 2){
//     marca();
// }


//Funciones principales 
function distribuidor(){
    
    do {
        newDis = prompt("Por favor, ingrese el distribuidor: ");
        while (newDis === ""){
            newDis = prompt("Por favor, ingrese el distribuidor: ");
        }
        distribuidores.push([newDis, []]);
        otro = parseInt(prompt("¿Desea agregar otro distribuidor? 1(Si) 2(No)"));
        while (otro != 1 && otro != 2){
            otro = parseInt(prompt("Por favor ingrese una opción válida: 1 para agregar otro distribuidor / 2 para terminar."));
        }
        if(otro == 2){
            continuar = false;
        }
    }
    while(continuar == true);

    let cantDistri = distribuidores.length
            alert("Genial! Ahora anotemos los productos faltantes :)")
            for( i=0 ; i < cantDistri ; i++ ){
                distribuidores[i][1] = agregarProductos();
            }
                ordenamos = parseInt(prompt("¿Desea ordenar alfabeticamente la lista de los productos faltantes? 1(si) 2(no)"))
                
                while (ordenamos != 1 && ordenamos != 2){
                    ordenamos = parseInt(prompt("Por favor ingrese una opción válida: 1 para ordenar lista / 2 para terminar."));
                }
                if (ordenamos == "1"){
                    for (distribuidor in distribuidores){
                        ordenarProductos(distribuidores[distribuidor][1])
                    }
                }
            for(distribuidor in distribuidores){
                // let arrayobj = distribuidores[distribuidor[1]]  
                // alert(`Los articulos faltantes del distribuidor ${distribuidores[distribuidor][0]} son: ` + distribuidores[distribuidor][1])
                console.log(`Los articulos faltantes del distribuidor ${distribuidores[distribuidor][0]} son: `, distribuidores[distribuidor][1])
            }

}

// Funciones Utilidades

function agregarProductos(){
    let productosFaltantes = [];
    continuarProductos = true

    while(continuarProductos == true){

        let articuloFaltante = prompt(`Por favor, ingrese articulo faltante del distribuidor  ${distribuidores[i]} : `).toLocaleUpperCase()

        while(articuloFaltante === ""){
            articuloFaltante = prompt("Por favor, ingrese una articulo válido.")
        }
        let cantidadFaltante = parseInt(prompt(`Por favor, ingrese cantidad(por pack) faltante: `))

        while(Number.isNaN(cantidadFaltante)== true){
            cantidadFaltante = parseInt(prompt("Por favor, ingrese una cantidad válida."))
        }

        const productoFaltante = new ProductoFaltante(articuloFaltante, cantidadFaltante)
        productosFaltantes.push(productoFaltante)

        otroProducto = parseInt(prompt("¿Desea agregar otro producto? 1(Si) 2(No)"));
        while (otroProducto != 1 && otroProducto != 2){
            otroProducto = parseInt(prompt("Por favor ingrese una opción válida: 1 para agregar otro producto / 2 para terminar."));
        }
        if(otroProducto == 2){
            continuarProductos = false;
        }else if(otroProducto == 1){
            continuarProductos = true;
        }
    }
    console.log(productosFaltantes)

    return productosFaltantes;

}

function ordenarProductos(listaProductosFaltantes) {
    listaProductosFaltantes.sort((a,b) => {
        if (a.articulo > b.articulo){
            return 1
        }

        if (a.articulo < b.articulo){
            return -1
        }
        return 0
    });
}
