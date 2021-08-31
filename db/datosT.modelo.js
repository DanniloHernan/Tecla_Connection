const {DataTypes, Model } = require('sequelize');
const sequelize = require('./conexion')

//Defino los modelos de DB que voy a utilizar

const tecnologia = sequelize.define('tecnologias' , {
    id_tecnologia: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
    
    node_js : {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    frontend: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    swagger: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    javascript: {
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

module.exports = tecnologia