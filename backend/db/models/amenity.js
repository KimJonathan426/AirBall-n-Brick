'use strict';
module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define('Amenity', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(30)
    },
    url: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});
  Amenity.associate = function(models) {
    // associations can be defined here
    Amenity.belongsToMany(models.Spot, {
      through: 'SpotAmenity',
      foreignKey: 'amenityId',
      otherKey: 'spotId'
    });
  };
  return Amenity;
};
