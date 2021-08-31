let registroConocimiento = document.getElementById("registrarConocimiento")
let registroTecnologia = document.getElementById("registrarTecnologias")
let registroHB = document.getElementById("registrarHabilidades")
let registroDesempeño = document.getElementById("registrarDesempeño")
document.getElementById('cerrarSesion').setAttribute('onclick', "eliminarlogin()")

async function recuperaUsuario () {
    let resultado = await JSON.parse(localStorage.getItem('datosUsuarios'))
    return resultado
  }
  
  async function guardaToken (token) {
    localStorage.setItem('token', JSON.stringify(token))
  }

  async function recuperaToken () {
    let resultado = await JSON.parse(localStorage.getItem('token'))
    return resultado
  }

  async function eliminarlogin(){  
    localStorage.clear();
}

  async function authenticate(){

    let datos = await recuperaUsuario()
    
    let token = await fetch('http://localhost:3000/autenticacion', {
            method: 'post',
            headers: {
                "Accept": "application/json, text/plain, *,*",
                "Content-Type": "application/json"
            },       
            body: JSON.stringify({
                "usuario" : datos.usuario,
                "pass": datos.pass
            }),
    })
  
    let auth = await token.json()
    if(token){
    guardaToken(auth)
    }else{
    console.log("Usuario no guardado verifica el local storage")
    }
  }

  registroDesempeño.addEventListener('click', async () => {

    let datos = await recuperaUsuario()
    let token = await recuperaToken()

    let conUsr = {
        id_tecler: document.getElementById('prependedtext').value,
        calidad: document.querySelector('input[name="calidad"]:checked').value,
        velocidad: document.querySelector('input[name="velocidad"]:checked').value,
        performance: document.querySelector('input[name="performance"]:checked').value,
        }
    try{
        await fetch('http://localhost:3000/rendimiento', {
                method: 'post',
                headers: {
                "Accept": "application/json, text/plain, *,*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                },       
                body: JSON.stringify({
                "calidad_codigo": conUsr.calidad,
                "velocidad_entrega": conUsr.velocidad,
                "performance_codigo": conUsr.performance,
                "id_usuario": conUsr.id_tecler,
                "usr": {
                        "usuario": datos.usuario,
                        "pass": datos.pass
                        }
                })
        })
        console.log(conUsr)
    }catch(error){
        alert(error)
    }
  })

  registroHB.addEventListener('click', async () => {

    let datos = await recuperaUsuario()
    let token = await recuperaToken()

    let conUsr = {
        id_tecler: document.getElementById('prependedtext').value,
        enfoque: document.querySelector('input[name="enfoque"]:checked').value,
        trabajoequipo: document.querySelector('input[name="trabajoequipo"]:checked').value,
        resproblemas: document.querySelector('input[name="resproblemas"]:checked').value,
        capacidad: document.querySelector('input[name="capacidad"]:checked').value,
        comunicacion: document.querySelector('input[name="comunicacion"]:checked').value,
        compromiso: document.querySelector('input[name="compromiso"]:checked').value,
        }
    try{
        await fetch('http://localhost:3000/habilidades_b', {
                method: 'post',
                headers: {
                "Accept": "application/json, text/plain, *,*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                },       
                body: JSON.stringify({
                "enfoque": conUsr.enfoque,
                "trabajo_equipo": conUsr.trabajoequipo,
                "compromiso": conUsr.compromiso,
                "comunicacion": conUsr.comunicacion,
                "cap_aprendizaje": conUsr.capacidad,
                "resol_problemas": conUsr.resproblemas,
                "id_usuario": conUsr.id_tecler,
                "usr": {
                        "usuario": datos.usuario,
                        "pass": datos.pass
                        }
                })
        })
        console.log(conUsr)
    }catch(error){
        alert(error)
    }
  })


  registroTecnologia.addEventListener('click', async () => {

    let datos = await recuperaUsuario()
    let token = await recuperaToken()

    let conUsr = {
        id_tecler: document.getElementById('prependedtext').value,
        nodejs: document.querySelector('input[name="nodejs"]:checked').value,
        frontend: document.querySelector('input[name="frontend"]:checked').value,
        swagger: document.querySelector('input[name="swagger"]:checked').value,
        javascript: document.querySelector('input[name="javascript"]:checked').value
        }
    try{
        await fetch('http://localhost:3000/tecnologias', {
                method: 'post',
                headers: {
                "Accept": "application/json, text/plain, *,*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                },       
                body: JSON.stringify({
                "node_js": conUsr.nodejs,
                "frontend": conUsr.frontend,
                "swagger": conUsr.swagger,
                "javascript": conUsr.javascript,
                "id_usuario": conUsr.id_tecler,
                "usr": {
                        "usuario": datos.usuario,
                        "pass": datos.pass
                        }
                })
        })
        console.log(conUsr)
    }catch(error){
        alert(error)
    }
  })

  registroConocimiento.addEventListener('click', async () => {

    let datos = await recuperaUsuario()
    let token = await recuperaToken()

    let conUsr = {
        id_tecler: document.getElementById('prependedtext').value,
        basedatos: document.querySelector('input[name="basedatos"]:checked').value,
        apis: document.querySelector('input[name="apis"]:checked').value,
        testing: document.querySelector('input[name="testing"]:checked').value,
        seguridad: document.querySelector('input[name="seguridad"]:checked').value,
        objetos: document.querySelector('input[name="objetos"]:checked').value,
        }
    try{
        await fetch('http://localhost:3000/conocimientos', {
                method: 'post',
                headers: {
                "Accept": "application/json, text/plain, *,*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                },       
                body: JSON.stringify({
                "base_datos": conUsr.basedatos,
                "apis": conUsr.apis,
                "testing": conUsr.testing,
                "seguridad": conUsr.seguridad,
                "teoria_objetos": conUsr.objetos,
                "id_usuario": conUsr.id_tecler,
                "usr": {
                        "usuario": datos.usuario,
                        "pass": datos.pass
                        }
                })
        })
        console.log(conUsr)
    }catch(error){
        alert(error)
    }
  })

  
