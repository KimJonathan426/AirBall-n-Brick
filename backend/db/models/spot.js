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
    zipcode: {
      allowNull: false,
      type: DataTypes.STRING(11)
    },
    country: {
      allowNull: false,
      type:DataTypes.STRING(100)
    },
    lat: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    lng: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    showSpecific: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(64)
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(500)
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING(5)
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER(6)
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
