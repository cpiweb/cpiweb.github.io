const divShowData = document.getElementById('showData');
divShowData.style.display="None"

const divShowData2 = document.getElementById('showData2');
divShowData2.style.display="None"

const divShowData3 = document.getElementById('showData3');
divShowData3.style.display="None"

const divShowData5 = document.getElementById('showData5');
divShowData5.style.display="None"


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
table4.setAttribute("class", "table table-light table-striped");

// Crear header
let tr4 = table4.insertRow(-1);
for (let i = 0; i < col4.length; i++) {
    let th4 = document.createElement("th");
    th4.innerHTML = col4[i];
    tr4.appendChild(th4);
}
let th4 = document.createElement("th");
th4.innerHTML = "Acción";
tr4.appendChild(th4);

// agregar datos del JSON como filas
for (let i = 0; i < proveedores.NPAyProveedor.length; i++) {

    tr4 = table4.insertRow(-1);
    tr4.insertCell(-1).innerHTML = proveedores.NPAyProveedor[i][col4[0]];
    tr4.insertCell(-1).innerHTML = proveedores.NPAyProveedor[i][col4[1]];
    tr4.insertCell(-1).innerHTML = proveedores.NPAyProveedor[i][col4[2]];
    let celda= tr4.insertCell(-1);
    celda.innerHTML = proveedores.NPAyProveedor[i][col4[3]];
    celda.setAttribute("id",`${proveedores.NPAyProveedor[i][col4[3]]}`)
    celda.setAttribute("class","link_class")
    celda.setAttribute("onclick","obtenerNPA(this.id)")
    tr4.insertCell(-1).innerHTML ='<button id="'+proveedores.NPAyProveedor[i][col4[3]]+'" class="btn btn-primary" onclick="seleccionar_contratista(this.id)">Seleccionar</button>'
}

const header4 = document.createElement("p")
header4.innerHTML = "Seleccionar contratista"
header4.setAttribute("class","h4")
const saltolinea4 = document.createElement("br")
// sumar la tabla creada al contenedor
const divShowData4 = document.getElementById('showData4');
divShowData4.innerHTML = "";
divShowData4.appendChild(header4)
divShowData4.appendChild(saltolinea4)
divShowData4.appendChild(table4);

const divshow= document.createElement("div")
divshow.setAttribute("id","div_show")
divshow.style.display="None"
divShowData4.appendChild(divshow)


let nro_proveedor
let nombre_proveedor
let tipo_npa
let npa_proveedor
let simbolo

function seleccionar_contratista(NPA){
    divShowData4.removeChild(header4)
    divShowData4.removeChild(saltolinea4)
    divShowData4.removeChild(table4);
    for (let i = 0; i < proveedores.NPAyProveedor.length; i++) {
      if (proveedores.NPAyProveedor[i]["NPA"]==NPA){
        nro_proveedor = proveedores.NPAyProveedor[i]["Proveedor"]
        nombre_proveedor = proveedores.NPAyProveedor[i]["Contratista"]
        tipo_npa = proveedores.NPAyProveedor[i]["Tipo"]
        npa_proveedor = proveedores.NPAyProveedor[i]["NPA"]
    }
    header4.innerHTML = "Contratista seleccionado: " + nro_proveedor + " (" + nombre_proveedor + ")"
    header4.setAttribute ("class","h5")

    divShowData4.appendChild(header4)
    divShowData4.appendChild(saltolinea4)
    divShowData.style.display = "block"
    }

if (tipo_npa=="Materiales") {
        simbolo = "USD "
} else {
        simbolo = "ARS "
}

const table = document.createElement("table");
table.setAttribute("id", "myTable");
table.setAttribute("class", "table table-light table-striped");

let tr = table.insertRow(-1);

for (let i = 0; i < posiciones[tipo_npa].length; i++) {

    tr = table.insertRow(-1);
    let tabCell = tr.insertCell(-1);
    tabCell.innerHTML = posiciones[tipo_npa][i]["Descripción"];
    tr.insertCell(-1).innerHTML ='<button id="'+posiciones[tipo_npa][i]["Posición"]+'" class="btn btn-primary" onclick="agregar('+posiciones[tipo_npa][i]["Posición"]+','+posiciones[tipo_npa][i]["Línea"]+')">Agregar</button>'
}

const entrada = document.createElement("input")
entrada.setAttribute("type","text")
entrada.setAttribute("id","myInput")
entrada.setAttribute("onkeyup","myFunction()")
entrada.setAttribute("placeholder","Buscar tarea...")

const salto_linea= document.createElement("br")

divShowData.innerHTML = "";
divShowData.appendChild(entrada);
divShowData.appendChild(salto_linea);
divShowData.appendChild(table);

}

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

let col2 = ["#","Posición","Línea","Descripción","Cantidad","Precio","Subtotal","Acción"];

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
titulo2.innerHTML = "Productos o Servicios Seleccionados"

const boton1 = document.createElement("button")
boton1.innerHTML = "Generar OE"
boton1.setAttribute("onclick", "generar_OE()");
boton1.setAttribute("class", "btn btn-success");

const titulo6 = document.createElement("p")
titulo6.setAttribute("id","subtotal_OE")
titulo6.setAttribute("class","h5")

divShowData2.innerHTML = "";
divShowData2.appendChild(titulo2)
divShowData2.appendChild(table2);
divShowData2.appendChild(titulo6);
divShowData2.appendChild(boton1);

function agregar(posicion, linea){
    
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

    for (let j = 0; j < posiciones[tipo_npa].length; j++) {
    
        if ((posiciones[tipo_npa][j]["Posición"]==posicion) && (posiciones[tipo_npa][j]["Línea"]==linea)){
            tr.insertCell(-1).innerHTML = id_row;
            tr.insertCell(-1).innerHTML = posiciones[tipo_npa][j]["Posición"];
            tr.insertCell(-1).innerHTML = posiciones[tipo_npa][j]["Línea"];
            tr.insertCell(-1).innerHTML = posiciones[tipo_npa][j]["Descripción"];
            tr.insertCell(-1).innerHTML = '<input type="text" id="'+id_row+'" name="cantidad" onkeyup="calcular_subtotal(this.value, this.id)">'
            if (posiciones[tipo_npa][j]["Precio"]==0) {
                precio = 1
            } else {
                precio= posiciones[tipo_npa][j]["Precio"]
            }
            tr.insertCell(-1).innerHTML = simbolo + precio
            tr.insertCell(-1).innerHTML = subtotal
            tr.insertCell(-1).innerHTML = '<button id="'+id_row+'" class="btn btn-danger" onclick="eliminar_tarea('+id_row+')">Eliminar</button>'
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
//    let posicion_oe
//    let linea_oe
    let cantidad_oe
    let descripcion
    let precio
    let precio_total
    let total=0

    for (i=1; i<tabla.rows.length; i++){
         let pos=tabla.rows[i].cells[1].textContent
         let lin=tabla.rows[i].cells[2].textContent
         let cantidad=tabla.rows[i].cells[4].children.cantidad.value
//         if (parseInt(pos)==pos){
         cantidad_oe=cantidad
         descripcion= tabla.rows[i].cells[3].textContent
         precio= parseFloat(tabla.rows[i].cells[5].textContent.slice(4))
         precio_total= (Math.round(parseFloat(cantidad)*precio*100))/100
         total= (Math.round((total+(precio*cantidad_oe)))*100)/100
         fila=[npa_proveedor, pos, lin, descripcion, fecha_entrega, cantidad_oe, simbolo+precio, simbolo+precio_total]
         filas.push(fila)
//            }
        }
 

    // definimos la función de comparación
    function compare(a, b) {
        // comparamos los elementos en los índices indicados
        return (parseInt(a[indiceOrdenacion]) >= parseInt(b[indiceOrdenacion])) ? 1 : -1;
    }
    
    // paso 1: especificar la columna que se usará para ordenar
    var indiceOrdenacion = 2;
    // paso 2: llamar a la ordenación con nuestra función de comparación propia
    filas = filas.sort(compare);

    // ORDENAR 2 VECES (por POS y LIN)

    // paso 1: especificar la columna que se usará para ordenar
    var indiceOrdenacion = 1;
    // paso 2: llamar a la ordenación con nuestra función de comparación propia
    filas = filas.sort(compare);
    
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

    const table3 = document.createElement("table");
    table3.setAttribute("id", "myTable3");
    table3.setAttribute("class", "table");

    divShowData3.innerHTML = "";
    divShowData3.appendChild(titulo3)
    divShowData3.appendChild(boton3)
    divShowData3.appendChild(boton4)

    let pos_previa = 0
    let lin_previa = 0
    cantidad_oe = 0

    for (let i = 0; i < filas.length; i++){
        if ((pos_previa==filas[i][1]) && (lin_previa==filas[i][2])) {
                cantidad_oe=parseFloat(cantidad_oe)+parseFloat(filas[i][5])
                precio=filas[i][6].slice(4)
                tr.deleteCell(5)
                tr.insertCell(5).innerHTML = cantidad_oe.toString().replace('.', ',');
                tr.deleteCell(7)
                tr.insertCell(7).innerHTML = simbolo+((Math.round(precio*cantidad_oe*100))/100).toString().replace('.', ',')
        
            } else {
                tr = table3.insertRow(-1);
                cantidad_oe=parseFloat(filas[i][5])
                precio=filas[i][6].slice(4)
                tr.insertCell(-1).innerHTML = npa_proveedor;
                tr.insertCell(-1).innerHTML = filas[i][1];
                tr.insertCell(-1).innerHTML = filas[i][2];
                tr.insertCell(-1).innerHTML = filas[i][3];
                tr.insertCell(-1).innerHTML = fecha_entrega;
                tr.insertCell(-1).innerHTML = cantidad_oe.toString().replace('.', ',');
                tr.insertCell(-1).innerHTML = simbolo+precio.toString().replace('.', ',');
                tr.insertCell(-1).innerHTML = simbolo+((Math.round(precio*cantidad_oe*100))/100).toString().replace('.', ',')

            }

//        total= (Math.round((total+(precio*cantidad_oe)))*100)/100
        pos_previa = filas[i][1]
        lin_previa = filas[i][2]
    }
 
    let titulo5 = document.createElement("span")
    titulo5.innerHTML= "Monto total OE: " + simbolo + total
    titulo5.setAttribute("id","total_OE")
    titulo5.setAttribute("class","h5")
    divShowData3.appendChild(titulo4)
    divShowData3.appendChild(titulo5);
    divShowData3.appendChild(table3);
    divShowData3.appendChild(boton5)
  }

function eliminar_tarea(fila){
    let tabla= document.getElementById("myTable2")
    for (let i=0; i<tabla.rows.length;i++){
        if (tabla.rows[i].cells[0].textContent==fila){
            tabla.deleteRow(i)
        }
    }
}


function copiar_tabla(tabla) {

        let urlField
        let range

        urlField = document.getElementById(tabla)
         
        // create a Range object
        range = document.createRange();  
        // set the Node to select the "range"
        range.selectNode(urlField);
        // add the Range to the set of window selections
        window.getSelection().addRange(range);
         
        // execute 'copy', can't 'cut' in this case
        document.execCommand('copy');
      }

function editar_tareas(){
    divShowData.style.display="block"
    divShowData2.style.display="block"
    divShowData3.style.display="none"
}      

function calcular_subtotal(cantidad,id_row){

    let tabla = document.getElementById("myTable2")
    let subtotal=0
    for (i=1; i<tabla.rows.length; i++){
        if (tabla.rows[i].cells[0].textContent==id_row){
            tabla.rows[i].cells[6].textContent= simbolo+((Math.round(parseFloat(tabla.rows[i].cells[5].textContent.slice(4))*cantidad*100))/100).toString()
        }
        subtotal=subtotal+parseFloat(tabla.rows[i].cells[6].textContent.slice(1))
        console.log(subtotal)
    }
//    titulo6.innerHTML= "Monto Total OE:  $"+subtotal       
}

function borrarHijos() {
    const myNode = document.getElementById("div_show");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
    myNode.style.display="None"
  }


function obtenerNPA (npa) {

//    alert(npa);
    borrarHijos()

    for (let i = 0; i < npas.Hoja1.length; i++) {

        if (npas.Hoja1[i].NPA==npa) {
 //           alert(npas.Hoja1[i].Proveedor)

            divshow.style.display= "flex"
            divshow.style.flexDirection= "column"
            divshow.scrollIntoView()
        
            let icono= document.createElement("img")
            icono.setAttribute("src","./close.svg")
            icono.setAttribute("width","20 rem")
            icono.setAttribute("onclick","borrarHijos()")
            divshow.appendChild(icono)
        
            let texto1 = document.createElement("p")
            texto1.setAttribute ("class", "texto_issue")
            texto1.innerHTML = "NPA: " + npas.Hoja1[i].NPA
            divshow.appendChild(texto1)

            let texto2 = document.createElement("p")
            texto2.setAttribute ("class", "texto_issue")
            texto2.innerHTML = "Proveedor: " + npas.Hoja1[i].Proveedor
            divshow.appendChild(texto2)

            let texto3 = document.createElement("p")
            texto3.setAttribute ("class", "texto_issue")
            texto3.innerHTML = "Vencimiento: " + obtenerFecha(npas.Hoja1[i]["Fin Contrato"])
            divshow.appendChild(texto3)

            let texto4 = document.createElement("p")
            texto4.setAttribute ("class", "texto_issue")
            texto4.innerHTML = "Saldo: $ " + new Intl.NumberFormat("de-DE").format(npas.Hoja1[i]["Saldo Disponible"])
            divshow.appendChild(texto4)

            let texto5 = document.createElement("p")
            texto5.setAttribute ("class", "texto_issue")
            texto5.innerHTML = "Info actualizada al " + obtenerFecha(npas.Hoja1[i].Hoy)
            divshow.appendChild(texto5)
        }
    }
}

function obtenerFecha(fechaExcel) {

        fechaJS= new Date (Date.UTC(0,0,fechaExcel))

        return fechaJS.getDate() + "/" + (fechaJS.getMonth()+1) + "/" + fechaJS.getFullYear()
}

function generar_WE(){

    divShowData4.style.display="none"
    divShowData.style.display="none"
    divShowData2.style.display="none"
    divShowData3.style.display="none"
    divShowData5.style.display="block"

    let tabla= document.getElementById("myTable3")

    for (i=0; i<tabla.rows.length; i++){

        tabla.rows[i].cells[0].innerHTML="Nro de OE"
        tabla.rows[i].cells[1].innerHTML= 10
        tabla.rows[i].cells[2].innerHTML= (i+1)*10
        tabla.rows[i].cells[4].remove()
    }

    const titulo3=document.createElement("span")
    titulo3.innerHTML= "Plantilla de WE generada"
    titulo3.setAttribute("id","generado")
    titulo3.setAttribute("class","h4")

    const boton3 = document.createElement("button")
    boton3.innerHTML = "Copiar"
    boton3.setAttribute("id","boton3")
    boton3.setAttribute("onclick", "copiar_tabla('myTable3')");
    boton3.setAttribute("class", "btn btn-success");
    boton3.setAttribute("title", "copia en el portapapel, para luego poder pegar en el excel");

    const boton4 = document.createElement("button")
    boton4.innerHTML = "Volver a OE"
    boton4.setAttribute("id","boton4")
    boton4.setAttribute("onclick", "volver_OE()");
    boton4.setAttribute("class", "btn btn-success");

    divShowData5.appendChild(titulo3);
    divShowData5.appendChild(boton3);
    divShowData5.appendChild(boton4);
    divShowData5.appendChild(tabla);

  }

  function volver_OE(){

    divShowData4.style.display="none"
    divShowData.style.display="none"
    divShowData2.style.display="none"
    divShowData3.style.display="block"
    divShowData5.style.display="none"

    while (divShowData5.firstChild) {
        divShowData5.removeChild(divShowData5.lastChild);
      }

    generar_OE()
  }
  