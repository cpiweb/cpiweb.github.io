const BASE_URL="https://cpiweb.pythonanywhere.com/"

let pshow1= document.getElementById("p_show1")
pshow1.style.display= "None"

let divshow= document.getElementById("div_show")
divshow.style.display= "None"

function buscarIncidencias() {

    let project= document.getElementById("filtro_project").value
    let estado1= document.getElementById("estado1").checked
    let estado4= document.getElementById("estado4").checked
    let estado5= document.getElementById("estado5").checked
    let subtareas= document.getElementById("subtareas").checked

    if (!(estado1||estado4||estado5)) {
      alert('Tenés que elegir al menos un estado.')
    } 
    else {
      let jql_list=[]

      if (project=="") {
        jql_list.push('(project=EASCGS)')
      }
      else {
        jql_list.push('project='+project)
      }

      if (!subtareas) {
        jql_list.push('issuetype!=11766')
      }

      estado_list = []

      if (estado1) {
        estado_list.push('status!=10001 AND status!=12553')
      }
      if (estado4) {
        estado_list.push('status=10001')
      }
      if (estado5) {
        estado_list.push('status=12553')
      }

      let estado_str= estado_list[0]

      for (let i=1; i<estado_list.length; i++) {
        estado_str= estado_str + ' OR '+ estado_list[i]
      }

      estado_str = '('+estado_str+')'

      jql_list.push(estado_str)

      let jql_str = jql_list[0]

      for (let i=1; i<jql_list.length; i++) {
        jql_str= jql_str + ' AND '+ jql_list[i]
      }

      const html = encodeURIComponent(jql_str); 
      const END_POINT = "searchIssues2/" + html

      fetch(BASE_URL+END_POINT)
      .then(response => response.json())
      .then(json => mostrar(json))
      .catch(err => alert('Solicitud fallida', err));
  }
}

function mostrar (issues){

    console.log(issues[1].issues)

    let edificio= document.getElementById("filtro_edificio").value
    let responsable= document.getElementById("filtro_assignee").value
    let informador= document.getElementById("filtro_reporter").value
    let summary= document.getElementById("filtro_summary").value

    let fecha1= document.getElementById("fecha1").checked
    let fecha2= document.getElementById("fecha2").checked
    let hoy = new Date (Date.now())

    // Crear tabla
    const table1 = document.createElement("table");
    table1.setAttribute("id", "myTable1");
    table1.setAttribute("class", "table table-light table-striped");

    // Crear header
    col = ["Key","Resumen","Fecha Vencimiento","Estado"]
    let tr1 = table1.insertRow(-1);
    for (let i = 0; i < col.length; i++) {
        let th1 = document.createElement("th");
        th1.innerHTML = col[i];
        th1.setAttribute ("onclick", `sortTable(${i})`)
        th1.setAttribute ("class", "headers")
        tr1.appendChild(th1);
    }

    let fechaN
    let fechaP
    let sum
    let edif
    let resp
    let inf
    let contador=0
    let total=0

    // agregar datos del JSON como filas
    for (let i = 0; i < issues.length; i++) {
      for (let j = 0; j < issues[i].issues.length; j++) {
          
          total= total +1

          try {
            sum= ((issues[i].issues[j].fields.summary).toLowerCase()).includes((summary).toLowerCase()) || (summary=="")
          } catch {
            if (summary=="") {
              sum=true}
            else {
              sum=false
            }
          }

          try {
            edif= ((issues[i].issues[j].fields.customfield_13399.value).toLowerCase()).includes((edificio).toLowerCase()) || (edificio=="")
          } catch {
            if (edificio=="") {
              edif=true}
            else {
              edif=false
            }
          }
          try {
            resp= ((issues[i].issues[j].fields.assignee.displayName).toLowerCase()).includes((responsable).toLowerCase()) || (responsable=="")
          } catch {
            if (responsable=="") {
              resp=true}
            else {
              resp=false
            }
          }
          try {
            inf= ((issues[i].issues[j].fields.reporter.displayName).toLowerCase()).includes((informador).toLowerCase()) || (informador=="")
          } catch {
            if (informador=="") {
              inf=true}
            else {
              inf=false
            }
          }
          try{
            fechaN= ((new Date((issues[i].issues[j].fields.duedate)+'T15:00:00Z') < hoy) && fecha1) || !fecha1
          } catch {
            fechaN= false
          }
          try{
            fechaP= ((new Date((issues[i].issues[j].fields.customfield_12174)+'T15:00:00Z') < hoy) && fecha2) || !fecha2
          } catch {
            fechaP= false
          }

          if (sum && edif && resp && fechaN && fechaP && inf) {
              contador=contador+1
              tr1 = table1.insertRow(-1);
              let celda = tr1.insertCell(-1)
              celda.innerHTML = issues[i].issues[j].key
              celda.setAttribute("id",`${issues[i].issues[j].key}`)
              celda.setAttribute("class","key_class")
              celda.setAttribute("onclick","obtenerIssue(this.id)")
              tr1.insertCell(-1).innerHTML = issues[i].issues[j].fields.summary
              tr1.insertCell(-1).innerHTML = issues[i].issues[j].fields.duedate
              tr1.insertCell(-1).innerHTML = issues[i].issues[j].fields.status.name
          }
      }
    }

    alert('Se encontraron ' + contador + ' registros ('+ total + ')')

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
    padre.innerHTML = "Tarea Padre: " + issue.fields.parent.key + " - " + issue.fields.parent.fields.summary
    divshow.appendChild(padre)

    let boton = document.createElement("button")
    boton.setAttribute ("class", "btn btn-primary")
    boton.setAttribute ("onclick",`openURL('${issue.key}')`)
    boton.innerHTML = "Abrir en Jira"
    divshow.appendChild(boton)
    
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

function openURL (issue) {
  if (issue.search('EASCGS'==0)){
    url='https://tecocloud.atlassian.net/jira/software/c/projects/EASCGS/issues/'
  } else if (issue.search('EASGNO'==0)) {
    url='https://tecocloud.atlassian.net/jira/software/c/projects/EASGNO/issues/'
  }
  window.open(url+issue)
}
