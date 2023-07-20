'use strict';
module.exports = (sequelize, DataTypes) => {
  const SpotTags = sequelize.define('SpotTags', {

  }, {});
  SpotTags.associate = function (models) {
    // associations can be defined here
    SpotTags.belongsTo(models.Spot, {
      foreignKey: 'spotId',
      onDelete: 'CASCADE',
      hooks: true
    });
    SpotTags.belongsTo(models.Tags, {
      foreignKey: 'tagId',
      onDelete: 'CASCADE',
      hooks: true
    });
  };
  return SpotTags;
};
