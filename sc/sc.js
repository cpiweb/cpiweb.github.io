
const showData1 = document.getElementById('showData1');

const showData2 = document.getElementById('showData2');
showData2.style.display="None"

const showData3 = document.getElementById('showData3');
showData3.style.display="None"

const showData4 = document.getElementById('showData4');
showData4.style.display="None"


const table = document.createElement("table");
table.setAttribute("id", "myTable");
table.setAttribute("class", "table table-light table-striped");

let tr = table.insertRow(-1);

/* let th = document.createElement("th");
th.innerHTML = "Seleccionar Tareas";
tr.appendChild(th);
 */
for (let i = 0; i < equipos.length; i++) {

    tr = table.insertRow(-1);
    let tabCell = tr.insertCell(-1);
    tabCell.innerHTML = equipos[i]["Nombre"];
    tr.insertCell(-1).innerHTML ='<button id="'+equipos[i]["ID"]+'" class="btn btn-primary" onclick="mostrar_SC(this.id)">Seleccionar</button>'
}


const entrada = document.createElement("input")
entrada.setAttribute("type","text")
entrada.setAttribute("id","myInput")
entrada.setAttribute("onkeyup","myFunction()")
entrada.setAttribute("placeholder","Buscar Solución Constructiva...")

const salto_linea= document.createElement("br")

showData1.innerHTML = "";
showData1.appendChild(entrada);
showData1.appendChild(salto_linea);
showData1.appendChild(table);


function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

function mostrar_SC (id_sc) {
      showData1.style.display="None"
      showData2.style.display="block"

      for (let i = 0; i < equipos.length; i++) {

        if (equipos[i].ID==id_sc) {
            const header1 = document.createElement("p")
            header1.innerHTML = "Mostrando SC para " + equipos[i].Nombre
            header1.setAttribute("class","h4")

            const div1 = document.createElement("div")
            div1.setAttribute("id","botonera")

            const boton1= document.createElement("button")
            boton1.innerHTML="Layout"
            boton1.setAttribute("id","boton1")

            const boton2= document.createElement("button")
            boton2.innerHTML="Conectividad"
            boton2.setAttribute("id","boton2")

            const boton3= document.createElement("button")
            boton3.innerHTML="Energía"
            boton3.setAttribute("id","boton3")

            const boton4= document.createElement("button")
            boton4.innerHTML="Specs"
            boton4.setAttribute("id","boton4")

            div1.appendChild(boton1)
            div1.appendChild(boton2)
            div1.appendChild(boton3)
            div1.appendChild(boton4)

            const header2 = document.createElement("p")
            header2.innerHTML = "Solución por defecto:"
            header1.setAttribute("class","h5")

            const text1 = document.createElement("p")
            text1.innerHTML = "Rack: " + equipos[i].Rack[0]
            text1.setAttribute("class","h6")

            const text2 = document.createElement("p")
            text2.innerHTML = "Energía: " + equipos[i].Energia[0]
            text2.setAttribute("class","h6")

            const text3 = document.createElement("p")
            text3.innerHTML = "UTP: " + equipos[i].UTP[0]
            text3.setAttribute("class","h6")

            const text4 = document.createElement("p")
            text4.innerHTML = "Fibra: " + equipos[i].Fibra[0]
            text4.setAttribute("class","h6")

            showData2.innerHTML = "";
            showData2.appendChild(header1)
            showData2.appendChild(div1)
            showData2.appendChild(header2)
            showData2.appendChild(text1)
            showData2.appendChild(text2)
            showData2.appendChild(text3)
            showData2.appendChild(text4)
            }
      }
}