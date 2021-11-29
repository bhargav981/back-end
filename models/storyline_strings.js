'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_strings = sequelize.define('storyline_strings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    storylineId: {
      field: 'storyline_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'storylines',
        key: 'id'
      },
      primaryKey: true
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    value: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_strings.associate = function(models) {
    // associations can be defined here
    storyline_strings.belongsTo(models.storylines);
  };
  return storyline_strings;
};