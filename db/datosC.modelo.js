const {DataTypes, Model } = require('sequelize');
const sequelize = require('./conexion')

//Defino los modelos de DB que voy a utilizar

const conocimiento = sequelize.define('conocimientos' , {
    id_conocimiento: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
    
    base_datos : {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    apis: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    testing: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    seguridad: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    teoria_objetos: {
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

module.exports = conocimiento