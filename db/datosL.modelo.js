const {DataTypes, Model } = require('sequelize');
const sequelize = require('./conexion')

//Defino los modelos de DB que voy a utilizar

const logro = sequelize.define('logros' , {
    id_logro: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
    
    descripcion : {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    link : {
        type: DataTypes.STRING(100),
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

module.exports = logro