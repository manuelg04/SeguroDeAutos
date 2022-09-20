
//constructores

function Seguro(marca, year, tipo){

    this.marca = marca;
    this.year = year;
    this.tipo = tipo;


}

//realiza la cotizacion con los datos

Seguro.prototype.cotizarSeguro = function(){

    /*
    1 = AMERICANO 1.15
    2 = ASIATICO 1.05
    3= EUROPEO 1.35

    */


let cantidad;
const base = 2000;

switch(this.marca){
case "1":
cantidad = base*1.15
break;
case "2":
cantidad = base *1.05
break;
case "3":
cantidad = base * 1.35
break;


    default:
        break;


}

//leer el año

const diferencia = new Date().getFullYear() - this.year;

// cada año que la diferencia es mayor, el costo se reduce un 3% el VALOR DEL SEGURO
cantidad -= ((diferencia*3)*cantidad) / 100 ;

/*

Si el seguro es basico se multiplica por un 30% mas
Si el seguro es completo se multiplica por un 50% mas



*/

if(this.tipo === "basico"){

    cantidad *= 1.30;
}else{

    cantidad *= 1.50;
}

return cantidad;

console.log(cantidad)

}

function UI(){

}

//Llena las opciones de los años
UI.prototype.llenarOpciones = () =>{

    const max = new Date().getFullYear(),
          min= max-20;

          const selectYear = document.querySelector("#year");

          for(let i=max; i>min;i--){
            let option = document.createElement("option");
            option.value= i;
            option.textContent= i;
            selectYear.appendChild(option);

          }
          
}

//MUESTRA ALERTAS EN PANTALLA

UI.prototype.mostrarMensaje = (mensaje, tipo) =>{

    const div = document.createElement("div");

    if(tipo ==="error"){

        div.classList.add("error")
    }else{

        div.classList.add( "correcto")
    }

    div.classList.add("mensaje", "mt-10");
    div.textContent = mensaje;

    //INSERTAR EN EL HTML

    const formulario = document.querySelector("#cotizar-seguro");
    formulario.insertBefore(div, document.querySelector("#resultado"))

    setTimeout(() => {
        div.remove();
    }, 3000);

}


UI.prototype.mostrarResultado = (total, seguro) => {

    //destructuring

    const { marca, year, tipo} = seguro;

    let textoMarca;

    switch(marca){

        case "1":
            textoMarca = "Americano"
            break;
        case "2":
            textoMarca = "Asiatico"
            break;
        case "3":
            textoMarca = "Europeo"
            break;


        default:
            break;
    }

    const div = document.createElement("div");
    div.classList.add("mt-10");

    //ASI SE CREA HTML PARA MOSTRAR EL RESULTADO DE LA COTIZACION

    div.innerHTML = `
    <p class = "header"> Tu resumen </p>
    <p class="font-bold">Marca : <span class="font-normal">  ${textoMarca}</span></p>
    <p class="font-bold">Año : <span class="font-normal">  ${year}</span></p>
    <p class="font-bold">Tipo : <span class="font-normal capitalize">  ${tipo}</span></p>
    <p class="font-bold">Total : <span class="font-normal"> $ ${total}</span></p>

    `
    const resultadoDiv = document.querySelector("#resultado");
    


    //MOSTRAR EL SPINNER
    const spinner = document.querySelector("#cargando");
    spinner.style.display = "block";

    setTimeout(() => {
        spinner.style.display= "none";//se borra el spinner pero se muestra el resultado
        resultadoDiv.appendChild(div)//se muestra el resultado

    }, 3000);

}
//Instanciar UI

const ui =  new UI();


document.addEventListener("DOMContentLoaded", () => {
    ui.llenarOpciones();//LLENA EL SELECT CON LOS AÑOS

})

addEventListeners()
function addEventListeners(){

    const formulario = document.querySelector("#cotizar-seguro");
    formulario.addEventListener("submit", cotizarSeguro);


}

function cotizarSeguro(e){

    e.preventDefault();

    //leer la marca seleccionada

    const marca = document.querySelector("#marca").value;


    //leer el año seleccionado

    const year = document.querySelector("#year").value;


    //leer el tipo de cobertura

    const tipo = document.querySelector('input[name="tipo"]:checked').value
    if(marca === "" || year === "" || tipo === ""){

        ui.mostrarMensaje("TODOS LOS CAMPOS SON OBLIGATORIOS" , "error");
        return;
    }
    
    ui.mostrarMensaje("COTIZANDO ESPERE POR FAVOR" , "exito");

    //ocultar las cotizaciones previas

    const resultados = document.querySelector("#resultado div")
    if(resultados != null){

        resultados.remove();
    }

    //instanciar el seguro

    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();


    //utilizar el prototype que va a cotizar

    ui.mostrarResultado(total, seguro);
}