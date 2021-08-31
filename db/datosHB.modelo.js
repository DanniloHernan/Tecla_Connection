const {DataTypes, Model } = require('sequelize');
const sequelize = require('./conexion')

//Defino los modelos de DB que voy a utilizar

const habilidades_blandas = sequelize.define('habilidades_blandas' , {
    id_habilidades_blandas: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
    
    enfoque : {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    trabajo_equipo: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    compromiso: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    comunicacion: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    cap_aprendizaje: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    resol_problemas: {
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

module.exports = habilidades_blandas