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
    allowNull: false,
    validate: {
      notEmpty: { msg: "O nome do time é obrigatório" },
      len: { args: [3, 50], msg: "O nome deve ter entre 3 e 50 caracteres" }
    }
  },
  pontos: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: "Os pontos não podem ser negativos" }
    }
  },
  vitorias: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: "Vitórias não podem ser negativas" }
    }
  },
  empates: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: "Empates não podem ser negativos" }
    }
  },
  derrotas: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: "Derrotas não podem ser negativas" }
    }
  },
  posicao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: { args: [1], msg: "Posição deve ser maior que zero" }
    }
  }
}, {
  tableName: 'times',
  timestamps: false
});

export default Time;
