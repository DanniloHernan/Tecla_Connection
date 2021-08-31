
let id_tecler = document.getElementById('id_tecler').textContent
let comentar = document.getElementById('comentar')
let listComentarios = []
const starTotal = 5;

  
async function recuperaUsuario () {
  let resultado = await JSON.parse(localStorage.getItem('datosUsuarios'))
  return resultado
}

async function mostrarDatos(){

    let result = await fetch(`http://localhost:3000/datos_perfil/${id_tecler}`, {
                method: 'get',
                headers: {
                    "Accept": "application/json, text/plain, *,*",
                    "Content-Type": "application/json",
                },       
    
    })
    let datos = await result.json()
    crearDatos(datos[0])
    mostrarImagen()
    mostrarComentarios()
    mostrarConocimientos()
    mostrarTecnologias()
    mostrarHabilidades()
    mostrarDesempeño()
  }

  async function mostrarImagen(){

    let result = await fetch(`http://localhost:3000/imagen/${id_tecler}`, {
                method: 'get',
                headers: {
                    "Accept": "application/json, text/plain, *,*",
                    "Content-Type": "application/json",
                },       
    
    })
    let imagen = await result.json()
    document.getElementById('imagenPerfil').setAttribute('src', `data:image/jpg;base64,${imagen}`)
  }

  async function mostrarComentarios(){

    let result = await fetch(`http://localhost:3000/comentarios/${id_tecler}`, {
                method: 'get',
                headers: {
                    "Accept": "application/json, text/plain, *,*",
                    "Content-Type": "application/json",
                },       
    
    })
    let datosC = await result.json()

    for(let num in datosC){
      listComentarios.push( new Coment(datosC[num].nombre_usuario, datosC[num].comentario, datosC[num].updatedAt, datosC[num].id_comentario));
    }

    crearTarjeta()

  }

  function agregarTarjeta(coment){
    let tarjeta = `
      <div class="d-flex flex-column flex-md-row">
        <div class="flex-grow-1">
        <h4><strong class="red">${coment.nombre}</strong></h4>
        </div>
        <div class="flex-shrink-0"><span class="fw-bold text-primary">${coment.fecha}</span></div>
        </div>
        <p class="mb-5">${coment.comentario}</p>
    </div> 
    `
    return tarjeta;
  }
  
  function crearTarjeta(){
    let teclerHTML = '';
    for(let coment of listComentarios){
        teclerHTML += agregarTarjeta(coment);
    }
    document.getElementById('lista-comentarios').innerHTML = teclerHTML;
  }


  function crearDatos(datos){
    
    document.getElementById('nombre').innerHTML = datos.apellidos + " " + datos.nombres
    document.getElementById('titular').innerHTML = datos.titular
    document.getElementById('ciudad').innerHTML = datos.ciudad
    document.getElementById('email').innerHTML = datos.email   
    document.getElementById('sobre').innerHTML = datos.sobre_ti
    document.getElementById('educacion').innerHTML = datos.estudios
    document.getElementById('idioma').innerHTML = datos.idioma

    let linkedin = document.getElementById('linkedin')
    linkedin.setAttribute('href', datos.linkedin)

    let github = document.getElementById('github')
    github.setAttribute('href', datos.github)
  }

  comentar.addEventListener('click', async () => {

    let datos = await recuperaUsuario()
    let comentario = document.getElementById('comentario').value
  
    await fetch(`http://localhost:3000/agregarComentario`, {
      method: 'post',
      headers: {
          "Accept": "application/json, text/plain, *,*",
          "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        "nombre_usuario" : datos.usuario,
        "id_tecler": id_tecler,
        "comentario": comentario,
        })      
      })
      mostrarComentarios()
      eraseText()
      location.reload()
  })

  function eraseText() {
    document.getElementById("comentario").value = "";
}

async function mostrarConocimientos(){

  let result = await fetch(`http://localhost:3000/conocimientos/${id_tecler}`, {
              method: 'get',
              headers: {
                  "Accept": "application/json, text/plain, *,*",
                  "Content-Type": "application/json",
              },       
  
  })
  let datosC = await result.json()
  console.log(datosC)

  const conocimientos = {
    basedatos : datosC.base_datos,
    apis : datosC.apis,
    testing : datosC.testing,
    seguridad : datosC.seguridad,
    teoriaO : datosC.teoria_objetos
  };

  
  for(const rating in conocimientos) {  
    const starPercentage = (conocimientos[rating] / starTotal) * 100;
    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
    document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded; 
  }
}


async function mostrarTecnologias(){

  let result = await fetch(`http://localhost:3000/tecnologias/${id_tecler}`, {
              method: 'get',
              headers: {
                  "Accept": "application/json, text/plain, *,*",
                  "Content-Type": "application/json",
              },       
  
  })
  let datosT = await result.json()
  console.log(datosT)

  const tecnologias = {
    nodejs : datosT.node_js,
    frontend : datosT.frontend,
    swagger : datosT.swagger,
    javascript : datosT.javascript,
  };
  
  for(const rating in tecnologias) {  
    const starPercentage = (tecnologias[rating] / starTotal) * 100;
    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
    document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded; 
  }

}

async function mostrarHabilidades(){

  let result = await fetch(`http://localhost:3000/habilidades_b/${id_tecler}`, {
              method: 'get',
              headers: {
                  "Accept": "application/json, text/plain, *,*",
                  "Content-Type": "application/json",
              },       
  
  })
  let datosHB = await result.json()
  console.log(datosHB)

  const habilidades = {
    enfoque : datosHB.enfoque,
    trabajoEquipo : datosHB.trabajo_equipo,
    compromiso : datosHB.compromiso,
    comunicacion : datosHB.comunicacion,
    capacidad : datosHB.cap_aprendizaje,
    resolucion: datosHB.resol_problemas
  };
  
  for(const rating in habilidades) {  
    const starPercentage = (habilidades[rating] / starTotal) * 100;
    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
    document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded; 
  }

}

async function mostrarDesempeño(){

  let result = await fetch(`http://localhost:3000/rendimiento/${id_tecler}`, {
              method: 'get',
              headers: {
                  "Accept": "application/json, text/plain, *,*",
                  "Content-Type": "application/json",
              },       
  
  })
  let datosD = await result.json()
  console.log(datosD)

  const desempeño = {
    calidad : datosD.calidad_codigo,
    velocidad : datosD.velocidad_entrega,
    performance : datosD.performance_codigo,
  };
  
  for(const rating in desempeño) {  
    const starPercentage = (desempeño[rating] / starTotal) * 100;
    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
    document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded; 
  }

}


  

  

  