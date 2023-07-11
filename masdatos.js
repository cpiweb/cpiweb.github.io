console.log (location.search);

var args= location.search.substr(1).split('&');

console.log(args)

var parts = []

for (let i=0; i<args.length;++i){
    parts[i]=args[i].split('=');
}

console.log(parts);
let seleccionado=decodeURIComponent(parts[0][1])
console.log(seleccionado)
seleccionado=seleccionado.replace(/\+/g," ")
console.log(seleccionado)

document.getElementById("seleccionado").innerHTML=seleccionado

document.getElementById("boton").addEventListener("click", get_args);

function get_args(){
    let d=document.getElementById("descripcion").value
    let f=document.getElementById("fecha").value
    let i=document.getElementById("PEP").value
    url_simple= window.location.pathname.slice(1,-14)
    url_compuesta=url_simple+"/tareas.html?contratista="+seleccionado+"&descripcion="+d+"&fecha="+f+"&PEP="+i
    location= url_compuesta
}
