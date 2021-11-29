'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_report = sequelize.define('user_reports', {
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
    reportUrl: {
        field: 'report_url',
        type: DataTypes.STRING,
        allowNull: false,
      },
 
  }, {
    underscored: true,
    timestamps: true,
    indexes: [
      {
        fields: ['id']
      }
    ]
  });
  user_report.associate = function (models) {
    // associations can be defined here
  };
  return user_report;
};