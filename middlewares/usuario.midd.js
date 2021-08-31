
const limiteConsultas = require("express-rate-limit");
const Joi = require('joi');

const servicesUsuarios = require('../app/controlador/controlador.cliente')
const servJWT = require('../app/controlador/controlador.jwt')

const { modelologin, modeloAlta } = require('./midd.modelo.usuarios');

module.exports.limiter = limiteConsultas({
    windowMs: 10*60*1000, //10 minutos
    max: 100, 
    message: 'Excedió el límite de consultas por usuario'
})

module.exports.usuarioValido = async (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1]
    try {
        let verificado = await servJWT.verificacionCliente(token)
        if (verificado){
            return next()
        }else{
            throw new Error ('Necesitas estar autorizado para completar esa accion')
        }
    }catch (err){
        res.status(401).json({error: err.message})
    }
}

module.exports.urlValido = async (req,res,next)=>{
    let token = req.params.token
    try {
        let verificado = await servJWT.verificacionCliente(token)
        if (verificado){
            return next()
        }else{
            throw new Error ('Necesitas estar autorizado para ver esta pagina')
        }
    }catch (err){
        res.status(401).json({error: err.message})
    }
}

module.exports.administradorValido = async (req,res,next)=>{
    let usuario = req.body.usr
    try {
        let resultado = await servicesUsuarios.cheqAdmin(usuario)
        if (resultado) {
            return next()
        }else {
            throw new Error ('Error necesitas permisos de Administracion')
        }        
    }catch (err) {
        res.status(404).json({error: err.message})
    }
}

module.exports.chequeoLogin = async (req,res,next)=>{
    try {
        let resultado = await Joi.attempt(req.body, modelologin, 'Los datos ingresados no son correctos')
        console.log(Object.values(resultado) + ' El formato de los datos ingresados es validos y autorizados por el middleware')
        return next()
    }catch(error){
        throw new Error (error)
    }
}

module.exports.chequeoRegistro = async (req,res,next)=>{
    try {
        let resultado = await Joi.attempt(req.body, modeloAlta, 'Los datos ingresados no son correctos')
        console.log(Object.values(resultado) + ' Los datos ingresados son validos')
        return next()
    }catch(error){
        throw new Error (error)
    }
}
