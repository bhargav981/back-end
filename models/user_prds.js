'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_prds = sequelize.define('user_prds', {
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
    // sprintNumber: {
    //   field: 'sprint_number',
    //   type: DataTypes.INTEGER
    // },
    // sprintDay: {
    //   field: 'sprint_day',
    //   type: DataTypes.INTEGER
    // },
    prdId: {
      field: 'prd_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'prds',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    timestamps: true,
    indexes: [
      {
        fields: ['uli_id']
      },
      {
        fields: ['uli_id', 'prd_id']
      }
    ]
  });
  user_prds.associate = function (models) {
    // associations can be defined here
  };
  return user_prds;
};