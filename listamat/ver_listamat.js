const divShowData = document.getElementById('showData');
divShowData.style.display = "block"

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