const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model { }

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    freezeTableName: false,
    modelName: 'Category'
  }
);

// add methods within models to read/write

module.exports = Category;