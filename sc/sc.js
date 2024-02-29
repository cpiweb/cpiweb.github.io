
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
for (let i = 0; i < soluciones.length; i++) {

    tr = table.insertRow(-1);
    let tabCell = tr.insertCell(-1);
    tabCell.innerHTML = soluciones[i]["Nombre"];
    tr.insertCell(-1).innerHTML ='<button id="'+soluciones[i]["ID"]+'" class="btn btn-primary" onclick="mostrar_SC(this.id)">Seleccionar</button>'
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

      for (let i = 0; i < soluciones.length; i++) {

        if (soluciones[i].ID==id_sc) {
            const header1 = document.createElement("p")
            header1.innerHTML = "Mostrando SC para " + soluciones[i].Nombre
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

            const div2 = document.createElement("div")
            div2.setAttribute("class","seteo_sc")

            const text1 = document.createElement("p")
            text1.innerHTML = "Rack: "
            text1.setAttribute("class","h6")

            const select1 = document.createElement("select")
            select1.setAttribute("id","sel1")
            select1.setAttribute("class","sel")

//            select1.innerHTML='<option value="' + soluciones[i].Rack[0] + '">' + soluciones[i].Rack[0] + '</option>'

            for (let j = 0; j < soluciones[i].Rack.length; j++) {

                  select1.innerHTML = select1.innerHTML +
                    '<option value="' + soluciones[i].Rack[j] + '">' + soluciones[i].Rack[j] + '</option>';
            }

            div2.appendChild(text1)
            div2.appendChild(select1)

            const div3 = document.createElement("div")
            div3.setAttribute("class","seteo_sc")

            const text2 = document.createElement("p")
            text2.innerHTML = "Energía: "
            text2.setAttribute("class","h6")

            const select2 = document.createElement("select")
            select2.setAttribute("id","sel2")
            select2.setAttribute("class","sel")
//            select2.innerHTML='<option value="' + soluciones[i].Energia[0] + '">' + soluciones[i].Energia[0] + '</option>'

            for (let j = 0; j < soluciones[i].Energia.length; j++) {

                  select2.innerHTML = select2.innerHTML +
                    '<option value="' + soluciones[i].Energia[j] + '">' + soluciones[i].Energia[j] + '</option>';
            }

            div3.appendChild(text2)
            div3.appendChild(select2)

            const div4 = document.createElement("div")
            div4.setAttribute("class","seteo_sc")

            const text3 = document.createElement("p")
            text3.innerHTML = "UTP: "
            text3.setAttribute("class","h6")

            const select3 = document.createElement("select")
            select3.setAttribute("id","sel3")
            select3.setAttribute("class","sel")

//            select3.innerHTML='<option value="' + soluciones[i].UTP[0] + '">' + soluciones[i].UTP[0] + '</option>'

            for (let j = 0; j < soluciones[i].UTP.length; j++) {

                  select3.innerHTML = select3.innerHTML +
                    '<option value="' + soluciones[i].UTP[j] + '">' + soluciones[i].UTP[j] + '</option>';
            }

            div4.appendChild(text3)
            div4.appendChild(select3)

            const div5 = document.createElement("div")
            div5.setAttribute("class","seteo_sc")

            const text4 = document.createElement("p")
            text4.innerHTML = "Fibra: "
            text4.setAttribute("class","h6")

            const select4 = document.createElement("select")
            select4.setAttribute("id","sel4")
            select4.setAttribute("class","sel")

            //            select4.innerHTML='<option value="' + soluciones[i].Fibra[0] + '">' + soluciones[i].Fibra[0] + '</option>'

            for (let j = 0; j < soluciones[i].Fibra.length; j++) {

                  select4.innerHTML = select4.innerHTML +
                    '<option value="' + soluciones[i].Fibra[j] + '">' + soluciones[i].Fibra[j] + '</option>';
            }

            div5.appendChild(text4)
            div5.appendChild(select4)

            showData2.innerHTML = "";
            showData2.appendChild(header1)
            showData2.appendChild(div1)
            showData2.appendChild(header2)
            showData2.appendChild(div2)
            showData2.appendChild(div3)
            showData2.appendChild(div4)
            showData2.appendChild(div5)
            }
      }
}