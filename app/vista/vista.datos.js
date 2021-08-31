const datosServ = require('../controlador/controlador.datos')
const midd = require('../../middlewares/usuario.midd')

//exportamos los modulos que vamos a utilizar
module.exports = async (app)=> {

app.get('/buscarDatos/:id/:token', async (req,res)=> {
        try {
            let resultado = await datosServ.buscarUsuario(req.params.id)
            if (resultado) { 
                res.redirect(301, `/perfil/${req.params.token}`)
            }
            else{
                res.redirect(301, '/datos_perfil')
            }
        }catch (error) {
            res.status(400).send('Ocurrio un error en la consulta')
        }
    })
    
app.post('/ingresoDatos/:token', async (req,res)=>{
        let ingreso = req.body
            try {
                let resultado = await datosServ.nuevosDatos(ingreso)
                if(resultado){
                    res.redirect(301, `/perfil/${req.params.token}`)
                }else{
                    res.status(204).json({ message: "Datos ya existen", resultado})
                }         
            }catch (error) {
                res.status(400).send('Ocurrio un error en tu peticion')
            }
    })

app.get('/datos_perfil/:id', async (req,res)=>{
        try {
            let result = await datosServ.buscarDatosPerfil(req.params.id)
            //console.log(resultado)
            res.status(200).json(result)
        }catch (error) {
            res.status(400).send('Algo raro paso')
        }
})


app.post('/imagen', async (req,res)=>{
        let datos = req.body
            try {
                let resultado = await datosServ.nuevaImagen(datos)
                //console.log(resultado)
                res.status(201).json({ message: "Imagen guardada exitosamente", resultado})
            }catch (error) {
                res.status(400).send('Algo raro paso con tu peticion')
            }
    })

app.get('/imagen/:id', async (req,res)=>{
    let id = req.params.id
            try {
                let imagen_cod = await datosServ.buscarImagen(id)
                res.status(200).json(imagen_cod)
            }catch (error) {
                res.status(400).send('Algo raro paso con tu peticion')
            }
    })

app.patch('/imagen', midd.usuarioValido, async (req,res)=>{
        let datos = req.body
            try {
                let resultado = await datosServ.cambiarImagen(datos)
                res.status(201).json({ message: "Imagen guardada exitosamente", resultado})
            }catch (error) {
                res.status(400).send('Algo raro paso con tu peticion')
            }
    })

app.post('/agregarComentario', async (req,res)=>{
        let datos = req.body
            try {
                let resultado = await datosServ.nuevoComent(datos)
                //console.log(resultado)
                res.status(201).json({ message: "Comentario guardado exitosamente", resultado})
            }catch (error) {
                res.status(400).send('Algo raro paso en tu peticion para agregar el comentario')
            }
    })

app.get('/comentarios/:id', async (req,res)=>{
        try {
            let comentario = await datosServ.buscarComent(req.params.id)
            res.status(200).json(comentario)
        }catch (error) {
            res.status(400).send('Algo raro paso en tu peticion para obtener los comentarios')
        }
})


app.post('/conocimientos', midd.usuarioValido, midd.administradorValido, async (req,res)=>{
    let datos = req.body
        try {
            let resultado = await datosServ.nuevosDatosC(datos)
            if(resultado){
                res.status(201).json({ message: "Datos guardados exitosamente", resultado})
            }else{
                res.status(204).json({ message: "Datos ya existen", resultado})
            }  
        }catch (error) {
            res.status(400).send('Algo raro paso con tu peticion')
        }
})

app.get('/conocimientos/:id', async (req,res)=>{
    try {
        let datosC = await datosServ.buscarC(req.params.id)
        res.status(200).json(datosC)
    }catch (error) {
        res.status(400).send('Algo raro paso en tu peticion para obtener los datos')
    }
})

app.post('/rendimiento', midd.usuarioValido, midd.administradorValido, async (req,res)=>{
    let datos = req.body
        try {
            let resultado = await datosServ.nuevosDatosD(datos)
            if(resultado){
                res.status(201).json({ message: "Datos guardados exitosamente", resultado})
            }else{
                res.status(204).json({ message: "Datos ya existen", resultado})
            }  
        }catch (error) {
            res.status(400).send('Algo raro paso con tu peticion')
        }
})

app.get('/rendimiento/:id', async (req,res)=>{
    try {
        let datosD = await datosServ.buscarD(req.params.id)
        res.status(200).json(datosD)
    }catch (error) {
        res.status(400).send('Algo raro paso en tu peticion para obtener los datos')
    }
})

app.post('/tecnologias', midd.usuarioValido, midd.administradorValido, async (req,res)=>{
    let datos = req.body
        try {
            let resultado = await datosServ.nuevosDatosT(datos)
            if(resultado){
                res.status(201).json({ message: "Datos guardados exitosamente", resultado})
            }else{
                res.status(204).json({ message: "Datos ya existen", resultado})
            }  
        }catch (error) {
            res.status(400).send('Algo raro paso con tu peticion')
        }
})

app.get('/tecnologias/:id', async (req,res)=>{
    try {
        let datosD = await datosServ.buscarT(req.params.id)
        res.status(200).json(datosD)
    }catch (error) {
        res.status(400).send('Algo raro paso en tu peticion para obtener los datos')
    }
})

app.post('/habilidades_b', midd.usuarioValido, midd.administradorValido, async (req,res)=>{
    let datos = req.body
        try {
            let resultado = await datosServ.nuevosDatosHB(datos)
            if(resultado){
                res.status(201).json({ message: "Datos guardados exitosamente", resultado})
            }else{
                res.status(204).json({ message: "Datos ya existen", resultado})
            }  
        }catch (error) {
            res.status(400).send('Algo raro paso con tu peticion')
        }
})

app.get('/habilidades_b/:id', async (req,res)=>{
    try {
        let datosD = await datosServ.buscarHB(req.params.id)
        res.status(200).json(datosD)
    }catch (error) {
        res.status(400).send('Algo raro paso en tu peticion para obtener los datos')
    }
})

app.post('/entornos', midd.usuarioValido, midd.administradorValido, async (req,res)=>{
    let datos = req.body
        try {
            let resultado = await datosServ.nuevosDatosE(datos)
            if(resultado){
                res.status(201).json({ message: "Datos guardados exitosamente", resultado})
            }else{
                res.status(204).json({ message: "Datos ya existen", resultado})
            }  
        }catch (error) {
            res.status(400).send('Algo raro paso con tu peticion')
        }
})
}

