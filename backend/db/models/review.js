'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    spotId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    review: {
      allowNull: false,
      type: DataTypes.STRING(1000)
    },
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER(1, 0)
    }
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, {
      foreignKey: 'userId'
    })
    Review.belongsTo(models.Spot, {
      foreignKey: 'spotId'
    })
  };
  return Review;
};
