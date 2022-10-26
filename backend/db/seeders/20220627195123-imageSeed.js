'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Images', [
      {
        spotId: 1,
        url: 'https://airballnbrick.s3.amazonaws.com/Cavs+Arena.jpg'
      },
      {
        spotId: 1,
        url: 'https://airballnbrick.s3.amazonaws.com/rocket-mortgage-fieldhouse.png'
      },
      {
        spotId: 1,
        url: 'https://airballnbrick.s3.amazonaws.com/Cavs+Arena+Fire.jfif'
      },
      {
        spotId: 1,
        url: 'https://airballnbrick.s3.amazonaws.com/Cavs+Hoop.jpg'
      },
      {
        spotId: 1,
        url: 'https://airballnbrick.s3.amazonaws.com/Cavs+Overhead.webp'
      },
      {
        spotId: 2,
        url: 'https://airballnbrick.s3.amazonaws.com/Heat+Arena.jpg'
      },
      {
        spotId: 2,
        url: 'https://airballnbrick.s3.amazonaws.com/FTX+Arena.jpg'
      },
      {
        spotId: 2,
        url: 'https://airballnbrick.s3.amazonaws.com/Vice+Heat+Arena.jpg'
      },
      {
        spotId: 2,
        url: 'https://airballnbrick.s3.amazonaws.com/Heat+Court+Logo.jpg'
      },
      {
        spotId: 2,
        url: 'https://airballnbrick.s3.amazonaws.com/Heat+Overhead.webp'
      },
      {
        spotId: 3,
        url: 'https://airballnbrick.s3.amazonaws.com/Lakers+Arena.jpg'
      },
      {
        spotId: 3,
        url: 'https://airballnbrick.s3.amazonaws.com/Crypto+Arena.jfif'
      },
      {
        spotId: 3,
        url: 'https://airballnbrick.s3.amazonaws.com/Lakers+Court.jfif'
      },
      {
        spotId: 3,
        url: 'https://airballnbrick.s3.amazonaws.com/Lakers+Court+Empty.jpg'
      },
      {
        spotId: 3,
        url: 'https://airballnbrick.s3.amazonaws.com/Lakers+Overhead.jpg'
      },
      {
        spotId: 4,
        url: 'https://airballnbrick.s3.amazonaws.com/Warriors+Arena.jpg'
      },
      {
        spotId: 4,
        url: 'https://airballnbrick.s3.amazonaws.com/Chase+Center.jpg'
      },
      {
        spotId: 4,
        url: 'https://airballnbrick.s3.amazonaws.com/Warriors+Court+Logo.jpg'
      },
      {
        spotId: 4,
        url: 'https://airballnbrick.s3.amazonaws.com/Warriors+Hoop.jpg'
      },
      {
        spotId: 4,
        url: 'https://airballnbrick.s3.amazonaws.com/Warriors+Overhead.jpg'
      },
      {
        spotId: 5,
        url: 'https://airballnbrick.s3.amazonaws.com/No+Net+Nation+1.jpeg'
      },
      {
        spotId: 5,
        url: 'https://airballnbrick.s3.amazonaws.com/No+Net+Nation+2.jpg'
      },
      {
        spotId: 5,
        url: 'https://airballnbrick.s3.amazonaws.com/No+Net+Nation+3.jpg'
      },
      {
        spotId: 5,
        url: 'https://airballnbrick.s3.amazonaws.com/No+Net+Nation+4.jpeg'
      },
      {
        spotId: 5,
        url: 'https://airballnbrick.s3.amazonaws.com/No+Net+Nation+5.jpg'
      },
      {
        spotId: 6,
        url: 'https://airballnbrick.s3.amazonaws.com/Mavs+Court.jpg'
      },
      {
        spotId: 6,
        url: 'https://airballnbrick.s3.amazonaws.com/American+Airlines+Center.jpg'
      },
      {
        spotId: 6,
        url: 'https://airballnbrick.s3.amazonaws.com/Mavs+Hoop.jpg'
      },
      {
        spotId: 6,
        url: 'https://airballnbrick.s3.amazonaws.com/Mavs+Court+Logo.jpg'
      },
      {
        spotId: 6,
        url: 'https://airballnbrick.s3.amazonaws.com/Mavs+Overhead.webp'
      },
      {
        spotId: 7,
        url: 'https://airballnbrick.s3.amazonaws.com/Rucker+Park+1.jpg'
      },
      {
        spotId: 7,
        url: 'https://airballnbrick.s3.amazonaws.com/Rucker+Park+2.jpg'
      },
      {
        spotId: 7,
        url: 'https://airballnbrick.s3.amazonaws.com/Rucker+Park+3.jpg'
      },
      {
        spotId: 7,
        url: 'https://airballnbrick.s3.amazonaws.com/Rucker+Park+4.webp'
      },
      {
        spotId: 7,
        url: 'https://airballnbrick.s3.amazonaws.com/Rucker+Park+5.jpeg'
      },
      {
        spotId: 8,
        url: 'https://airballnbrick.s3.amazonaws.com/Knicks+Arena.jpg'
      },
      {
        spotId: 8,
        url: 'https://airballnbrick.s3.amazonaws.com/Madison+Square+Garden.jpg'
      },
      {
        spotId: 8,
        url: 'https://airballnbrick.s3.amazonaws.com/Knicks+Hoop.jpg'
      },
      {
        spotId: 8,
        url: 'https://airballnbrick.s3.amazonaws.com/Knicks+Court+Logo.jpg'
      },
      {
        spotId: 8,
        url: 'https://airballnbrick.s3.amazonaws.com/Knicks+Overhead.png'
      },
      {
        spotId: 9,
        url: 'https://airballnbrick.s3.amazonaws.com/Bucks+Arena.webp'
      },
      {
        spotId: 9,
        url: 'https://airballnbrick.s3.amazonaws.com/Fiserv+Forum+Arena.jpg'
      },
      {
        spotId: 9,
        url: 'https://airballnbrick.s3.amazonaws.com/Bucks+Sideline.webp'
      },
      {
        spotId: 9,
        url: 'https://airballnbrick.s3.amazonaws.com/Bucks+Hoop.jpg'
      },
      {
        spotId: 9,
        url: 'https://airballnbrick.s3.amazonaws.com/Bucks+Overhead.jpg'
      },
      {
        spotId: 10,
        url: 'https://airballnbrick.s3.amazonaws.com/La+Fitness+1.jpg'
      },
      {
        spotId: 10,
        url: 'https://airballnbrick.s3.amazonaws.com/La+Fitness+2.jpg'
      },
      {
        spotId: 10,
        url: 'https://airballnbrick.s3.amazonaws.com/La+Fitness+3.webp'
      },
      {
        spotId: 10,
        url: 'https://airballnbrick.s3.amazonaws.com/La+Fitness+4.jpg'
      },
      {
        spotId: 10,
        url: 'https://airballnbrick.s3.amazonaws.com/La+Fitness+5.jpg'
      },
      {
        spotId: 11,
        url: "https://airballnbrick.s3.amazonaws.com/Jordan's+Yacht+1.jpg"
      },
      {
        spotId: 11,
        url: "https://airballnbrick.s3.amazonaws.com/Jordan's+Yacht+2.webp"
      },
      {
        spotId: 11,
        url: "https://airballnbrick.s3.amazonaws.com/Jordan's+Yacht+3.webp"
      },
      {
        spotId: 11,
        url: "https://airballnbrick.s3.amazonaws.com/Jordan's+Yacht+4.webp"
      },
      {
        spotId: 11,
        url: "https://airballnbrick.s3.amazonaws.com/Jordan's+Yacht+5.webp"
      },
      {
        spotId: 12,
        url: 'https://airballnbrick.s3.amazonaws.com/Kings+Chain+Court+1.jpeg'
      },
      {
        spotId: 12,
        url: 'https://airballnbrick.s3.amazonaws.com/Kings+Chain+Court+2.jpg'
      },
      {
        spotId: 12,
        url: 'https://airballnbrick.s3.amazonaws.com/Kings+Chain+Court+3.jpeg'
      },
      {
        spotId: 12,
        url: 'https://airballnbrick.s3.amazonaws.com/Kings+Chain+Court+4.jpg'
      },
      {
        spotId: 12,
        url: 'https://airballnbrick.s3.amazonaws.com/Kings+Chain+Court+5.jpg'
      },
      {
        spotId: 13,
        url: 'https://airballnbrick.s3.amazonaws.com/Palms+Court+1.jpg'
      },
      {
        spotId: 13,
        url: 'https://airballnbrick.s3.amazonaws.com/Palms+Court+2.jpg'
      },
      {
        spotId: 13,
        url: 'https://airballnbrick.s3.amazonaws.com/Palms+Court+3.jpg'
      },
      {
        spotId: 13,
        url: 'https://airballnbrick.s3.amazonaws.com/Palms+Court+4.jpg'
      },
      {
        spotId: 13,
        url: 'https://airballnbrick.s3.amazonaws.com/Palms+Court+5.jpg'
      },
      {
        spotId: 14,
        url: 'https://airballnbrick.s3.amazonaws.com/Double+Trouble+1.jpg'
      },
      {
        spotId: 14,
        url: 'https://airballnbrick.s3.amazonaws.com/Double+Trouble+2.jpg'
      },
      {
        spotId: 14,
        url: 'https://airballnbrick.s3.amazonaws.com/Double+Trouble+3.jpg'
      },
      {
        spotId: 14,
        url: 'https://airballnbrick.s3.amazonaws.com/Double+Trouble+4.jpg'
      },
      {
        spotId: 14,
        url: 'https://airballnbrick.s3.amazonaws.com/Double+Trouble+5.jpg'
      },
      {
        spotId: 15,
        url: 'https://airballnbrick.s3.amazonaws.com/OVO+1.jpg'
      },
      {
        spotId: 15,
        url: 'https://airballnbrick.s3.amazonaws.com/OVO+2.jpg'
      },
      {
        spotId: 15,
        url: 'https://airballnbrick.s3.amazonaws.com/OVO+3.jpg'
      },
      {
        spotId: 15,
        url: 'https://airballnbrick.s3.amazonaws.com/OVO+4.png'
      },
      {
        spotId: 15,
        url: 'https://airballnbrick.s3.amazonaws.com/OVO+5.jpg'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Images', null, {});
  }
};
