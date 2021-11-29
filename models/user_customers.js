'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_customers = sequelize.define('user_customers', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uliId: {
      field: 'uli_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'uli_id'
      }
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sprintNumber: {
      field: 'sprint_number',
      type: DataTypes.INTEGER
    },
    sprintDay: {
      field: 'sprint_day',
      type: DataTypes.INTEGER
    },
    customerId: {
      field: 'customer_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    response: {
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    timestamps: true,
    indexes: [
      {
        fields: ['uli_id']
      }
    ]
  });
  user_customers.associate = function (models) {
    // associations can be defined here
  };
  return user_customers;
};