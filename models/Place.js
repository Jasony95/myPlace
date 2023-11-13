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
      autoIncrement: true,
      validate: {
        value: DECIMAL
      },
      references: {
        model: "category",
        key: id
      }
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      autoIncrement: true,
      validate: {
        value: DECIMAL
      },
      references: {
        model: "category",
        key: id
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'place'
  }
);



module.exports = Place;