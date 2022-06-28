'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Reviews', [
        {
        userId: 1,
        spotId: 1,
        review: 'Review 1',
        rating: 5,
      },
        {
        userId: 1,
        spotId: 1,
        review: 'Review 2',
        rating: 4,
      },
        {
        userId: 2,
        spotId: 1,
        review: 'Review 3',
        rating: 1,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Reviews', null, {});
  }
};
