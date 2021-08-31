const starTotal = 5;
let listComentarios = []

async function recuperaUsuario () {
    let resultado = await JSON.parse(localStorage.getItem('datosUsuarios'))
    return resultado
  }

  async function recuperaID () {
    let resultado = await JSON.parse(localStorage.getItem('id_usuario'))
    return resultado
  }

  /* async function guardaID (id) {
    localStorage.setItem('id_usuario', JSON.stringify(id))
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
    
        mostrarImagen()
  } */

async function mostrarImagen(){

    let id = await recuperaID()

    let result = await fetch(`http://localhost:3000/imagen/${id}`, {
                method: 'get',
                headers: {
                    "Accept": "application/json, text/plain, *,*",
                    "Content-Type": "application/json",
                },       
    
    })
    let imagen = await result.json()
    document.getElementById('imagenPerfil').setAttribute('src', `data:image/jpg;base64,${imagen}`)
  }

  async function mostrarDatos(){

    let id = await recuperaID()

    let result = await fetch(`http://localhost:3000/datos_perfil/${id}`, {
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

  function crearDatos(datos){
    console.log(datos)
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

  async function mostrarComentarios(){

    let id = await recuperaID()

    let result = await fetch(`http://localhost:3000/comentarios/${id}`, {
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

  async function mostrarConocimientos(){

    let id = await recuperaID()

    let result = await fetch(`http://localhost:3000/conocimientos/${id}`, {
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

    let id = await recuperaID()
  
    let result = await fetch(`http://localhost:3000/tecnologias/${id}`, {
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

    let id = await recuperaID()
  
    let result = await fetch(`http://localhost:3000/habilidades_b/${id}`, {
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
    
    let id = await recuperaID()

    let result = await fetch(`http://localhost:3000/rendimiento/${id}`, {
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
  
  
  