
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
      showData3.style.display="block"

      for (let i = 0; i < soluciones.length; i++) {

        if (soluciones[i].ID==id_sc) {
            const header1 = document.createElement("p")
            header1.innerHTML = "Mostrando SC para " + soluciones[i].Nombre
            header1.setAttribute("class","h4")

            const sc_seleccionada = document.createElement("p")
            sc_seleccionada.innerHTML = id_sc
            sc_seleccionada.setAttribute("id","sc_seleccionada")

            showData1.appendChild(sc_seleccionada)

            const div1 = document.createElement("div")
            div1.setAttribute("id","botonera")

            const boton1= document.createElement("button")
            boton1.innerHTML="Layout"
            boton1.setAttribute("id","boton1")
            boton1.setAttribute("class","btn btn-primary")

            const boton2= document.createElement("button")
            boton2.innerHTML="Conectividad"
            boton2.setAttribute("id","boton2")
            boton2.setAttribute("class","btn btn-primary")

            const boton3= document.createElement("button")
            boton3.innerHTML="Energía"
            boton3.setAttribute("id","boton3")
            boton3.setAttribute("class","btn btn-primary")

            const boton4= document.createElement("button")
            boton4.innerHTML="Specs"
            boton4.setAttribute("id","boton4")
            boton4.setAttribute("class","btn btn-primary")

            div1.appendChild(boton1)
            div1.appendChild(boton2)
            div1.appendChild(boton3)
            div1.appendChild(boton4)

            const header2 = document.createElement("p")
            header2.innerHTML = "Solución por defecto:"
            header2.setAttribute("class","h5")

            const div2 = document.createElement("div")
            div2.setAttribute("class","seteo_sc")

            const text1 = document.createElement("p")
            text1.innerHTML = "Rack: "
            text1.setAttribute("class","h6")

            const select1 = document.createElement("select")
            select1.setAttribute("id","sel1")
            select1.setAttribute("class","sel")

            for (let j = 0; j < soluciones[i].Base.Rack.length; j++) {

                  select1.innerHTML = select1.innerHTML +
                    '<option value="' + soluciones[i].Base.Rack[j] + '">' + soluciones[i].Base.Rack[j] + '</option>';
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

            const input1 = document.createElement("input")
            input1.setAttribute("id","inp1")
            input1.setAttribute("class","inp")
            input1.setAttribute("value","20")

            for (let j = 0; j < soluciones[i].Base.Energia.length; j++) {

                  select2.innerHTML = select2.innerHTML +
                    '<option value="' + soluciones[i].Base.Energia[j] + '">' + soluciones[i].Base.Energia[j] + '</option>';
            }

            const text5 = document.createElement("p")
            text5.innerHTML = "metros al tablero"
            text5.setAttribute("class","texto")

            div3.appendChild(text2)
            div3.appendChild(select2)
            div3.appendChild(input1)
            div3.appendChild(text5)

            const div4 = document.createElement("div")
            div4.setAttribute("class","seteo_sc")

            const text3 = document.createElement("p")
            text3.innerHTML = "UTP: "
            text3.setAttribute("class","h6")

            const select3 = document.createElement("select")
            select3.setAttribute("id","sel3")
            select3.setAttribute("class","sel")

            const input2 = document.createElement("input")
            input2.setAttribute("id","inp2")
            input2.setAttribute("class","inp")
            input2.setAttribute("value","20")

            for (let j = 0; j < soluciones[i].Base.UTP.length; j++) {

                  select3.innerHTML = select3.innerHTML +
                    '<option value="' + soluciones[i].Base.UTP[j] + '">' + soluciones[i].Base.UTP[j] + '</option>';
            }

            const text6 = document.createElement("p")
            text6.innerHTML = "metros al concentrador"
            text6.setAttribute("class","texto")

            div4.appendChild(text3)
            div4.appendChild(select3)
            div4.appendChild(input2)
            div4.appendChild(text6)

            const div5 = document.createElement("div")
            div5.setAttribute("class","seteo_sc")

            const text4 = document.createElement("p")
            text4.innerHTML = "Fibra: "
            text4.setAttribute("class","h6")

            const select4 = document.createElement("select")
            select4.setAttribute("id","sel4")
            select4.setAttribute("class","sel")

            for (let j = 0; j < soluciones[i].Base.Fibra.length; j++) {

                  select4.innerHTML = select4.innerHTML +
                    '<option value="' + soluciones[i].Base.Fibra[j] + '">' + soluciones[i].Base.Fibra[j] + '</option>';
            }

            const select5 = document.createElement("select")
            select5.setAttribute("id","sel5")
            select5.setAttribute("class","sel")
            select5.innerHTML= "<option value=20>20m</option> <option value=30>30m</option> <option value=50>50m</option> <option value=70>70m</option> <option value=100>100m</option>"

            div5.appendChild(text4)
            div5.appendChild(select4)
            div5.appendChild(select5)

            const div6 = document.createElement("div")
            div6.setAttribute("class","seteo_sc")

            const boton5 = document.createElement("button")
            boton5.innerHTML = "Continuar"
            boton5.setAttribute("class","btn btn-primary")
            boton5.setAttribute("id","boton5")
            boton5.setAttribute("onclick","agregar_var()")

            div6.appendChild(boton5)

            showData2.innerHTML = "";
            showData2.appendChild(header1)
            showData2.appendChild(div1)
            showData3.innerHTML = "";
            showData3.appendChild(header2)
            showData3.appendChild(div2)
            showData3.appendChild(div3)
            showData3.appendChild(div4)
            showData3.appendChild(div5)
            showData3.appendChild(div6)

            }
      }
}


function agregar_var(){

        showData3.style.display="None"
        showData4.style.display="block"

        let sc_id = document.getElementById("sc_seleccionada").innerHTML


        const div16 = document.createElement("div")
        div16.setAttribute("class","seteo_sc")

        const boton15 = document.createElement("button")
        boton15.innerHTML = "Volver"
        boton15.setAttribute("class","btn btn-primary")
        boton15.setAttribute("id","boton15")
        boton15.setAttribute("onclick","volver()")

        const boton16 = document.createElement("button")
        boton16.innerHTML = "Continuar"
        boton16.setAttribute("class","btn btn-primary")
        boton16.setAttribute("id","boton15")
        boton16.setAttribute("onclick","generar_listado()")

        div16.appendChild(boton15)
        div16.appendChild(boton16)

        showData4.appendChild(div16)

            }
      