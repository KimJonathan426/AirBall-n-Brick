'use strict';
module.exports = (sequelize, DataTypes) => {
  const SpotAmenity = sequelize.define('SpotAmenity', {

  }, {});
  SpotAmenity.associate = function(models) {
    // associations can be defined here
    SpotAmenity.belongsTo(models.Spot, {
      foreignKey: 'spotId',
      onDelete: 'CASCADE',
      hooks: true
    });
    SpotAmenity.belongsTo(models.Amenity, {
      foreignKey: 'amenityId',
      onDelete: 'CASCADE',
      hooks: true
    });
  };
  return SpotAmenity;
};
