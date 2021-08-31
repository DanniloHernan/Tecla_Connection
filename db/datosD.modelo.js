const {DataTypes, Model } = require('sequelize');
const sequelize = require('./conexion')

//Defino los modelos de DB que voy a utilizar

const rendimiento = sequelize.define('rendimiento' , {
    id_rendimiento: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
    
    calidad_codigo : {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    velocidad_entrega: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    performance_codigo: {
        type: DataTypes.TINYINT,
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

module.exports = rendimiento