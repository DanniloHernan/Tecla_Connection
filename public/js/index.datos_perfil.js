let botonRegistro = document.getElementById("register")

async function recuperaUsuario () {
    let resultado = await JSON.parse(localStorage.getItem('datosUsuarios'))
    return resultado
  }

async function recuperaToken () {
    let resultado = await JSON.parse(localStorage.getItem('token'))
    return resultado
  }

async function recuperaID () {
    let resultado = await JSON.parse(localStorage.getItem('id_usuario'))
    return resultado
  }

let registro =  async () => {

    let id = await recuperaID();
    
    let usuarioNuevo = {
        id_usuario: id,
        titular: document.getElementById('titular').value,
        fecha: document.getElementById('cumpleaños').value,
        pais: document.getElementById('pais').value,
        estudios: document.getElementById('educacion').value,
        idiomas: document.getElementById('idiomas').value,
        perfilL: document.getElementById('linkedin').value,
        perfilG: document.getElementById('github').value,
        sobreMi: document.getElementById('sobre_mi').value,
        }
        console.log(usuarioNuevo)

    try{
      let token = await recuperaToken()
        await fetch(`http://localhost:3000/ingresoDatos/${token}`, {
                method: 'post',
                headers: {
                "Accept": "application/json, text/plain, *,*",
                "Content-Type": "application/json"
                },       
                body: JSON.stringify({
                "usuario_id": usuarioNuevo.id_usuario,
                "titular": usuarioNuevo.titular,
                "fecha" : usuarioNuevo.fecha,
                "ciudad": usuarioNuevo.pais,
                "estudios": usuarioNuevo.estudios,
                "idiomas": usuarioNuevo.idiomas,
                "perfilL": usuarioNuevo.perfilL,
                "perfilG": usuarioNuevo.perfilG,
                "sobreMi": usuarioNuevo.sobreMi,
                })
        }).then(res => res.redirected && ( location.href = res.url ))
    }catch(error){
        alert(`Datos ingresados incorrectos : ${error.message}`)
    }
}

botonRegistro.addEventListener('click', registro)

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