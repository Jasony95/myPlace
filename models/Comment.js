const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
  {
    id: {
      type: DataType.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: user_id
      }
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "place",
        key: place_id
      }
    },
    time_created: {
      type: DataTypes.DATETIME,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'comment'
  }
);



module.exports = Comment;