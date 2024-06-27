
const DOLAR = 850;

const divShowData = document.getElementById('showData');

const divShowData2 = document.getElementById('showData2');
divShowData2.style.display="None"

function validar(){

    divShowData.style.display="None"
    divShowData2.style.display="block"

    const table1 = document.createElement("table");
    table1.setAttribute("id", "myTable1");
    table1.setAttribute("class", "table");

    divShowData2.appendChild(table1)

    var cuadroTexto = document.getElementById("cuadroTexto");
    var st = cuadroTexto.value;
    lista = st.split("\n");

    for (let i=0; i<lista.length; i++) {

          let material = lista[i]
          let tr = table1.insertRow(-1);

          tr.insertCell(-1).innerHTML = material;

          for (let j=0; j<stock["Bajada_diaria"].length; j++) {

                if ((stock["Bajada_diaria"][j]["Material"] == material) && (stock["Bajada_diaria"][j]["Valor libre util."] != 0)) {

                    tr.insertCell(-1).innerHTML = stock["Bajada_diaria"][j]["Texto breve de material"];
                    tr.insertCell(-1).innerHTML = Math.round(((stock["Bajada_diaria"][j]["Valor libre util."]/stock["Bajada_diaria"][j]["Libre utilización"])/DOLAR)*100)/100;
                    console.log(lista[i]+" encontrado en stock")
                    break;

                }
          }

          
    }


}

/* 
    const table3 = document.createElement("table");
    table3.setAttribute("id", "myTable3");
    table3.setAttribute("class", "table");

    divShowData3.innerHTML = "";
    divShowData3.appendChild(titulo3)
    divShowData3.appendChild(boton3)
    divShowData3.appendChild(boton4)

    for (let i = 0; i < ordenador.length; i++){
        cantidad_oe=0
        tr = table3.insertRow(-1);
        for (let j = 0; j < filas.length; j++){
            if (ordenador[i]==filas[j][2]){
              posicion=filas[j][2]
              descripcion=filas[j][3]
              precio=filas[j][6]
              cantidad_oe=parseFloat(cantidad_oe)+parseFloat(filas[j][5])
            }
        }
        tr.insertCell(-1).innerHTML = npa_proveedor;
        tr.insertCell(-1).innerHTML = "0010";
        tr.insertCell(-1).innerHTML = posicion;
        tr.insertCell(-1).innerHTML = descripcion;
        tr.insertCell(-1).innerHTML = fecha_entrega;
        tr.insertCell(-1).innerHTML = cantidad_oe.toString().replace('.', ',');
        tr.insertCell(-1).innerHTML = precio.toString().replace('.', ',');
        tr.insertCell(-1).innerHTML = ((Math.round(precio*cantidad_oe*100))/100).toString().replace('.', ',')
        total=(Math.round((total+(precio*cantidad_oe)))*100)/100
    }
 */