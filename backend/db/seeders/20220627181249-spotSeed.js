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
        description: "Rocket Mortgage FieldHouse is a multi-purpose arena in Cleveland, Ohio. The building is the home of the Cleveland Cavaliers of the National Basketball Association and the Cleveland Monsters of the American Hockey League. It also serves as a secondary arena for Cleveland State Vikings men's and women's basketball.",
        price: 60000
      },
      {
        userId: 5,
        address: '601 Biscayna Blvd',
        city: 'Miami',
        state: 'Florida',
        country: 'United States of America',
        name: 'Miami Heat Arena - FTX Arena',
        description: 'The FTX Arena is a multi-purpose arena located in Miami, Florida, along Biscayne Bay. It was constructed beginning in 1998 as a replacement for the Miami Arena and designed by the architecture firms Arquitectonica and 360 Architecture. The arena is home to the Miami Heat of the National Basketball Association.',
        price: 80000
      },
      {
        userId: 5,
        address: '1111 S Figueroa St',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States of America',
        name: 'Los Angeles Lakers & Clippers Arena - Crypto.com Arena',
        description: 'Crypto.com Arena is a multi-purpose arena in Downtown Los Angeles. Adjacent to the L.A. Live development, it is located next to the Los Angeles Convention Center complex along Figueroa Street.',
        price: 100000
      },
      {
        userId: 6,
        address: '1 Warriors Way',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        name: 'Golden State Warriors Arena - Chase Center',
        description: "Chase Center is an indoor arena in the Mission Bay neighborhood of San Francisco, California. The building is the home venue for the Golden State Warriors of the National Basketball Association and occasionally for San Francisco Dons men's basketball.",
        price: 100000
      },
      {
        userId: 6,
        address: '4109 Lose Plaza',
        city: 'Denver',
        state: 'Colorado',
        country: 'United States of America',
        name: 'No Net Nation',
        description: 'Have you ever wanted to make a basket but also miss at the same time? This is the court for you! Without a net on the rim, you and the other players will constantly wonder whether or not you "swished" it or completely airballed! This court is fully functioning, even without a net!',
        price: 20
      },
      {
        userId: 7,
        address: '2500 Victory Avenue',
        city: 'Dallas',
        state: 'Texas',
        country: 'United States of America',
        name: 'Dallas Mavericks Arena - American Airlines Center',
        description: 'The American Airlines Center is a multi-purpose arena located in the Victory Park neighborhood in downtown Dallas, Texas. The arena serves as the home of the Dallas Mavericks of the National Basketball Association and the Dallas Stars of the National Hockey League.',
        price: 60000
      },
      {
        userId: 7,
        address: '280 W 155th St',
        city: 'New York City',
        state: 'New York',
        country: 'United States of America',
        name: 'Rucker Park',
        description: 'Greg Marius Court at Holcombe Rucker Park is a basketball court in Harlem, Manhattan, New York City, at 155th Street and Frederick Douglass Boulevard, just east of the former Polo Grounds site. Rucker Park is the most famous basketball court and all types of players from professionals to amateurs all gather to showcase their talents.',
        price: 1000
      },
      {
        userId: 8,
        address: '4 Pennsylvania Plaza',
        city: 'New York City',
        state: 'New York',
        country: 'United States of America',
        name: 'Madison Square Garden',
        description: 'Madison Square Garden, colloquially known as The Garden or by its initials MSG, is a multi-purpose indoor arena in New York City. It is located in Midtown Manhattan between Seventh and Eighth avenues from 31st to 33rd Street, above Pennsylvania Station. The arena serves as the home of the New York Knicks of the National Basketball Association.',
        price: 150000
      },
      {
        userId: 9,
        address: '1111 Vel R. Phillips Ave',
        city: 'Milwaukee',
        state: 'Wisconsin',
        country: 'United States of America',
        name: 'Milwaukee Bucks Arena - Fiserv Forum',
        description: 'Fiserv Forum is a multi-purpose arena located in downtown Milwaukee, Wisconsin. It is the home of the Milwaukee Bucks of the National Basketball Association.',
        price: 50000
      },
      {
        userId: 9,
        address: '2600 Michelson Drive',
        city: 'Irvine',
        state: 'California',
        country: 'United States of America',
        name: 'La Fitness Gym Court',
        description: 'LA Fitness is an American gym chain with more than 700 clubs across the United States and Canada. Every location provides a fully maintained basketball court accessible from open to close to all of our members!',
        price: 49
      },
      {
        userId: 10,
        address: '415 W. Ocean Blvd',
        city: 'Long Beach',
        state: 'California',
        country: 'United States of America',
        name: "Port of Long Beach, Michael Jordan's Private Yacht w/ Basketball Court",
        description: "Michael Jordan's $80 million Yacht comes with basketball court! Cruise the ocean and take in the views while you sink in some shots.",
        price: 175000
      },
      {
        userId: 12,
        address: '31 Court Lane',
        city: 'Rockville',
        state: 'Maryland',
        country: 'United States of America',
        name: 'Kings Chain Court',
        description: 'This is a standard basketball court with a chain net. For when you are tired of the standard nylon swish, the chain clank hits different.',
        price: 99
      },
      {
        userId: 12,
        address: '404 Knot Pound Avenue',
        city: 'Tortilla',
        state: 'North Carolina',
        country: 'United States of America',
        name: 'Palms Court',
        description: 'Experience the joys of playing basketball in a vastly open environment surrounded by palm trees. Best experienced right before the sun sets!',
        price: 149
      },
      {
        userId: 12,
        address: "200 O'Kaymens Drive",
        city: 'Lapu',
        state: 'Oregon',
        country: 'United States of America',
        name: 'Double Trouble',
        description: 'This court is perfect for players looking to practice their shots. No one likes hitting the rim, so why reward yourself with a made basket from a lucky bounce? With our courts double rim, players will now be unable to make a shot that isnt a perfect swish!',
        price: 75
      },
      {
        userId: 13,
        address: 'OVO House Lane',
        city: 'Toronto',
        state: 'Ontario',
        country: 'Canada',
        name: 'OVO Private Court',
        description: "October's Very Own, Drake, opens his near-NBA regulation-size court with custom designs to the public. Shoot from the balcony overseeing the court or take a break from hooping and grab a drink at the bar.",
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
