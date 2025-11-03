import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Time = sequelize.define('Time', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pontos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  vitorias: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  empates: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  derrotas: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  posicao: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'times',
  timestamps: false
});

export default Time;