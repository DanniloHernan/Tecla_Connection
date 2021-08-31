const datosU = require('../../db/datosU.modelo')
const datosL = require('../../db/datosL.modelo')
const datosC = require('../../db/datosC.modelo')
const datosD = require('../../db/datosD.modelo')
const datosHB = require('../../db/datosHB.modelo')
const datosT = require('../../db/datosT.modelo')
const connections = require('../../db/connection.modelo')
const comentarios = require('../../db/comentarios')
const imagen = require('../../db/imagenes.modelo')

const sequelize = require('../../db/conexion');

module.exports.verUsuario = async function (id){

    try {
      let buscarD = await datosU.findOne({
        where:{
          usuario_id: id
        }
      })
      return buscarD
      } catch (err) {
        throw new Error ('Ocurrio un error en la consulta del usuario')
      }
  }

  module.exports.verDatosUsuario = async function (id){

    try {
      let buscarD = await sequelize.query(`
      SELECT nombres,apellidos,email,titular,ciudad,idioma,linkedin,github,estudios,sobre_ti
      FROM usuarios u
      INNER JOIN datos_usuarios du ON du.usuario_id = '${id}'
      AND u.id_usuario = '${id}'`)
      return buscarD
      } catch (err) {
        throw new Error ('Ocurrio un error en la consulta del usuario')
      }
  }
  
  
  module.exports.altaDatos = async function (modelo){
    try {
      console.log(modelo)
      let buscarD = await datosU.findOne({
        where:{
          usuario_id: modelo[0]
        }
      })
      if (buscarD){
      return false
      }else {
      await datosU.create({
        usuario_id:modelo[0],
        titular:modelo[1],
        fecha:modelo[2],
        ciudad:modelo[3], 
        estudios:modelo[4],
        idioma:modelo[5],
        linkedin:modelo[6],
        github:modelo[7],
        sobre_ti:modelo[8]})
      return true
    }}catch(err) {
        throw new Error(err)
    }
  }

  module.exports.altaImagen = async function (datos){
    try {
      await imagen.create({
        cod_imagen:datos[0],
        usuario_id:datos[1]
      })
      return true
      } catch(err) {
        throw new Error(err)
      }
  }

  module.exports.verImagen = async function (id){
    try {
      let img = await imagen.findOne({
        attributes: ['cod_imagen'],
        where:{
          usuario_id: id
        }
        })
      return img.cod_imagen
      } catch(err) {
        throw new Error(err)
      }
  }

  module.exports.modImagen = async function (datos){
    try {
      await imagen.update({
        cod_imagen:datos[0]
      },
      {
        where:{
          usuario_id: datos[1]
        }
      })
      return true
      } catch(err) {
        throw new Error(err)
      }
  }

  module.exports.altaComent = async function (datos){
    try {
      await comentarios.create({
        comentario:datos[2],
        usuario_id:datos[1],
        nombre_usuario:datos[0]})
      return true
      } catch(err) {
        throw new Error(err)
      }
  }

  module.exports.verComent = async function (id){
    try {
      let coment = await comentarios.findAll({
        where:{
          usuario_id: id
        }
      })
      return coment
      } catch(err) {
        throw new Error(err)
      }
  }

  module.exports.altaDatosC = async function (modelo){
    try {
      let buscarU = await datosC.findOne({
        where:{
          usuario_id: modelo[5]
        }
      })
      if (buscarU){
      return false
      }else {
        await datosC.create({
          base_datos:modelo[0],
          apis:modelo[1],
          testing:modelo[2],
          seguridad:modelo[3], 
          teoria_objetos:modelo[4], 
          usuario_id:modelo[5]})
        return true
      }}catch(err) {
        throw new Error(err)
    }
  }

  module.exports.verDatosC = async function (id){
    try {
      let dato = await datosC.findOne({
        where:{
          usuario_id: id
        }
      })
      return dato
      } catch(err) {
        throw new Error(err)
      }
  }

  module.exports.altaDatosD = async function (modelo){
    try {
      let buscarU = await datosD.findOne({
        where:{
          usuario_id: modelo[3]
        }
      })
      if (buscarU){
      return false
      }else {
        await datosD.create({
          calidad_codigo:modelo[0],
          velocidad_entrega:modelo[1],
          performance_codigo:modelo[2],
          usuario_id:modelo[3]})
        return true
      }}catch(err) {
        throw new Error(err)
    }
  }

  module.exports.verDatosD = async function (id){
    try {
      let dato = await datosD.findOne({where:{usuario_id: id}})
      return dato
      } catch(err) {
        throw new Error(err)
      }
  }

  module.exports.altaDatosT = async function (modelo){
    try {
      let buscarU = await datosT.findOne({
        where:{
          usuario_id: modelo[4]
        }
      })
      if (buscarU){
      return false
      }else {
        await datosT.create({
          node_js:modelo[0],
          frontend:modelo[1],
          swagger:modelo[2],
          javascript:modelo[3],
          usuario_id: modelo[4]
        })
        return true
      }}catch(err) {
        throw new Error(err)
    }
  }

  module.exports.verDatosT = async function (id){
    try {
      let dato = await datosT.findOne({
        where:{
          usuario_id: id
        }
      })
      return dato
      } catch(err) {
        throw new Error(err)
      }
  }

  module.exports.altaDatosHB = async function (modelo){
    try {
      let buscarU = await datosHB.findOne({
        where:{
          usuario_id: modelo[6]
        }
      })
      if (buscarU){
      return false
      }else {
        await datosHB.create({
          enfoque:modelo[0],
          trabajo_equipo:modelo[1],
          compromiso:modelo[2],
          comunicacion:modelo[3], 
          cap_aprendizaje:modelo[4], 
          resol_problemas:modelo[5],
          usuario_id: modelo[6]})
        return true
      }}catch(err) {
        throw new Error(err)
    }
  }

  module.exports.verDatosHB = async function (id){
    try {
      let dato = await datosHB.findOne({
        where:{
          usuario_id: id
        }
      })
      return dato
      } catch(err) {
        throw new Error(err)
      }
  }

  module.exports.altaDatosC = async function (modelo){
    try {
      let buscarU = await datosC.findOne({
        where:{
          usuario_id: modelo[5]
        }
      })
      if (buscarU){
      return false
      }else {
        await datosC.create({
          base_datos:modelo[0],
          apis:modelo[1],
          testing:modelo[2],
          seguridad:modelo[3],
          teoria_objetos:modelo[4],
          usuario_id:modelo[5]})
        return true
      }}catch(err) {
        throw new Error(err)
    }
  }