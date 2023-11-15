const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Marker extends Model { }

Marker.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    lat: {
      type: DataTypes.STRING
    },
    lon: {
      type: DataTypes.STRING
    },
    marker_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
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
    modelName: 'Marker'
  }
);

// add methods within models to read/write

module.exports = Marker;