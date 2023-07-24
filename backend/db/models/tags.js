'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(20)
    },
    url: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});
  Tag.associate = function (models) {
    // associations can be defined here
    Tag.belongsToMany(models.Spot, {
      through: 'SpotTag',
      foreignKey: 'tagId',
      otherKey: 'spotId'
    });
  };
  return Tag;
};
