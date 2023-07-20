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
    return queryInterface.bulkInsert('Tags', [
      {
        name: 'Indoor',
        url: 'https://airballnbrick.s3.amazonaws.com/tag-indoor.png'
      },
      {
        name: 'Outdoor',
        url: 'https://airballnbrick.s3.amazonaws.com/tag-outdoor.png'
      },
      {
        name: 'Stadium',
        url: 'https://airballnbrick.s3.amazonaws.com/tag-stadium.png'
      },
      {
        name: 'Gym',
        url: 'https://airballnbrick.s3.amazonaws.com/tag-gym.png'
      },
      {
        name: 'Blacktop',
        url: 'https://airballnbrick.s3.amazonaws.com/tag-blacktop.png'
      },
      {
        name: 'Wood',
        url: 'https://airballnbrick.s3.amazonaws.com/tag-wood.png'
      },
      {
        name: 'Concrete',
        url: 'https://airballnbrick.s3.amazonaws.com/tag-concrete.png'
      },
      {
        name: 'Vinyl',
        url: 'https://airballnbrick.s3.amazonaws.com/tag-vinyl.png'
      },
      {
        name: 'Double rim',
        url: 'https://airballnbrick.s3.amazonaws.com/tag-double.png'
      },
      {
        name: 'Nylon net',
        url: 'https://airballnbrick.s3.amazonaws.com/tag-nylon.png'
      },
      {
        name: 'Chain net',
        url: 'https://airballnbrick.s3.amazonaws.com/tag-chain.png'
      },
      {
        name: 'No net',
        url: 'https://airballnbrick.s3.amazonaws.com/tag-no-net.png'
      },
      {
        name: 'Adjustable hoop',
        url: 'https://airballnbrick.s3.amazonaws.com/tag-adjustable.png'
      },
      {
        name: 'Mini hoop',
        url: 'https://airballnbrick.s3.amazonaws.com/tag-mini.png'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
