const servClientes = require('../controlador/controlador.cliente')
const servJWT = require('../controlador/controlador.jwt')
const midd = require('../../middlewares/usuario.midd')

module.exports = async (app)=> {
    app.post('/nuevoUsuario', midd.chequeoRegistro, async (req,res)=>{
        let usuario = req.body
        try{
            let resultado = servClientes.crearCliente(usuario)
            if (resultado) { 
                res.status(201).json('Usuario creado correctamente')
            }
            else{
                res.status(204).json({ message: "Datos ya existen", resultado})
            }
        }catch(err){
            res.status(400).send('Ocurrio un error inesperado')  
        }
    })

    app.post('/login', midd.chequeoLogin, async (req,res)=>{
        let usuario = req.body
        try {
            let resultado = await servClientes.cheqCliente(usuario)
            if (resultado) { 
                res.redirect(301, `/tecla_connection`)
            }
            else{
                throw new Error (err)
            }
        }catch (err){
            res.status(400).send('Hay un error con su peticion')
        }
    })

    app.post('/loginAdm', midd.chequeoLogin, async (req,res)=>{
        let usuario = req.body
        try {
            let resultado = await servClientes.cheqAdmin(usuario)
            if (resultado) { 
                res.redirect(301, `/registro`)
            }
            else{
                throw new Error (err)
            }
        }catch (err){
            res.status(400).send('Hay un error con su peticion')
        }
    })

    app.post('/autenticacion', async (req,res)=>{
        let usuario = req.body.usuario
        let usr = req.body
        try {
            let resultado = await servClientes.cheqCliente(usr)
            if (resultado) { 
                let validacion = await servJWT.generaToken(usuario)
                res.status(200).json(validacion)
            }
            else{
                res.status(400).send('Verifique sus datos')
            }
        }catch (err){
            res.status(400).send('Usuario no registrado verifique sus datos')
        }
    })

    app.post('/idTecler', async (req,res)=>{
        let usuario = req.body
        try { 
            let resultado = await servClientes.buscarID(usuario)
            if (resultado) { 
            res.status(200).json(resultado)
            }else{
            res.status(404).send('Verifique sus datos')
            }
        }catch (err){
            res.status(400).send('Hay algun problema en tu endpoind')
        }
    })

    app.get('/listaTeclers/:id', async (req,res)=>{
        try {
            let resultado = await servClientes.listarTeclers(req.params.id)
            res.status(200).json(resultado)
        }catch(error) {
            console.log(error)
            res.status(400).send('Algo raro paso al intentar recuperar la lista de usuarios')
        }
    })

    //CRUD Login 

    app.get('/login', async (req,res)=> {
        try{
            res.render("login", {})
        }catch (error) {
            res.status(400).json('Algo raro ocurrio con esta pagina')
        } 
    })

    app.get('/registro', async (req,res)=> {
        try{
            res.render("registro", {})
        }catch (error) {
            res.status(400).json('Algo raro ocurrio con esta pagina')
        } 
    })

    app.get('/tecla_connection', async (req,res)=> {
        try{
            res.render("inicio", {})
        }catch (error) {
            res.status(400).json('Algo raro ocurrio con esta pagina')
        } 
    })

    app.get('/perfil/:token', midd.urlValido, async (req,res)=> {
        try{
            res.render("perfil", {})
        }catch (error) {
            console.log(error)
            res.status(400).json('No estas autorizado para ver esta pagina, debes loguearte')
        } 
    })

    app.get('/datos_perfil', async (req,res)=> {
        try{
            res.render("datos_perfil", {})
        }catch (error) {
            console.log(error)
            res.status(400).json('No estas autorizado para ver esta pagina, debes loguearte')
        } 
    })

    app.get('/perfil_tecler/:id', async (req,res)=> {
        try{
            res.render("perfil_tecler", {id_tecler: req.params.id})
        }catch (error) {
            console.log(error)
            res.status(400).json('No estas autorizado para ver esta pagina, debes loguearte')
        } 
    })

    app.get('/registro_skills', async (req,res)=> {
        try{
            res.render("registro_skills", {})
        }catch (error) {
            console.log(error)
            res.status(400).json('No estas autorizado para ver esta pagina, debes loguearte')
        } 
    })


}