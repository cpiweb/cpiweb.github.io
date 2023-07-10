let proveedores=JSON.parse(JSON.stringify(
    {
    "NPAyProveedor": [
      {
        "Proveedor": 1014426,
        "Contratista": "3GLA Networks",
        "NPA": 7600017931
      },
      {
        "Proveedor": 1015084,
        "Contratista": "Pronetba",
        "NPA": 7600017935
      },
      {
        "Proveedor": 1015969,
        "Contratista": "ANNESE VICTOR ANGEL",
        "NPA": 7600017921
      },
      {
        "Proveedor": 1034690,
        "Contratista": "Lizarraga Carolina",
        "NPA": 7600017929
      },
      {
        "Proveedor": 1016685,
        "Contratista": "Wilion Conte & Asociados",
        "NPA": 7600017925
      },
      {
        "Proveedor": 1016859,
        "Contratista": "TAILORED SERVICES PROYECTOS ESPECIA",
        "NPA": 7600017930
      },
      {
        "Proveedor": "1016936",
        "Contratista": "Pittella E Hijos S.A.",
        "NPA": 7600017924
      },
      {
        "Proveedor": 1007735,
        "Contratista": "300 NET",
        "NPA": 7600017934
      },
      {
        "Proveedor": 1013755,
        "Contratista": "Techfar-Tel",
        "NPA": 7600017937
      },
      {
        "Proveedor": 1010502,
        "Contratista": "ElectroTotal",
        "NPA": 7600017936
      }
    ]
  }))


let formulario= document.getElementById("contratistas")

for (let i=0; i<proveedores.NPAyProveedor.length;i++){
    console.log (proveedores.NPAyProveedor[i]["Contratista"])
    let entrada= document.createElement("input")
    let etiqueta= document.createElement("label")
    entrada.setAttribute("type","radio")
    let id_lista= "c"+i
    entrada.setAttribute("id",id_lista)
    entrada.setAttribute("type","radio")
    entrada.setAttribute("name","contratista")
    entrada.setAttribute("value",proveedores.NPAyProveedor[i]["Contratista"])
    etiqueta.setAttribute("for",id_lista)
    etiqueta.innerHTML=proveedores.NPAyProveedor[i]["Contratista"]
    formulario.appendChild(entrada)
    formulario.appendChild(etiqueta)
    let breakline=document.createElement("br")
    formulario.appendChild(breakline)
}

let entrada= document.createElement("input")
entrada.setAttribute("type","submit")
entrada.setAttribute("value","Siguiente")
formulario.appendChild(entrada)


/*         <input type="radio" id="c1" name="contratista" value="3GLA">
        <label for="c1">3GLA</label><br>
 */


