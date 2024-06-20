const DOLAR = 850

const divShowData = document.getElementById('showData');
divShowData.style.display = "block"

let divshow= document.getElementById("div_show")
divshow.style.display= "None"

const table = document.createElement("table");
table.setAttribute("id", "myTable");
table.setAttribute("class", "table table-light table-striped");

let tr = table.insertRow(-1);

for (let i = 0; i < listamat["LISTAMAT"].length; i++) {

    tr = table.insertRow(-1);
    tr.insertCell(-1).innerHTML = listamat["LISTAMAT"][i]["MATERIAL"];
    tr.insertCell(-1).innerHTML = listamat["LISTAMAT"][i]["DESCRIPCION"];
    tr.insertCell(-1).innerHTML ='<button class="btn btn-primary" onclick="ver_stock('+listamat["LISTAMAT"][i]["MATERIAL"]+')">Stock</button>'
    tr.insertCell(-1).innerHTML ='<button class="btn btn-success" onclick="agregar('+listamat["LISTAMAT"][i]["MATERIAL"]+')">Agregar</button>'
}

const entrada = document.createElement("input")
entrada.setAttribute("type","text")
entrada.setAttribute("id","myInput")
entrada.setAttribute("onkeyup","myFunction()")
entrada.setAttribute("placeholder","Buscar material...")

const salto_linea= document.createElement("br")

divShowData.innerHTML = "";
divShowData.appendChild(entrada);
divShowData.appendChild(salto_linea);
divShowData.appendChild(table);

function myFunction() {
    // Declare variables
    var input, filter, table, tr, td0, td1, i, txtValue0, txtValue1;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td0 = tr[i].getElementsByTagName("td")[0];
        td1 = tr[i].getElementsByTagName("td")[1];
        if (td0) {
          txtValue0 = td0.textContent || td0.innerText;
          txtValue1 = td1.textContent || td1.innerText;
          if ((txtValue0.toUpperCase().indexOf(filter) > -1) || (txtValue1.toUpperCase().indexOf(filter) > -1)) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
    }
  }

function ver_stock(material) {

    let i, descripcion, centro, almacen, unidad, cantidad, valorizado, fecha, linea, lista

    linea= []
    lista= []

    for (i = 0; i < stock["Bajada_diaria"].length; i++) {

        if (stock["Bajada_diaria"][i]["Material"]==material){

            descripcion = stock["Bajada_diaria"][i]["Texto breve de material"]
            centro = stock["Bajada_diaria"][i]["Ce."]
            almacen = stock["Bajada_diaria"][i]["Alm."]
            unidad = stock["Bajada_diaria"][i]["UMB"]
            cantidad = stock["Bajada_diaria"][i]["Libre utilización"]
            valorizado = stock["Bajada_diaria"][i]["Valor libre util."]
            fecha = stock["Bajada_diaria"][0]["Fecha"]
            linea = [material, descripcion, centro, almacen, unidad, cantidad, valorizado, fecha]
            lista.push(linea)
        }
    }

    let divshow= document.getElementById("div_show")
    divshow.style.display= "flex"
    divshow.style.flexDirection= "column"
    divshow.scrollIntoView()

    let icono= document.createElement("img")
    icono.setAttribute("src","./close.svg")
    icono.setAttribute("width","20 rem")
    icono.setAttribute("onclick","borrarHijos()")
    divshow.appendChild(icono)

    let catalogo = document.createElement("p")
    catalogo.setAttribute ("class", "titulo_issue")
    catalogo.innerHTML = material + "-" + descripcion
    divshow.appendChild(catalogo)

//    alert(lista)

    const tabla = document.createElement("table");
    tabla.setAttribute("id", "Tabla");
//    tabla.setAttribute("class", "table table-light table-striped");

//    let tr = tabla.insertRow(-1);

    for (let j = 0; j < lista.length; j++) {

        let tr = tabla.insertRow(-1);
        tr.insertCell(-1).innerHTML = lista[j][2];
        tr.insertCell(-1).innerHTML = lista[j][3];
        tr.insertCell(-1).innerHTML = lista[j][4];
        tr.insertCell(-1).innerHTML = lista[j][5];
    }

    divshow.appendChild(tabla)

/*     let responsable = document.createElement("p")
    responsable.setAttribute ("class", "texto_issue")
    try {
      responsable.innerHTML = "Responsable: " + issue.fields.assignee.displayName
    } catch {
      responsable.innerHTML = "Responsable: No asignado"
    }
    divshow.appendChild(responsable)

    let informador = document.createElement("p")
    informador.setAttribute ("class", "texto_issue")
    informador.innerHTML = "Informador: " + issue.fields.reporter.displayName
    divshow.appendChild(informador)

    let fecha_creacion = document.createElement("p")
    fecha_creacion.setAttribute ("class", "texto_issue")
    fecha_creacion.innerHTML = "Creada: " + issue.fields.customfield_11282
    divshow.appendChild(fecha_creacion)

    let fecha_necesidad = document.createElement("p")
    fecha_necesidad.setAttribute ("class", "texto_issue")
    fecha_necesidad.innerHTML = "Fecha Vencimiento: " + issue.fields.duedate
    divshow.appendChild(fecha_necesidad)

    let fecha_planificada = document.createElement("p")
    fecha_planificada.setAttribute ("class", "texto_issue")
    fecha_planificada.innerHTML = "Fecha Planificada: " + issue.fields.customfield_12174
    divshow.appendChild(fecha_planificada)

    let edificio = document.createElement("p")
    edificio.setAttribute ("class", "texto_issue")
    try{
      edificio.innerHTML = "Edificio: " + issue.fields.customfield_13399.value
    } catch {
      edificio.innerHTML = "Edificio: No informado"
    }
    divshow.appendChild(edificio)

    let pep = document.createElement("p")
    pep.setAttribute ("class", "texto_issue")
    pep.innerHTML = "PEP: " + issue.fields.customfield_13414
    divshow.appendChild(pep)

    let padre = document.createElement("p")
    padre.setAttribute ("class", "texto_issue")
    try{
      padre.innerHTML = "Tarea Padre: " + issue.fields.parent.key + " - " + issue.fields.parent.fields.summary
    } catch {
      padre.innerHTML = "Tarea Padre: No Tiene"
    }
    divshow.appendChild(padre)

    let boton = document.createElement("button")
    boton.setAttribute ("class", "btn btn-primary")
    boton.setAttribute ("onclick",`openURL('${issue.key}')`)
    boton.innerHTML = "Abrir en Jira"
    divshow.appendChild(boton)
 */
}

function agregar(material) {

}

function borrarHijos() {
  const myNode = document.getElementById("div_show");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  myNode.style.display="None"
}


/*
let col2 = ["#","Pos NPA","Tarea","Cantidad","Precio","Subtotal","Acción"];

const table2 = document.createElement("table");
table2.setAttribute("id", "myTable2");
table2.setAttribute("class", "table");
table2.setAttribute("class", "table table-light table-striped");

let tr2 = table2.insertRow(-1);                   // table row.

for (let i = 0; i < col2.length; i++) {
    let th2 = document.createElement("th");      // table header.
    th2.innerHTML = col2[i];
    tr2.appendChild(th2);
}
*/