'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_customers = sequelize.define('storyline_customers', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    storylineId: {
      field: 'storyline_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'storylines',
        key: 'id'
      }
    },
    customerId: {
      field: 'customer_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    avatar:{
      type: DataTypes.STRING
    },
    designation:{
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_customers.associate = function(models) {
    // associations can be defined here
    storyline_customers.belongsTo(models.storylines);
    storyline_customers.belongsTo(models.customers);
  };
  return storyline_customers;
};