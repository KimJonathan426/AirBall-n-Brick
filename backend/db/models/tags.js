'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(20)
    },
    url: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});
  Tags.associate = function (models) {
    // associations can be defined here
    Tags.belongsToMany(models.Spot, {
      through: 'SpotTags',
      foreignKey: 'tagId',
      otherKey: 'spotId'
    });
  };
  return Tags;
};
