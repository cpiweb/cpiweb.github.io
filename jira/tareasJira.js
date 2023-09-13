const BASE_URL="https://cpiweb.pythonanywhere.com/"

let pshow1= document.getElementById("p_show1")
pshow1.style.display= "None"

let divshow= document.getElementById("div_show")
divshow.style.display= "None"

function buscar_tareas(){

    let stream1= document.getElementById("stream1").checked
    let stream2= document.getElementById("stream2").checked
    let estado1= document.getElementById("estado1").checked
    let estado2= document.getElementById("estado2").checked
    let estado3= document.getElementById("estado3").checked
    let estado4= document.getElementById("estado4").checked
    let estado5= document.getElementById("estado5").checked
    
    let ponderador = 0
    
    if (stream1){
        ponderador=ponderador+1000000
    }
    if (stream2){
        ponderador=ponderador+100000
    }
    if (estado1){
        ponderador=ponderador+10000
    }
    if (estado2){
        ponderador=ponderador+1000
    }
    if (estado3){
        ponderador=ponderador+100
    }
    if (estado4){
        ponderador=ponderador+10
    }
    if (estado5){
        ponderador=ponderador+1
    }
    
    let pond= String(ponderador).padStart(7,'0')

    const END_POINT = "getIssues/"+pond
    
//    alert(END_POINT)
    
    fetch(BASE_URL+END_POINT)
    .then(response => response.json())  // convertir a json
    .then(json => mostrar(json))    //imprimir los datos en la consola
    .catch(err => alert('Solicitud fallida', err)); // Capturar errores}
    
    }
    
function mostrar (issues){

    // Crear tabla
    const table1 = document.createElement("table");
    table1.setAttribute("id", "myTable1");
    table1.setAttribute("class", "table table-light table-striped");

    // Crear header
    col = ["ID","Descripción","Fecha Necesidad","Estado"]
    let tr1 = table1.insertRow(-1);
    for (let i = 0; i < col.length; i++) {
        let th1 = document.createElement("th");
        th1.innerHTML = col[i];
        th1.setAttribute ("onclick", `sortTable(${i})`)
        th1.setAttribute ("class", "headers")
        tr1.appendChild(th1);
    }

//    let th1 = document.createElement("th");
//    th1.innerHTML = "Acción";
//    tr1.appendChild(th1);

    // agregar datos del JSON como filas
    for (let i = 0; i < issues.issues.length; i++) {

        tr1 = table1.insertRow(-1);
        let celda = tr1.insertCell(-1)
        celda.innerHTML = issues.issues[i].key
        celda.setAttribute("id",`${issues.issues[i].key}`)
        celda.setAttribute("class","key_class")
        celda.setAttribute("onclick","obtenerIssue(this.id)")
        tr1.insertCell(-1).innerHTML = issues.issues[i].fields.summary
//        tr1.insertCell(-1).innerHTML = issues.issues[i].fields.issuetype.name
        tr1.insertCell(-1).innerHTML = issues.issues[i].fields.customfield_13402
        tr1.insertCell(-1).innerHTML = issues.issues[i].fields.status.name
//        tr1.insertCell(-1).innerHTML ='<button id="'+issues.issues[i].key+'" class="btn btn-primary" onclick="seleccionar_contratista(this.id)">Seleccionar</button>'
    }

    // sumar la tabla creada al contenedor
    pshow1.innerHTML = "";
    pshow1.appendChild(table1);
    pshow1.style.display= "block"

}

function obtenerIssue(issue) {

    const END_POINT = "getIssue/"+issue

    fetch(BASE_URL+END_POINT)
    .then(response => response.json())
    .then(json => mostrarIssue(json))
    .catch(err => alert('Solicitud fallida', err));

}

function mostrarIssue (issue){

    let divshow= document.getElementById("div_show")
    divshow.style.display= "flex"
    divshow.style.flexDirection= "column"
    divshow.scrollIntoView()

    let icono= document.createElement("img")
    icono.setAttribute("src","./close.svg")
    icono.setAttribute("width","20 rem")
    icono.setAttribute("onclick","borrarHijos()")
    divshow.appendChild(icono)

    let tarea = document.createElement("p")
    tarea.setAttribute ("class", "titulo_issue")
    tarea.innerHTML = issue.key + " / " + issue.fields.summary
    divshow.appendChild(tarea)

    let responsable = document.createElement("p")
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
    fecha_necesidad.innerHTML = "Fecha Necesidad: " + issue.fields.customfield_13402
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

/*     let dor = document.createElement("p")
    dor.setAttribute ("class", "texto_issue")
    try{
      dor.innerHTML = "Definition of Ready: " + issue.fields.customfield_13399.value
    } catch {
      dor.innerHTML = "Definition of Ready: No informado"
    }
    divshow.appendChild(dor)

    let dod = document.createElement("p")
    dod.setAttribute ("class", "texto_issue")
    try{
      dod.innerHTML = "Definition of Done: " + issue.fields.customfield_13399.value
    } catch {
      dod.innerHTML = "Definition of Done: No informado"
    }
    divshow.appendChild(dod)
 */
  }

function sortTable(n) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById("myTable1");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < rows.length - 1; i++) { //Change i=0 if you have the header th a separate table.
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  function borrarHijos() {
    const myNode = document.getElementById("div_show");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
    myNode.style.display="None"
  }

  function buscarSummary(jql) {

    const END_POINT = "searchIssues/"+jql
    
    fetch(BASE_URL+END_POINT)
    .then(response => response.json())  // convertir a json
    .then(json => mostrar(json))    //imprimir los datos en la consola
    .catch(err => alert('Solicitud fallida', err)); // Capturar errores}

  }
