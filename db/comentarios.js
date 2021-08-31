const {DataTypes, Model } = require('sequelize');
const sequelize = require('./conexion')

//Defino los modelos de DB que voy a utilizar

const comentario = sequelize.define('comentarios' , {
    id_comentario: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
    
    comentario : {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    nombre_usuario : {
        type: DataTypes.STRING(50),
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

module.exports = comentario