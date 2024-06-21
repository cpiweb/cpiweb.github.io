const DOLAR = 850

const divShowData = document.getElementById('showData');
divShowData.style.display = "block"

const divShowData2 = document.getElementById('showData2');
divShowData2.style.display="None"

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
      if (filter.length>2){
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
    catalogo.innerHTML = material + " - " + descripcion
    divshow.appendChild(catalogo)

    let precio = document.createElement("p")
    precio.setAttribute ("class", "texto_issue")
    precio.innerHTML = "Precio unidad:  $ " + new Intl.NumberFormat("de-DE").format(valorizado/cantidad) + "  (USD " + new Intl.NumberFormat("de-DE").format((valorizado/cantidad)/DOLAR) + ")"
    divshow.appendChild(precio)

//    alert(lista)

    const tabla = document.createElement("table");
    tabla.setAttribute("id", "Tabla");
//    tabla.setAttribute("class", "table table-light table-striped");

    let headers = ["Centro", "Almacén", "u.m.", "Stock"]

    let tr = tabla.insertRow(-1);
  
    for (let n = 0; n < headers.length; n++) {
      let th = document.createElement("th");
      th.innerHTML = headers[n];
      tr.appendChild(th);
    }
  
    for (let j = 0; j < lista.length; j++) {

        let tr = tabla.insertRow(-1);
        tr.insertCell(-1).innerHTML = lista[j][2];
        tr.insertCell(-1).innerHTML = lista[j][3];
        tr.insertCell(-1).innerHTML = lista[j][4];
        tr.insertCell(-1).innerHTML = lista[j][5];
    }

    divshow.appendChild(tabla)

    let espacio = document.createElement("br")
    divshow.appendChild(espacio)

    let actualizado = document.createElement("p")
    actualizado.setAttribute ("class", "texto_issue")
    actualizado.innerHTML = "Información actualizada al: " + obtenerFecha(fecha)
    divshow.appendChild(actualizado)

}

let col2 = ["#","Material","Descripción","u.m.","Cantidad","USD Unit","Subtotal","Acción"];

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

const titulo2 = document.createElement("h5")
titulo2.innerHTML = "Tareas Seleccionadas"

const boton1 = document.createElement("button")
boton1.innerHTML = "Plantilla MM"
boton1.setAttribute("onclick", "generar_MM()");
boton1.setAttribute("class", "btn btn-success");

/* 
const boton2 = document.createElement("button")
boton2.innerHTML = "Agregar viático"
boton2.setAttribute("onclick", "agregar_viatico()");
boton2.setAttribute("class", "btn btn-success");
boton2.setAttribute("id", "boton2");
 */

const titulo6 = document.createElement("p")
titulo6.setAttribute("id","subtotal_OE")
titulo6.setAttribute("class","h5")

divShowData2.innerHTML = "";
divShowData2.appendChild(titulo2)
divShowData2.appendChild(table2);
divShowData2.appendChild(titulo6);
divShowData2.appendChild(boton1);
divShowData2.appendChild(boton2);

function agregar(material){
    
    let subtotal=0

    divShowData2.style.display="block"
    divShowData2.scrollIntoView()

    let id_row
     if (table2.rows[table2.rows.length-1].cells[0].textContent=="#"){
        id_row=1
    } else {
        id_row=parseInt(table2.rows[table2.rows.length-1].cells[0].textContent)+1
    }

    tr = table2.insertRow(-1);
    let cantidad=0

    for (let j = 0; j < stock["Bajada_diaria"].length; j++) {
    
        if ((stock["Bajada_diaria"][j]["Material"]==material) && (stock["Bajada_diaria"][j]["Libre utilización"]!=0)){
            tr.insertCell(-1).innerHTML = id_row;
            tr.insertCell(-1).innerHTML = stock["Bajada_diaria"][j]["Material"];
            tr.insertCell(-1).innerHTML = stock["Bajada_diaria"][j]["Texto breve de material"];
            tr.insertCell(-1).innerHTML = stock["Bajada_diaria"][j]["UMB"];
            tr.insertCell(-1).innerHTML = '<input type="text" id="'+id_row+'" name="cantidad" onkeyup="calcular_subtotal(this.value, this.id)">'
//            precio= traer_precio (tareas.Agrupados[j]["Pos NPA"])
            tr.insertCell(-1).innerHTML = 'USD '+ new Intl.NumberFormat("de-DE").format((stock["Bajada_diaria"][j]["Valor libre util."]/stock["Bajada_diaria"][j]["Libre utilización"])/DOLAR)
            tr.insertCell(-1).innerHTML = subtotal
            tr.insertCell(-1).innerHTML = '<button id="'+id_row+'" class="btn btn-danger" onclick="eliminar_tarea('+id_row+')">Eliminar</button>'
            break;
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

function obtenerFecha(fechaExcel) {

  fechaJS= new Date (Date.UTC(0,0,fechaExcel))

  return fechaJS.getDate() + "/" + (fechaJS.getMonth()+1) + "/" + fechaJS.getFullYear()
}

function calcular_subtotal(cantidad,id_row){

  let tabla = document.getElementById("myTable2")
  let subtotal=0
  for (i=1; i<tabla.rows.length; i++){
      if (tabla.rows[i].cells[0].textContent==id_row){
          tabla.rows[i].cells[5].textContent= "$"+((Math.round(parseFloat(tabla.rows[i].cells[4].textContent.slice(1))*cantidad*100))/100).toString()
      }
      subtotal=subtotal+parseFloat(tabla.rows[i].cells[5].textContent.slice(1))
      console.log(subtotal)
  }
//    titulo6.innerHTML= "Monto Total OE:  $"+subtotal       
}

function eliminar_tarea(fila){
  let tabla= document.getElementById("myTable2")
  for (let i=0; i<tabla.rows.length;i++){
      if (tabla.rows[i].cells[0].textContent==fila){
          tabla.deleteRow(i)
      }
  }
}

function generar_OE(){

  let fecha = new Date();
  fecha.setDate(fecha.getDate()+15)
  let fecha_entrega = fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()

  divShowData4.style.display="none"
  divShowData.style.display="none"
  divShowData2.style.display="none"
  divShowData3.style.display="block"

  let tabla= document.getElementById("myTable2")
  let filas=[]
  let fila= []
  let posicion
  let cantidad_oe
  let descripcion
  let precio
  let precio_total
  let total=0

  for (i=1; i<tabla.rows.length; i++){
       let posNPA=tabla.rows[i].cells[1].textContent
       let cantidad=tabla.rows[i].cells[3].children.cantidad.value
       if (parseInt(posNPA)==posNPA){
          posicion= posNPA
          cantidad_oe=cantidad
          descripcion= tabla.rows[i].cells[2].textContent
          precio= parseFloat(tabla.rows[i].cells[4].textContent.slice(1))
          precio_total= (Math.round(parseFloat(cantidad)*precio*100))/100
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
  ordenador.sort(function(a, b){return a - b})

  for(var i = ordenador.length -1; i >=0; i--){
    if(ordenador.indexOf(ordenador[i]) !== i) ordenador.splice(i,1);
  }    

  const titulo3=document.createElement("span")
  titulo3.innerHTML= "Plantilla de OE generada"
  titulo3.setAttribute("id","generado")
  titulo3.setAttribute("class","h4")

  const boton3 = document.createElement("button")
  boton3.innerHTML = "Copiar"
  boton3.setAttribute("id","boton3")
  boton3.setAttribute("onclick", "copiar_tabla('myTable3')");
  boton3.setAttribute("class", "btn btn-success");
  boton3.setAttribute("title", "copia en el portapapel, para luego poder pegar en el excel");

  const boton4 = document.createElement("button")
  boton4.innerHTML = "Editar"
  boton4.setAttribute("id","boton4")
  boton4.setAttribute("onclick", "editar_tareas()");
  boton4.setAttribute("class", "btn btn-success");

  const boton5 = document.createElement("button")
  boton5.innerHTML = "Plantilla WE"
  boton5.setAttribute("id","boton5")
  boton5.setAttribute("onclick", "generar_WE()");
  boton5.setAttribute("class", "btn btn-primary");
  boton5.setAttribute("title", "genera plantilla WE para pegar en Excel y completar cuando tengas nro de OE");

  const titulo4=document.createElement("p")
  titulo4.innerHTML= "Proveedor: "+ nro_proveedor+" ("+nombre_proveedor+")"
  titulo4.setAttribute("id","proveedor")
  titulo4.setAttribute("class","h5")

//    let col3 = ["NPA","Posición","Línea","Descripción", "Fecha", "Cantidad","P. Unit","P. Total"];

  const table3 = document.createElement("table");
  table3.setAttribute("id", "myTable3");
  table3.setAttribute("class", "table");
/*     let tr3 = table3.insertRow(-1);                   // table row.

  for (let i = 0; i < col3.length; i++) {
      let th3 = document.createElement("th");      // table header.
      th3.innerHTML = col3[i];
      tr3.appendChild(th3);
  }
*/
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
  let titulo5 = document.createElement("span")
  titulo5.innerHTML= "Monto total OE:  $" + total
  titulo5.setAttribute("id","total_OE")
  titulo5.setAttribute("class","h5")
  divShowData3.appendChild(titulo4)
  divShowData3.appendChild(titulo5);
  divShowData3.appendChild(table3);
  divShowData3.appendChild(boton5)
}
