'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    // const futureDate = new Date();
    // futureDate.setDate(futureDate.getDate() + 3);

   return queryInterface.bulkInsert('Bookings', [
  //   {
  //    userId: 4,
  //    spotId: 1,
  //    startDate: new Date(),
  //    endDate: futureDate,
  //    url: 'https://airballnbrick.s3.amazonaws.com/Cavs+Arena.jpg'
  //  },
   {
    userId: 4,
    spotId: 1,
    startDate: new Date('2020-12-17T00:00:00'),
    endDate: new Date('2020-12-18T00:00:00'),
    url: 'https://airballnbrick.s3.amazonaws.com/Cavs+Arena.jpg'
   },
   {
    userId: 4,
    spotId: 11,
    startDate: new Date('2022-08-02T00:00:00'),
    endDate: new Date('2022-08-10T00:00:00'),
    url: "https://airballnbrick.s3.amazonaws.com/Jordan's+Yacht+1.jpg"
   },
   {
    userId: 4,
    spotId: 15,
    startDate: new Date('2022-10-21T00:00:00'),
    endDate: new Date('2022-11-01T00:00:00'),
    url: "https://airballnbrick.s3.amazonaws.com/OVO+1.jpg"
   },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Bookings', null, {});
  }
};
