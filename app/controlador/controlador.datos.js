const dbDatos = require('../modelo/modelo.datos')
const fs = require('fs');

module.exports.buscarUsuario = async (id)=> {
    try {
        let result = await dbDatos.verUsuario(id)
        return result
    }catch (error) {
        console.log(error)
        throw new Error (error)
    }
}

module.exports.nuevosDatos = async (datos)=> {
    let modelo = [
        datos.usuario_id,
        datos.titular,
        datos.fecha,
        datos.ciudad,
        datos.estudios,
        datos.idiomas,
        datos.perfilL,
        datos.perfilG,
        datos.sobreMi
    ]
    try {
        let result = await dbDatos.altaDatos(modelo)
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('Error en la alta de los datos')
    }
}

module.exports.buscarDatosPerfil = async (id)=> {
    try {
        let result = await dbDatos.verDatosUsuario(id)
        return result[0]
    }catch (error) {
        console.log(error)
        throw new Error (error)
    }
}


module.exports.nuevaImagen = async (datos)=> {
    try {
        let buff = fs.readFileSync(datos.imagen);
        let base64data = buff.toString('base64');
        let codificado = [
            base64data,
            datos.usuario_id,
        ]
        let result = await dbDatos.altaImagen(codificado)
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('Error en la alta de la imagen')
    }
}

module.exports.buscarImagen = async (id)=> {
    try {
        let result = await dbDatos.verImagen(id)
        return result
    }catch (error) {
        console.log(error)
        throw new Error (error)
    }
}

module.exports.cambiarImagen = async (datos)=> {
    try {
        let buff = fs.readFileSync(datos.imagen);
        let base64data = buff.toString('base64');
        let codificado = [
            base64data,
            datos.usuario_id,
        ]
        let result = await dbDatos.modImagen(codificado)
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('Error en la alta de la imagen')
    }
}

module.exports.nuevoComent = async (datos)=> {
    let modelo = [
        datos.nombre_usuario,
        datos.id_tecler,
        datos.comentario,
    ]
    try {
        let result = await dbDatos.altaComent(modelo)
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('Error en la alta de los datos')
    }
}

module.exports.buscarComent = async (id)=> {
    try {
        let result = await dbDatos.verComent(id)
        return result
    }catch (error) {
        throw new Error (error)
    }
}

module.exports.nuevosDatosC = async (datos)=> {
    let modelo = [
        datos.base_datos,
        datos.apis,
        datos.testing,
        datos.seguridad,
        datos.teoria_objetos,
        datos.id_usuario
    ]
    try {
        let result = await dbDatos.altaDatosC(modelo)
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('Error en la alta de los datos')
    }
}

module.exports.buscarC = async (id)=> {
    try {
        let result = await dbDatos.verDatosC(id)
        return result
    }catch (error) {
        console.log(error)
        throw new Error (error)
    }
}

module.exports.nuevosDatosD = async (datos)=> {
    let modelo = [
        datos.calidad_codigo,
        datos.velocidad_entrega,
        datos.performance_codigo,
        datos.id_usuario
    ]
    try {
        let result = await dbDatos.altaDatosD(modelo)
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('Error en la alta de los datos')
    }
}

module.exports.buscarD = async (id)=> {
    try {
        let result = await dbDatos.verDatosD(id)
        return result
    }catch (error) {
        console.log(error)
        throw new Error (error)
    }
}

module.exports.nuevosDatosT = async (datos)=> {
    let modelo = [
        datos.node_js,
        datos.frontend,
        datos.swagger,
        datos.javascript,
        datos.id_usuario
    ]
    try {
        let result = await dbDatos.altaDatosT(modelo)
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('Error en la alta de los datos')
    }
}

module.exports.buscarT = async (id)=> {
    try {
        let result = await dbDatos.verDatosT(id)
        return result
    }catch (error) {
        console.log(error)
        throw new Error (error)
    }
}

module.exports.nuevosDatosHB = async (datos)=> {
    let modelo = [
        datos.enfoque,
        datos.trabajo_equipo,
        datos.compromiso,
        datos.comunicacion,
        datos.cap_aprendizaje,
        datos.resol_problemas,
        datos.id_usuario
    ]
    try {
        let result = await dbDatos.altaDatosHB(modelo)
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('Error en la alta de los datos')
    }
}

module.exports.buscarHB = async (id)=> {
    try {
        let result = await dbDatos.verDatosHB(id)
        return result
    }catch (error) {
        console.log(error)
        throw new Error (error)
    }
}

module.exports.nuevosDatosE = async (datos)=> {
    let modelo = [
        datos.base_datos,
        datos.apis,
        datos.testing,
        datos.seguridad,
        datos.teoria_objetos,
        datos.id_usuario
    ]
    try {
        let result = await dbDatos.altaDatosE(modelo)
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('Error en la alta de los datos')
    }
}
