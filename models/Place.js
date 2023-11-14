const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Place extends Model { }

Place.init(
  {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        value: DECIMAL
      },
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        value: DECIMAL
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Category",
        key: "id"
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    modelName: 'Place'
  }
);



module.exports = Place;