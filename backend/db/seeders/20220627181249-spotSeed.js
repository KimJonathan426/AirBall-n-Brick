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
        zipcode: '44115',
        country: 'United States of America',
        lat: 41.4966751,
        lng: -81.6893259,
        showSpecific: true,
        name: 'Cleveland Cavaliers Arena - Rocket Mortgage FieldHouse',
        description: "Rocket Mortgage FieldHouse is a multi-purpose arena in Cleveland, Ohio. The building is the home of the Cleveland Cavaliers of the National Basketball Association and the Cleveland Monsters of the American Hockey League. It also serves as a secondary arena for Cleveland State Vikings men's and women's basketball.",
        type: 'full',
        price: 60000
      },
      {
        userId: 5,
        address: '601 Biscayna Blvd',
        city: 'Miami',
        state: 'Florida',
        zipcode: '33132',
        country: 'United States of America',
        lat: 25.7812299,
        lng: -80.1878552,
        showSpecific: true,
        name: 'Miami Heat Arena - FTX Arena',
        description: 'The FTX Arena is a multi-purpose arena located in Miami, Florida, along Biscayne Bay. It was constructed beginning in 1998 as a replacement for the Miami Arena and designed by the architecture firms Arquitectonica and 360 Architecture. The arena is home to the Miami Heat of the National Basketball Association.',
        type: 'full',
        price: 80000
      },
      {
        userId: 5,
        address: '1111 S Figueroa St',
        city: 'Los Angeles',
        state: 'California',
        zipcode: '90015',
        country: 'United States of America',
        lat: 34.0424147,
        lng: -118.2660697,
        showSpecific: true,
        name: 'Los Angeles Lakers & Clippers Arena - Crypto.com Arena',
        description: 'Crypto.com Arena is a multi-purpose arena in Downtown Los Angeles. Adjacent to the L.A. Live development, it is located next to the Los Angeles Convention Center complex along Figueroa Street.',
        type: 'full',
        price: 100000
      },
      {
        userId: 6,
        address: '1 Warriors Way',
        city: 'San Francisco',
        state: 'California',
        zipcode: '94158',
        country: 'United States of America',
        lat: 37.7680183,
        lng: -122.3878772,
        showSpecific: true,
        name: 'Golden State Warriors Arena - Chase Center',
        description: "Chase Center is an indoor arena in the Mission Bay neighborhood of San Francisco, California. The building is the home venue for the Golden State Warriors of the National Basketball Association and occasionally for San Francisco Dons men's basketball.",
        type: 'full',
        price: 100000
      },
      {
        userId: 6,
        address: '4109 Lose Plaza',
        city: 'Denver',
        state: 'Colorado',
        zipcode: '80014',
        country: 'United States of America',
        lat: 39.7392358,
        lng: -104.990251,
        showSpecific: false,
        name: 'No Net Nation',
        description: 'Have you ever wanted to make a basket but also miss at the same time? This is the court for you! Without a net on the rim, you and the other players will constantly wonder whether or not you "swished" it or completely airballed! This court is fully functioning, even without a net!',
        type: 'share',
        price: 20
      },
      {
        userId: 7,
        address: '2500 Victory Avenue',
        city: 'Dallas',
        state: 'Texas',
        zipcode: '75219',
        country: 'United States of America',
        lat: 32.7903143,
        lng: -96.810148,
        showSpecific: true,
        name: 'Dallas Mavericks Arena - American Airlines Center',
        description: 'The American Airlines Center is a multi-purpose arena located in the Victory Park neighborhood in downtown Dallas, Texas. The arena serves as the home of the Dallas Mavericks of the National Basketball Association and the Dallas Stars of the National Hockey League.',
        type: 'full',
        price: 60000
      },
      {
        userId: 7,
        address: '280 W 155th St',
        city: 'New York City',
        state: 'New York',
        zipcode: '10039',
        country: 'United States of America',
        lat: 40.8290326,
        lng: -73.9371754,
        showSpecific: true,
        name: 'Rucker Park',
        description: 'Greg Marius Court at Holcombe Rucker Park is a basketball court in Harlem, Manhattan, New York City, at 155th Street and Frederick Douglass Boulevard, just east of the former Polo Grounds site. Rucker Park is the most famous basketball court and all types of players from professionals to amateurs all gather to showcase their talents.',
        type: 'share',
        price: 1000
      },
      {
        userId: 8,
        address: '4 Pennsylvania Plaza',
        city: 'New York City',
        state: 'New York',
        zipcode: '10001',
        country: 'United States of America',
        lat: 40.7505621,
        lng: -73.99347089999999,
        showSpecific: true,
        name: 'Madison Square Garden',
        description: 'Madison Square Garden, colloquially known as The Garden or by its initials MSG, is a multi-purpose indoor arena in New York City. It is located in Midtown Manhattan between Seventh and Eighth avenues from 31st to 33rd Street, above Pennsylvania Station. The arena serves as the home of the New York Knicks of the National Basketball Association.',
        type: 'full',
        price: 150000
      },
      {
        userId: 9,
        address: '1111 Vel R. Phillips Ave',
        city: 'Milwaukee',
        state: 'Wisconsin',
        zipcode: '53203',
        country: 'United States of America',
        lat: 43.0449654,
        lng: -87.91716369999999,
        showSpecific: true,
        name: 'Milwaukee Bucks Arena - Fiserv Forum',
        description: 'Fiserv Forum is a multi-purpose arena located in downtown Milwaukee, Wisconsin. It is the home of the Milwaukee Bucks of the National Basketball Association.',
        type: 'full',
        price: 50000
      },
      {
        userId: 9,
        address: '2600 Michelson Drive',
        city: 'Irvine',
        state: 'California',
        zipcode: '92612',
        country: 'United States of America',
        lat: 33.6737404,
        lng: -117.8502828,
        showSpecific: false,
        name: 'La Fitness Gym Court',
        description: 'LA Fitness is an American gym chain with more than 700 clubs across the United States and Canada. Every location provides a fully maintained basketball court accessible from open to close to all of our members!',
        type: 'share',
        price: 49
      },
      {
        userId: 10,
        address: '415 W. Ocean Blvd',
        city: 'Long Beach',
        state: 'California',
        zipcode: '90802',
        country: 'United States of America',
        lat: 33.7676597,
        lng: -118.1969456,
        showSpecific: false,
        name: "Michael Jordan's Private Yacht w/ Basketball Court",
        description: "Michael Jordan's $80 million Yacht comes with basketball court! Cruise the ocean and take in the views while you sink in some shots.",
        type: 'half',
        price: 175000
      },
      {
        userId: 12,
        address: '401 Watkins Pong Boulevard',
        city: 'Rockville',
        state: 'Maryland',
        zipcode: '20850',
        country: 'United States of America',
        lat: 39.1110282,
        lng: -77.16685,
        showSpecific: false,
        name: 'Kings Chain Court',
        description: 'This is a standard basketball court with a chain net. For when you are tired of the standard nylon swish, the chain clank hits different.',
        type: 'share',
        price: 99
      },
      {
        userId: 12,
        address: '404 Knot Pound Avenue',
        city: 'Tortilla',
        state: 'North Carolina',
        zipcode: '28375',
        country: 'United States of America',
        lat: 35.7595731,
        lng: -79.01929969999999,
        showSpecific: false,
        name: 'Palms Court',
        description: 'Experience the joys of playing basketball in a vastly open environment surrounded by palm trees. Best experienced right before the sun sets!',
        type: 'full',
        price: 149
      },
      {
        userId: 12,
        address: "200 O'Kaymens Drive",
        city: 'Portland',
        state: 'Oregon',
        zipcode: '97035',
        country: 'United States of America',
        lat: 45.515232,
        lng: -122.6783853,
        showSpecific: false,
        name: 'Double Trouble',
        description: 'This court is perfect for players looking to practice their shots. No one likes hitting the rim, so why reward yourself with a made basket from a lucky bounce? With our courts double rim, players will now be unable to make a shot that is not a perfect swish!',
        type: 'half',
        price: 75
      },
      {
        userId: 13,
        address: '319 Main Road',
        city: "Arnold's Cove",
        state: 'Newfoundland and Labrador',
        zipcode: 'A0B 1A0',
        country: 'Canada',
        lat: 47.7601686,
        lng: -53.98567389999999,
        showSpecific: false,
        name: 'OVO Private Court',
        description: "October's Very Own, Drake, opens his near-NBA regulation-size court with custom designs to the public. Shoot from the balcony overseeing the court or take a break from hooping and grab a drink at the bar.",
        type: 'full',
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
