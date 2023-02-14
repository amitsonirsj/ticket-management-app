'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'assignedToDetail' });
      Ticket.belongsTo(models.User, { foreignKey: 'createdBy', as: 'createdByDetail' });
      Ticket.hasMany(models.Comment, { foreignKey: 'ticketId', as: 'comments' });
    }
  }
  Ticket.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    productType: {
      type: DataTypes.ENUM,
      values: ['Mobile', 'Website', 'General', 'Other'],
      allowNull: false
    },
    assignedTo: {
      type: DataTypes.BIGINT,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      }
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
    status: {
      type: DataTypes.ENUM,
      values: ['Open', 'Assigned', 'In Progress', 'Closed'],
      defaultValue: 'Open'
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
    modelName: 'Ticket',
  });
  return Ticket;
};