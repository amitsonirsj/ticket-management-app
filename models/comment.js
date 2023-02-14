'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { foreignKey: 'createdBy', as:'createdByDetail' });
      Comment.belongsTo(models.Ticket, { foreignKey: 'ticketId' });

    }
  }
  Comment.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.TEXT
    },
    createdBy: {
      type: DataTypes.BIGINT,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      }
    },
    ticketId: {
      type: DataTypes.BIGINT,
      references: {
        model: {
          tableName: 'Tickets'
        },
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};