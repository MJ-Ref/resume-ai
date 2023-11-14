
const { DataTypes } = require('sequelize');
const { pool } = require('./database.js');

// Define Resume model
const Resume = pool.define('Resume', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // 'Users' refers to table name
      key: 'id', // 'id' refers to column name in Users table
    }
  },
  file: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  professionalHistory: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Sync the model with the database
Resume.sync({ alter: true });

module.exports = Resume;

