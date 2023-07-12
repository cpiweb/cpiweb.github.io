const divShowData = document.getElementById('showData');
divShowData.style.display="None"

// Llenar tabla contratistas con JSON 

// Obtener columnas desde el JSON
let col4 = [];
for (let i = 0; i < proveedores.NPAyProveedor.length; i++) {
    for (let key in proveedores.NPAyProveedor[i]) {
    if (col4.indexOf(key) === -1) {
        col4.push(key);
    }
    }
}

// Crear tabla
const table4 = document.createElement("table");
table4.setAttribute("id", "myTable4");
table4.setAttribute("class", "table");

// Crear header
let tr4 = table4.insertRow(-1);
for (let i = 0; i < col4.length; i++) {
    let th4 = document.createElement("th");
    th4.innerHTML = col4[i];
    tr4.appendChild(th4);
}

// agregar datos del JSON como filas
for (let i = 0; i < proveedores.NPAyProveedor.length; i++) {

    tr4 = table4.insertRow(-1);

    for (let j = 0; j < col4.length; j++) {
    let tabCell = tr4.insertCell(-1);
    tabCell.innerHTML = proveedores.NPAyProveedor[i][col4[j]];
    }
    tr4.insertCell(-1).innerHTML ='<button id="'+proveedores.NPAyProveedor[i][col4[0]]+'" onclick="seleccionar_contratista(this.id)">Seleccionar</button>'
}

const header4 = document.createElement("h5")
header4.innerHTML = "Seleccionar contratista"
const saltolinea4 = document.createElement("br")
// sumar la tabla creada al contenedor
const divShowData4 = document.getElementById('showData4');
divShowData4.innerHTML = "";
divShowData4.appendChild(header4)
divShowData4.appendChild(saltolinea4)
divShowData4.appendChild(table4);

let nro_proveedor
let nombre_proveedor
let npa_proveedor

function seleccionar_contratista(proveedor){
    divShowData4.removeChild(header4)
    divShowData4.removeChild(saltolinea4)
    divShowData4.removeChild(table4);
    for (let i = 0; i < proveedores.NPAyProveedor.length; i++) {
      if (proveedores.NPAyProveedor[i]["Proveedor"]==proveedor){
        nro_proveedor = proveedores.NPAyProveedor[i]["Proveedor"]
        nombre_proveedor = proveedores.NPAyProveedor[i]["Contratista"]
        npa_proveedor = proveedores.NPAyProveedor[i]["NPA"]
    }
    header4.innerHTML = "Contratista seleccionado: " + nro_proveedor + " (" + nombre_proveedor + ")"
    divShowData4.appendChild(header4)
    divShowData.style.display = "block"
    }
}

// Armar tabla de tareas desde el JSON
let col = [];
for (let i = 0; i < tareas.Agrupados.length; i++) {
    for (let key in tareas.Agrupados[i]) {
    if (col.indexOf(key) === -1) {
        col.push(key);
    }
    }
}

const table = document.createElement("table");
table.setAttribute("id", "myTable");

let tr = table.insertRow(-1);

for (let i = 0; i < col.length; i++) {
    let th = document.createElement("th");
    th.innerHTML = col[i];
    tr.appendChild(th);
}

for (let i = 0; i < tareas.Agrupados.length; i++) {

    tr = table.insertRow(-1);

    for (let j = 0; j < col.length; j++) {
    let tabCell = tr.insertCell(-1);
    tabCell.innerHTML = tareas.Agrupados[i][col[j]];
    }
    tr.insertCell(-1).innerHTML ='<button id="'+tareas.Agrupados[i][col[0]]+'" onclick="agregar(this.id)">Agregar</button>'
}

const entrada = document.createElement("input")
entrada.setAttribute("type","text")
entrada.setAttribute("id","myInput")
entrada.setAttribute("onkeyup","myFunction()")
entrada.setAttribute("placeholder","Buscar tarea...")

divShowData.innerHTML = "";
divShowData.appendChild(entrada);
divShowData.appendChild(table);


function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
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

let col2 = ["#","Pos NPA","Tarea","Cantidad","Precio","Acción"];

const table2 = document.createElement("table");
table2.setAttribute("id", "myTable2");
table2.setAttribute("class", "table");
let tr2 = table2.insertRow(-1);                   // table row.

for (let i = 0; i < col2.length; i++) {
    let th2 = document.createElement("th");      // table header.
    th2.innerHTML = col2[i];
    tr2.appendChild(th2);
}

const divShowData2 = document.getElementById('showData2');
divShowData2.innerHTML = "";
divShowData2.appendChild(table2);

function agregar(id_tarea){

    let id_row
     if (table2.rows[table2.rows.length-1].cells[0].textContent=="#"){
        id_row=1
    } else {
        id_row=parseInt(table2.rows[table2.rows.length-1].cells[0].textContent)+1
    }
    tr = table2.insertRow(-1);
    let cantidad=0

    for (let j = 0; j < tareas.Agrupados.length; j++) {
    
        if (tareas.Agrupados[j]["Pos NPA"]==id_tarea){
            tr.insertCell(-1).innerHTML = id_row;
            tr.insertCell(-1).innerHTML = tareas.Agrupados[j]["Pos NPA"];
            tr.insertCell(-1).innerHTML = tareas.Agrupados[j]["Tarea"];
            tr.insertCell(-1).innerHTML = '<input type="text" name="cantidad">'
            precio= traer_precio (tareas.Agrupados[j]["Pos NPA"])
            tr.insertCell(-1).innerHTML = '$'+ precio
            tr.insertCell(-1).innerHTML = '<button id="'+id_row+'" onclick="eliminar_tarea('+id_row+')">Eliminar</button>'
        }
    }
}

function traer_precio(tipo_tarea){
    if (parseInt(tipo_tarea)==tipo_tarea){
        for (let j = 0; j < posiciones.NPAyPosiciones.length; j++){
            if (posiciones.NPAyPosiciones[j]["Posición"]==tipo_tarea){
                return posiciones.NPAyPosiciones[j]["Precio"]
            }
        }
    } else {
        let suma=0
        for (let j = 0; j < tareas_agrupadas.Agrupados.length; j++){
            if (tareas_agrupadas.Agrupados[j]["Cableado"]==tipo_tarea){
                for (let i = 0; i < posiciones.NPAyPosiciones.length; i++){
                    if (posiciones.NPAyPosiciones[i]["Servicio"]==tareas_agrupadas.Agrupados[j]["Código"]){
                        suma= suma+(parseFloat(posiciones.NPAyPosiciones[i]["Precio"])*parseFloat(tareas_agrupadas.Agrupados[j]["Cantidad"]))
                    }
            }
        }
    } return suma
}}

function generar_OE(){

    let fecha_entrega = prompt("Ingresar fecha de entrega: ")

    let tabla= document.getElementById("myTable2")
    let filas=[]
    let fila= []
    let posicion
    let cantidad_oe
    let descripcion
    let precio
    let precio_total

    for (i=1; i<tabla.rows.length; i++){
         let posNPA=tabla.rows[i].cells[1].textContent
         let cantidad=tabla.rows[i].cells[3].children.cantidad.value
         if (parseInt(posNPA)==posNPA){
            posicion= posNPA
            cantidad_oe=cantidad
            descripcion= tabla.rows[i].cells[2].textContent
            precio= parseInt(tabla.rows[i].cells[4].textContent.slice(1))
            precio_total= parseFloat(cantidad)*precio
            fila=[npa_proveedor, "0010", posicion, descripcion, fecha_entrega, cantidad_oe, precio, precio_total]
            filas.push(fila)
            } else {
                for (let j = 0; j < tareas_agrupadas.Agrupados.length; j++){
                    if (tareas_agrupadas.Agrupados[j]["Cableado"]==posNPA){
                        cantidad_oe=tareas_agrupadas.Agrupados[j]["Cantidad"]*cantidad
                        descripcion=tareas_agrupadas.Agrupados[j]["Descripción"]
                        for (let k = 0; k < posiciones.NPAyPosiciones.length; k++){
                            if (posiciones.NPAyPosiciones[k]["Servicio"]==tareas_agrupadas.Agrupados[j]["Código"]){
                                posicion=posiciones.NPAyPosiciones[k]["Posición"]
                                precio=posiciones.NPAyPosiciones[k]["Precio"]
                                precio_total=precio*cantidad_oe
                                }
                        }
                        fila=[npa_proveedor, "0010", posicion, descripcion, fecha_entrega, cantidad_oe, precio, precio_total]
                        filas.push(fila)}
            }}   
    }
    let ordenador=[]
    for (let i=0; i<filas.length;i++){
      ordenador.push(filas[i][2])
    }
    ordenador.sort()

    for(var i = ordenador.length -1; i >=0; i--){
      if(ordenador.indexOf(ordenador[i]) !== i) ordenador.splice(i,1);
    }    

    let titulo3=document.getElementById("titulo3")
    titulo3.innerHTML= "Solicitud generada"

    let titulo4=document.getElementById("contratista")
    titulo4.innerHTML= "Proveedor: "+ nro_proveedor+" ("+nombre_proveedor+")"

    let col3 = ["NPA","Posición","Línea","Descripción", "Fecha", "Cantidad","P. Unit","P. Total"];

    const table3 = document.createElement("table");
    table3.setAttribute("id", "myTable3");
    table3.setAttribute("class", "table");
    let tr3 = table3.insertRow(-1);                   // table row.

    for (let i = 0; i < col3.length; i++) {
        let th3 = document.createElement("th");      // table header.
        th3.innerHTML = col3[i];
        tr3.appendChild(th3);
    }

    const divShowData3 = document.getElementById('showData3');
    divShowData3.innerHTML = "";
    divShowData3.appendChild(table3);

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
        tr.insertCell(-1).innerHTML = cantidad_oe;
        tr.insertCell(-1).innerHTML = precio;
        tr.insertCell(-1).innerHTML = precio*cantidad_oe
      }
  }

function eliminar_tarea(fila){
    let tabla= document.getElementById("myTable2")
    for (let i=0; i<tabla.rows.length;i++){
        if (tabla.rows[i].cells[0].textContent==fila){
            tabla.deleteRow(i)
        }
    }
}

function agregar_viatico(){
  let tecnicos= prompt('Cant de técnicos:')
  let dias= prompt('Cant de días:')
  let km= prompt('Cant de km recorridos:')

  const desarraigo = 5371 + 4854
  const nafta= 198.45

  cantidad_viatico=tecnicos*dias*desarraigo+km*nafta*0.2
  let id_row
  if (table2.rows[table2.rows.length-1].cells[0].textContent=="#"){
     id_row=1
  } else {
     id_row=parseInt(table2.rows[table2.rows.length-1].cells[0].textContent)+1
  }

  tr = table2.insertRow(-1);

  tr.insertCell(-1).innerHTML = id_row;
  tr.insertCell(-1).innerHTML = "100";
  tr.insertCell(-1).innerHTML = "ADICIONAL TRASLADO Y UBICACIÓN DE OBRA";
  tr.insertCell(-1).innerHTML = '<input type="text" name="cantidad" value="'+cantidad_viatico+'">';
  tr.insertCell(-1).innerHTML = '$1.0'
  tr.insertCell(-1).innerHTML = '<button id="'+id_row+'" onclick="eliminar_tarea('+id_row+')">Eliminar</button>'
      }