const {DataTypes, Model } = require('sequelize');
const sequelize = require('./conexion')

//Defino los modelos de DB que voy a utilizar

const connection = sequelize.define('connections' , {
    id_connection: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
    
    friend_id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
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

module.exports = connection