'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    country: {
      allowNull: false,
      type:DataTypes.STRING(100)
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(155)
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2)
    }
  }, {});
  Spot.associate = function(models) {
    Spot.hasMany(models.Image, {
      foreignKey: 'spotId',
      onDelete: 'CASCADE',
      hooks: true
    })
    Spot.hasMany(models.Review, {
      foreignKey: 'spotId',
      onDelete: 'CASCADE',
      hooks: true
    })
    Spot.hasMany(models.Booking, {
      foreignKey: 'spotId',
      onDelete: 'CASCADE',
      hooks: true
    })
    Spot.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  };
  return Spot;
};
