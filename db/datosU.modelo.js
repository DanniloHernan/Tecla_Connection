const {DataTypes, Model } = require('sequelize');
const sequelize = require('./conexion')

//Defino los modelos de DB que voy a utilizar

const datos_usuario = sequelize.define('datos_usuarios' , {
    id_datosUsuario: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },

    titular : {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    fecha : {
        type: DataTypes.DATE,
        allowNull: true
    },
    ciudad: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idioma: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    linkedin: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    github : {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    estudios : {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    sobre_ti: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    usuario_id: {
        type: DataTypes.UUID,
        references: {
          model: 'usuarios',
          key: 'id_usuario'
        }
    },
}, {
    timestamps: true
})

module.exports = datos_usuario