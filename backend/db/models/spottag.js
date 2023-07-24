'use strict';
module.exports = (sequelize, DataTypes) => {
  const SpotTag = sequelize.define('SpotTag', {

  }, {});
  SpotTag.associate = function (models) {
    // associations can be defined here
    SpotTag.belongsTo(models.Spot, {
      foreignKey: 'spotId',
      onDelete: 'CASCADE',
      hooks: true
    });
    SpotTag.belongsTo(models.Tag, {
      foreignKey: 'tagId',
      onDelete: 'CASCADE',
      hooks: true
    });
  };
  return SpotTag;
};
