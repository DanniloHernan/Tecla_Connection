

setTimeout(function () {
  $('.loader_bg').fadeToggle();
}, 500);

let listTeclers = []
let verPerfil = document.getElementById('verPerfil')


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

async function guardaID (id) {
  localStorage.setItem('id_usuario', JSON.stringify(id))
}

async function recuperaID () {
  let resultado = await JSON.parse(localStorage.getItem('id_usuario'))
  return resultado
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
  if(token != null){
  guardaToken(auth)
  linkUsuario()
  }else{
  console.log("Usuario no guardado")
  }
  obtenerID()
}

async function obtenerID(){

  let datos = await recuperaUsuario()

  let result = await fetch('http://localhost:3000/idTecler', {
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
  let id = await result.json()
  if(result != null){
      guardaID(id)
      }else{
      console.log("ID no guardado")
      }
      mostrarTeclers()
}

async function linkUsuario() {
  let datos = await recuperaUsuario()
  let token = await recuperaToken()
  
  if(token != null){
    document.getElementById('navbarDropdown').innerHTML = datos.usuario;
    document.getElementById('login').innerHTML = 'Cerrar Sesion'
    document.getElementById('login').setAttribute('onclick', "eliminarlogin()")
  }else{
    console.log("Nadie a iniciado sesion")
  } 
}

async function mostrarTeclers(){

  let id_usuario = await recuperaID()

  let result = await fetch(`http://localhost:3000/listaTeclers/${id_usuario}`, {
              method: 'get',
              headers: {
                  "Accept": "application/json, text/plain, *,*",
                  "Content-Type": "application/json",
              },       
  
  })
  let resultado = await result.json()

  for(let num in resultado){
    listTeclers.push( new Tecler(resultado[num].nombres, resultado[num].apellidos, resultado[num].id_usuario,resultado[num].titular,resultado[num].cod_imagen));
  }
  crearTarjeta()
}


function agregarTarjeta(tecler){
  let orden = `
  <div class="col-lg-4 col-md-6 mb-3 d-flex justify-content-evenly">
                <div class="icon-box">
                   <div class="icon mb-3"><img src="data:image/jpg;base64,${tecler.imagen}" class="img-fluid"/></div>
                   <h4>${tecler.nombres + " " + tecler.apellidos}</h4>
                   <h5><strong>${tecler.titular}</strong></h5>
                    <a href="http://localhost:3000/perfil_tecler/${tecler.id_tecler}" class="btn btn-dark" href="">Ver Perfil</a>
                </div>
  </div>
  `
  return orden;
}

function crearTarjeta(){
  let teclerHTML = '';
  for(let tecler of listTeclers){
      teclerHTML += agregarTarjeta(tecler);
  }
  document.getElementById('lista-teclers').innerHTML = teclerHTML;
}

async function eliminarlogin(){
    
    localStorage.clear();

}

verPerfil.addEventListener('click', async () => {

  let token = await recuperaToken()
  let id_usuario = await recuperaID()

  await fetch(`http://localhost:3000/buscarDatos/${id_usuario}/${token}`, {
    method: 'get',
    headers: {
        "Accept": "application/json, text/plain, *,*",
        "Content-Type": "application/json"
    },       
    }).then(res => res.redirected && ( location.href = res.url ))
})

