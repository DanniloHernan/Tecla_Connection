const dbServicios = require('../modelo/modelo.cliente')

//Exportamos nuestros modulos
module.exports.crearCliente = async (usuario)=> {
    let usrNuevo = [
        usuario.nombres,
        usuario.apellidos,
        usuario.email,
        usuario.usuario,
        usuario.pass,
        usuario.tipo
    ]
    try {
        let resultado = await dbServicios.nuevoCliente(usrNuevo)
        if (resultado) {
            return true
        }else {     
            throw new Error ('Error en la creacion del usuario o el usuario ya existe')
        }

    }catch (err) {
        console.log(err)
        throw new Error ('Error en la creacion del usuario')
    }
}

module.exports.cheqCliente = async (usr)=>{
    try {
        let resultado = await dbServicios.existenciaDeCliente (usr)
        if (resultado) {
            return resultado         
        }else {
            console.log('Usuario invalido verifique sus datos')
            return resultado
        }
    }catch (err) {
        throw new Error (err)
    }
}

module.exports.cheqAdmin = async (usr)=>{
    try {
        let resultado = await dbServicios.existenciaDeAdmin(usr)
        console.log(resultado)
        if (resultado) {
            return resultado
        }else {
            throw new Error ('Necesita permisos de administrador para realizar esta accion')
        }
    }catch (err) {
        throw new Error (err)
    }
}

module.exports.listarTeclers = async (id)=> {
    try {
        let result = await dbServicios.listaTeclers(id)
        return result
    }catch (error) {
        console.log(error)
        throw new Error (error)
    }
}

module.exports.buscarID = async (usr)=> {
    try {
        let result = await dbServicios.obtenerID(usr)
        return result
    }catch (error) {
        console.log(error)
        throw new Error (error)
    }
}