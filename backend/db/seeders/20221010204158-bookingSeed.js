'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 3);

   return queryInterface.bulkInsert('Bookings', [{
     userId: 1,
     spotId: 1,
     startDate: new Date(),
     endDate: futureDate
   }], {});
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
