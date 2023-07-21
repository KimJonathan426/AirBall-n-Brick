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
    return queryInterface.bulkInsert('Amenities', [
      {
        name: 'Basketball',
        url: 'https://airballnbrick.s3.amazonaws.com/basketball.svg',
        type: 'basic'
      },
      {
        name: 'Wifi',
        url: 'https://airballnbrick.s3.amazonaws.com/wifi.svg',
        type: 'basic'
      },
      {
        name: 'Water',
        url: 'https://airballnbrick.s3.amazonaws.com/water.svg',
        type: 'basic'
      },
      {
        name: 'Air conditioning',
        url: 'https://airballnbrick.s3.amazonaws.com/air-conditioning.svg',
        type: 'basic'
      },
      {
        name: 'Free parking on premises',
        url: 'https://airballnbrick.s3.amazonaws.com/free-parking.svg',
        type: 'basic'
      },
      {
        name: 'Paid parking on premises',
        url: 'https://airballnbrick.s3.amazonaws.com/paid-parking.svg',
        type: 'basic'
      },
      {
        name: 'Benches / Bleachers',
        url: 'https://airballnbrick.s3.amazonaws.com/bench.svg',
        type: 'basic'
      },
      {
        name: 'Lighting',
        url: 'https://airballnbrick.s3.amazonaws.com/lighting.svg',
        type: 'basic'
      },
      {
        name: 'Locker room',
        url: 'https://airballnbrick.s3.amazonaws.com/locker-room.svg',
        type: 'standout'
      },
      {
        name: 'Scoreboard',
        url: 'https://airballnbrick.s3.amazonaws.com/scoreboard.svg',
        type: 'standout'
      },
      {
        name: 'Dedicated scorers table',
        url: 'https://airballnbrick.s3.amazonaws.com/scorers-table.svg',
        type: 'standout'
      },
      {
        name: 'Referee',
        url: 'https://airballnbrick.s3.amazonaws.com/referee.svg',
        type: 'standout'
      },
      {
        name: 'Pool',
        url: 'https://airballnbrick.s3.amazonaws.com/pool.svg',
        type: 'standout'
      },
      {
        name: 'Hot tub',
        url: 'https://airballnbrick.s3.amazonaws.com/hot-tub.svg',
        type: 'standout'
      },
      {
        name: 'Shower',
        url: 'https://airballnbrick.s3.amazonaws.com/shower.svg',
        type: 'standout'
      },
      {
        name: 'Exercise equipment',
        url: 'https://airballnbrick.s3.amazonaws.com/exercise-equipment.svg',
        type: 'standout'
      },
      {
        name: 'BBQ grill',
        url: 'https://airballnbrick.s3.amazonaws.com/bbq-grill.svg',
        type: 'standout'
      },
      {
        name: 'Outdoor dining area',
        url: 'https://airballnbrick.s3.amazonaws.com/outdoor-dining.svg',
        type: 'standout'
      },
      {
        name: 'Playground',
        url: 'https://airballnbrick.s3.amazonaws.com/playground.svg',
        type: 'standout'
      },
      {
        name: 'Smoke alarm',
        url: 'https://airballnbrick.s3.amazonaws.com/smoke-alarm.svg',
        type: 'safety'
      },
      {
        name: 'First aid kit',
        url: 'https://airballnbrick.s3.amazonaws.com/first-aid.svg',
        type: 'safety'
      },
      {
        name: 'Fire extinguisher',
        url: 'https://airballnbrick.s3.amazonaws.com/fire-extinguisher.svg',
        type: 'safety'
      },
      {
        name: 'Kinesio tape',
        url: 'https://airballnbrick.s3.amazonaws.com/tape.svg',
        type: 'safety'
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
    return queryInterface.bulkDelete('Amenities', null, {});
  }
};
