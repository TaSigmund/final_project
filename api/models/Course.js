/***
 * COURSE MODEL
 ***/

'use strict';
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A course title is required"
          },
          notEmpty: {
            msg: "A title is required."
          }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A course description is required"
          },
          notEmpty: {
            msg: "A description is required."
          }
        }
    },
    estimatedTime: {
        type: DataTypes.STRING,
    },
    materialsNeeded: {
        type: DataTypes.STRING
          },
  }, { sequelize });

  Course.associate = models => {
    Course.belongsTo(models.User, {
      foreignKey:{
        fieldName: 'userId'
    }});
};

  return Course;
};