'use strict';
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define('customers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imageKey: {
      field: 'image_key',
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    timestamps: true
  });
  customers.associate = function(models) {
    // associations can be defined here
  };
  return customers;
};