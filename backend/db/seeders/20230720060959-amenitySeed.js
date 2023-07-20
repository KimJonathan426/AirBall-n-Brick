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
        url: 'https://airballnbrick.s3.amazonaws.com/basketball.svg'
      },
      {
        name: 'Wifi',
        url: 'https://airballnbrick.s3.amazonaws.com/wifi.svg'
      },
      {
        name: 'Water',
        url: 'https://airballnbrick.s3.amazonaws.com/water.svg'
      },
      {
        name: 'Air conditioning',
        url: 'https://airballnbrick.s3.amazonaws.com/air-conditioning.svg'
      },
      {
        name: 'Free parking on premises',
        url: 'https://airballnbrick.s3.amazonaws.com/free-parking.svg'
      },
      {
        name: 'Paid parking on premises',
        url: 'https://airballnbrick.s3.amazonaws.com/paid-parking.svg'
      },
      {
        name: 'Benches / Bleachers',
        url: 'https://airballnbrick.s3.amazonaws.com/bench.svg'
      },
      {
        name: 'Lighting',
        url: 'https://airballnbrick.s3.amazonaws.com/lighting.svg'
      },
      {
        name: 'Locker room',
        url: 'https://airballnbrick.s3.amazonaws.com/locker-room.svg'
      },
      {
        name: 'Scoreboard',
        url: 'https://airballnbrick.s3.amazonaws.com/scoreboard.svg'
      },
      {
        name: 'Dedicated scorers table',
        url: 'https://airballnbrick.s3.amazonaws.com/scorers-table.svg'
      },
      {
        name: 'Referee',
        url: 'https://airballnbrick.s3.amazonaws.com/referee.svg'
      },
      {
        name: 'Pool',
        url: 'https://airballnbrick.s3.amazonaws.com/pool.svg'
      },
      {
        name: 'Hot tub',
        url: 'https://airballnbrick.s3.amazonaws.com/hot-tub.svg'
      },
      {
        name: 'Shower',
        url: 'https://airballnbrick.s3.amazonaws.com/shower.svg'
      },
      {
        name: 'Exercise equipment',
        url: 'https://airballnbrick.s3.amazonaws.com/exercise-equipment.svg'
      },
      {
        name: 'BBQ grill',
        url: 'https://airballnbrick.s3.amazonaws.com/bbq-grill.svg'
      },
      {
        name: 'Outdoor dining area',
        url: 'https://airballnbrick.s3.amazonaws.com/outdoor-dining.svg'
      },
      {
        name: 'Playground',
        url: 'https://airballnbrick.s3.amazonaws.com/playground.svg'
      },
      {
        name: 'Smoke alarm',
        url: 'https://airballnbrick.s3.amazonaws.com/smoke-alarm.svg'
      },
      {
        name: 'First aid kit',
        url: 'https://airballnbrick.s3.amazonaws.com/first-aid.svg'
      },
      {
        name: 'Fire extinguisher',
        url: 'https://airballnbrick.s3.amazonaws.com/fire-extinguisher.svg'
      },
      {
        name: 'Kinesio tape',
        url: 'https://airballnbrick.s3.amazonaws.com/tape.svg'
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
