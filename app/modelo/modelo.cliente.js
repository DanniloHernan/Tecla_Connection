const Usuarios = require('../../db/usuarios.modelo')
const sequelize = require('../../db/conexion')

//Exporto los modulos

module.exports.nuevoCliente = async (usr)=> {
    try {
        let resultado = await Usuarios.findOne({where:{email: usr[2]}})
        if (resultado != null){
            return false
        }else {
            await Usuarios.create({nombres:usr[0], apellidos:usr[1],email:usr[2],usuario:usr[3],pass:usr[4],tipo:usr[5]})
            return true
        }
    }catch (err) {
        console.log(err)
        throw new Error (err)
    }
}

module.exports.existenciaDeCliente = async (usr)=>{
    let usuario = [usr.usuario , usr.pass]
    try {
        let resultado = await Usuarios.findOne({where: {usuario: `${usuario[0]}`,pass: `${usuario[1]}`}})
        //let resultado = await sequelize.query(`SELECT * FROM dbo.clientes WHERE clientes.usuario = '${usuario[0]}'`);
        if (resultado != null) {          
                return true
        }else {
            return false
        }
    }catch (err) {
        throw new Error (err)
    }
}

module.exports.existenciaDeAdmin = async (usr)=>{
    let usuario = [usr.usuario , usr.pass]
    try {
        let resultado = await Usuarios.findOne({where: {usuario: `${usuario[0]}`,pass: `${usuario[1]}`, tipo: "admin"}})
        //let resultado = await sequelize.query(`SELECT * FROM dbo.clientes WHERE clientes.usuario = '${usuario[0]}'`);
        if (resultado != null) {
            return true
        }else {
            return false
        }
    }catch (err) {
        console.log(err)
        throw new Error (err)
    }
}

module.exports.listaTeclers = async (id)=> {
    try {
        let resultado = await sequelize.query(`SELECT id_usuario,nombres,apellidos,titular,cod_imagen
        FROM usuarios u 
        INNER JOIN datos_usuarios du ON du.usuario_id = u.id_usuario
        INNER JOIN imagenes i ON i.usuario_id = u.id_usuario
        AND u.id_usuario<>'${id}'`)   
        return resultado[0]
    }catch (error){
        console.log(error)
        throw new Error (error)
    }
}

module.exports.obtenerID = async (usr)=>{
    let usuario = [usr.usuario , usr.pass]
    try {
        let resultado = await Usuarios.findOne({attributes: ['id_usuario'],where: {usuario: `${usuario[0]}`,pass: `${usuario[1]}`}})
        let id = resultado.id_usuario
        console.log(id)
        if (resultado != null) {          
                return id
        }else {
            return resultado
        }
    }catch (err) {
        throw new Error (err)
    }
}