const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const sequelize = require('./db/conexion')
const midd = require ('./middlewares/usuario.midd')

const Usuarios = require('./db/usuarios.modelo')
const conocimientos = require('./db/datosC.modelo')
const rendimiento = require('./db/datosD.modelo')
const habilidades = require('./db/datosHB.modelo')
const tecnologias = require('./db/datosT.modelo')
const comentarios = require('./db/comentarios')
const logros = require('./db/datosL.modelo')
const datos_usuario = require('./db/datosU.modelo')
const imagenes = require('./db/imagenes.modelo')
const t_connection = require('./db/connection.modelo')



//const connection = require('./db/conexion')

const DatosRoutes = require('./app/vista/vista.datos')
const ClientesRoutes = require('./app/vista/vista.cliente')


//configuramos nuestro servidor
app.use(express.json())
app.use(cors())
app.use(midd.limiter)
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

async function iniciarServidor() {
    try {
      //await Usuarios.sync({alter:true})
      //await comentarios.sync({alter:true})
      //await tecnologias.sync({alter:true})
      //await habilidades.sync({alter:true})
      //await rendimiento.sync({alter:true})
      //await conocimientos.sync({alter:true})
      //await t_connection.sync({alter:true})
      //await logros.sync({alter:true})
      //await imagenes.sync({alter:true})
      //await datos_usuario.sync({alter:true})

      //await connection.sync({alter:true})
      
      await sequelize.authenticate();
      console.log('Conexión establecida correctamente');
      app.listen(process.env.PORT, ()=> {
        console.log(`Sistema iniciado en http://${process.env.HOST}:${process.env.PORT}`);
      })
    } catch (err) {
      console.error('No se pudo conectar con la Base de datos: ', err)
    }
  }
  

iniciarServidor()

DatosRoutes(app)
ClientesRoutes(app)
