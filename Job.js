```javascript
const { DataTypes } = require('sequelize');
const { pool } = require('./database.js');

// Define Job model
const Job = pool.define('Job', {
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
  jobDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  companyLink: {
    type: DataTypes.STRING,
    allowNull: true,
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
Job.sync({ alter: true });

module.exports = Job;
```
