const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Place",
        key: "id"
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
    freezeTableName: false,
    modelName: 'Comment'
  }
);



module.exports = Comment;