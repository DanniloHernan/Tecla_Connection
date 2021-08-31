const {DataTypes, Model } = require('sequelize');
const sequelize = require('./conexion')

//Defino los modelos de DB que voy a utilizar

const imagen = sequelize.define('imagenes' , {
    id_imagen: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
    cod_imagen : {
        type: DataTypes.TEXT,
        allowNull: false
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

module.exports = imagen