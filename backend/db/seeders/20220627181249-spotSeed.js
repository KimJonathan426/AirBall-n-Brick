'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Spots', [
      {
        userId: 5,
        address: '1 Center Court',
        city: 'Cleveland',
        state: 'Ohio',
        country: 'United States of America',
        name: 'Cleveland Cavaliers Arena - Rocket Mortgage FieldHouse',
        price: 60000
      },
      {
        userId: 5,
        address: '601 Biscayna Blvd',
        city: 'Miami',
        state: 'Florida',
        country: 'United States of America',
        name: 'Miami Heat Arena - FTX Arena',
        price: 80000
      },
      {
        userId: 5,
        address: '1111 S Figueroa St',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States of America',
        name: 'Los Angeles Lakers & Clippers Arena - Crypto.com Arena',
        price: 100000
      },
      {
        userId: 6,
        address: '1 Warriors Way',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        name: 'Golden State Warriors Arena - Chase Center',
        price: 100000
      },
      {
        userId: 6,
        address: '4109 Lose Plaza',
        city: 'Denver',
        state: 'Colorado',
        country: 'United States of America',
        name: 'No Net Nation',
        price: 20
      },
      {
        userId: 7,
        address: '2500 Victory Avenue',
        city: 'Dallas',
        state: 'Texas',
        country: 'United States of America',
        name: 'Dallas Mavericks Arena - American Airlines Center',
        price: 60000
      },
      {
        userId: 8,
        address: '4 Pennsylvania Plaza',
        city: 'New York City',
        state: 'New York',
        country: 'United States of America',
        name: 'Madison Square Garden',
        price: 150000
      },
      {
        userId: 9,
        address: '1111 Vel R. Phillips Ave',
        city: 'Milwaukee',
        state: 'Wisconsin',
        country: 'United States of America',
        name: 'Milwaukee Bucks Arena - Fiserv Forum',
        price: 50000
      },
      {
        userId: 9,
        address: '2600 Michelson Drive',
        city: 'Irvine',
        state: 'California',
        country: 'United States of America',
        name: 'La Fitness Gym Court',
        price: 49
      },
      {
        userId: 10,
        address: '415 W. Ocean Blvd',
        city: 'Long Beach',
        state: 'California',
        country: 'United States of America',
        name: 'Port of Long Beach, Michael Jordans Private Yacht w/ Basketball Court',
        price: 175000
      },
      {
        userId: 12,
        address: '31 Court Lane',
        city: 'Rockville',
        state: 'Maryland',
        country: 'United States of America',
        name: 'Kings Court',
        price: 99
      },
      {
        userId: 12,
        address: '404 Knot Pound Avenue',
        city: 'Tortilla',
        state: 'Virginia',
        country: 'United States of America',
        name: 'Palms Court',
        price: 149
      },
      {
        userId: 12,
        address: "200 O'Kaymens Drive",
        city: 'Lapu',
        state: 'Oregon',
        country: 'United States of America',
        name: 'Double Trouble',
        price: 75
      },
      {
        userId: 13,
        address: 'OVO House Lane',
        city: 'Toronto',
        state: 'Ontario',
        country: 'Canada',
        name: 'Drakes Private Court',
        price: 125000
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Spots', null, {});
  }
};
