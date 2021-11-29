'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    uliId: {
      field: 'uli_id',
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER
    },
    email: DataTypes.STRING,
    firstName: {
      field: 'first_name',
      type: DataTypes.STRING
    },
    lastName: {
      field: 'last_name',
      type: DataTypes.STRING
    },
    groupId: {
      field: 'group_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['group_id']
      }
    ],
    paranoid: true
  });
  users.associate = function (models) {
    // associations can be defined here
    users.belongsTo(models.groups);
  };
  return users;
};