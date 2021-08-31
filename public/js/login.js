let inicio = document.getElementById('iniciar')
let inicioAdm = document.getElementById('iniciaAdm')

class Usuario {
    constructor (usuario, pass) {
        this.usuario = usuario
        this.pass = pass
    }

    static async guardaUsuario (usuario) {
        localStorage.setItem('datosUsuarios', JSON.stringify(usuario))
    }

    static async recuperaUsuario () {
        let resultado = await JSON.parse(localStorage.getItem('datosUsuarios'))
        return resultado
    }
}

inicio.addEventListener('click', async ()=>{

    let usuario = document.getElementById('user').value
    let pass = document.getElementById('password').value

    let data = new Usuario (usuario, pass)
    await Usuario.guardaUsuario(data)

        await fetch('http://localhost:3000/login', {
                method: 'post',
                headers: {
                    "Accept": "application/json, text/plain, *,*",
                    "Content-Type": "application/json"
                },       
                body: JSON.stringify({
                    "usuario" : usuario,
                    "pass": pass
                })
        }).then(res => res.redirected && ( location.href = res.url ))
})

inicioAdm.addEventListener('click', async ()=>{

    let usuarioAdm = document.getElementById('userAdm').value
    let passAdm = document.getElementById('passwordAdm').value

    let data = new Usuario (usuarioAdm, passAdm)
    await Usuario.guardaUsuario(data)

        await fetch('http://localhost:3000/loginAdm', {
                method: 'post',
                headers: {
                    "Accept": "application/json, text/plain, *,*",
                    "Content-Type": "application/json"
                },       
                body: JSON.stringify({
                    "usuario" : usuarioAdm,
                    "pass": passAdm
                })
        }).then(res => res.redirected && ( location.href = res.url ))
})

const openEls = document.querySelectorAll("[data-open]");
const isVisible = "is-visible";
 
for(const el of openEls) {
  el.addEventListener("click", function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

const closeEls = document.querySelectorAll("[data-close]");

for (const el of closeEls) {
  el.addEventListener("click", function() {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

document.addEventListener("click", e => {
   if (e.target == document.querySelector(".modal.is-visible")) {
     document.querySelector(".modal.is-visible").classList.remove(isVisible);
   }
 });
 
document.addEventListener("keyup", e => {
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});



