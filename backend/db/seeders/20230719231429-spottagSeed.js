'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      */
    return queryInterface.bulkInsert('SpotTags', [
      { spotId: 1, tagId: 1 },
      { spotId: 1, tagId: 3 },
      { spotId: 1, tagId: 8 },
      { spotId: 1, tagId: 10 },
      { spotId: 1, tagId: 13 },
      { spotId: 2, tagId: 1 },
      { spotId: 2, tagId: 3 },
      { spotId: 2, tagId: 8 },
      { spotId: 2, tagId: 10 },
      { spotId: 2, tagId: 13 },
      { spotId: 3, tagId: 1 },
      { spotId: 3, tagId: 3 },
      { spotId: 3, tagId: 8 },
      { spotId: 3, tagId: 10 },
      { spotId: 3, tagId: 13 },
      { spotId: 4, tagId: 1 },
      { spotId: 4, tagId: 3 },
      { spotId: 4, tagId: 8 },
      { spotId: 4, tagId: 10 },
      { spotId: 4, tagId: 13 },
      { spotId: 5, tagId: 2 },
      { spotId: 5, tagId: 7 },
      { spotId: 5, tagId: 12 },
      { spotId: 6, tagId: 1 },
      { spotId: 6, tagId: 3 },
      { spotId: 6, tagId: 8 },
      { spotId: 6, tagId: 10 },
      { spotId: 6, tagId: 13 },
      { spotId: 7, tagId: 2 },
      { spotId: 7, tagId: 5 },
      { spotId: 7, tagId: 7 },
      { spotId: 7, tagId: 10 },
      { spotId: 8, tagId: 1 },
      { spotId: 8, tagId: 3 },
      { spotId: 8, tagId: 8 },
      { spotId: 8, tagId: 10 },
      { spotId: 8, tagId: 13 },
      { spotId: 9, tagId: 1 },
      { spotId: 9, tagId: 3 },
      { spotId: 9, tagId: 8 },
      { spotId: 9, tagId: 10 },
      { spotId: 9, tagId: 13 },
      { spotId: 10, tagId: 1 },
      { spotId: 10, tagId: 4 },
      { spotId: 10, tagId: 6 },
      { spotId: 10, tagId: 10 },
      { spotId: 11, tagId: 2 },
      { spotId: 12, tagId: 2 },
      { spotId: 12, tagId: 11 },
      { spotId: 13, tagId: 2 },
      { spotId: 13, tagId: 5 },
      { spotId: 14, tagId: 2 },
      { spotId: 14, tagId: 5 },
      { spotId: 14, tagId: 9 },
      { spotId: 15, tagId: 1 },
      { spotId: 15, tagId: 8 },
      { spotId: 15, tagId: 10 },
      { spotId: 15, tagId: 13 },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete('SpotTags', null, {});
  }
};
