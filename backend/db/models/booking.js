'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    spotId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    hostId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    url: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});
  Booking.associate = function (models) {
    Booking.belongsTo(models.User, {
      foreignKey: 'userId'
    })
    Booking.belongsTo(models.Spot, {
      foreignKey: 'spotId'
    })
  };
  return Booking;
};
