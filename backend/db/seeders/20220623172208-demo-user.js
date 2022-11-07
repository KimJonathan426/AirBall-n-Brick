'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'fakeuser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'fakeuser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'demouser@email.com',
        username: 'demo user',
        hashedPassword: bcrypt.hashSync('DemoPassword')
      },
      {
        email: 'abel@lebronthegoat.com',
        username: 'abel james',
        hashedPassword: bcrypt.hashSync('Legoat')
      },
      {
        email: 'labbit@babyfaceassassin.com',
        username: 'eddie curry',
        hashedPassword: bcrypt.hashSync('NightNight')
      },
      {
        email: 'dchungster@lukamagic.com',
        username: 'david dončić',
        hashedPassword: bcrypt.hashSync('HadToGetRidOfPorzinger')
      },
      {
        email: 'lynnsane@linning.com',
        username: 'lynnsanity',
        hashedPassword: bcrypt.hashSync('CarmeloRuinedMyCareer')
      },
      {
        email: 'jontan@greekfreak.com',
        username: 'jontantetokounmpo',
        hashedPassword: bcrypt.hashSync('TheHumbleKing')
      },
      {
        email: 'undisputed@gOAT.com',
        username: 'michael jordan',
        hashedPassword: bcrypt.hashSync('Personal')
      },
      {
        email: 'assist@help.com',
        username: 'john stockton',
        hashedPassword: bcrypt.hashSync('AssistsOnAssists')
      },
      {
        email: 'average@joe.com',
        username: 'average player',
        hashedPassword: bcrypt.hashSync('Alright')
      },
      {
        email: 'drizzy@ovo.com',
        username: 'drake',
        hashedPassword: bcrypt.hashSync('Toronto')
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['demo-lition', 'fakeuser1', 'fakeuser2'] }
    }, {});
  }
};
