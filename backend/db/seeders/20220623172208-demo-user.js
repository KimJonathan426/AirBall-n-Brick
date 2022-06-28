'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'DemoUser@email.com',
        username: 'Demo User',
        hashedPassword: bcrypt.hashSync('DemoPassword')
      },
      {
        email: 'Abel@LebronTheGOAT.com',
        username: 'Abel James',
        hashedPassword: bcrypt.hashSync('LeGM')
      },
      {
        email: 'Labbit@BabyFaceAssassin.com',
        username: 'Eddie Curry',
        hashedPassword: bcrypt.hashSync('NightNight')
      },
      {
        email: 'dChungster@LukaMagic.com',
        username: 'David Dončić',
        hashedPassword: bcrypt.hashSync('HadToGetRidOfPorzinger')
      },
      {
        email: 'Lynnsane@Linning.com',
        username: 'Lynnsanity',
        hashedPassword: bcrypt.hashSync('CarmeloRuinedMyCareer')
      },
      {
        email: 'Jontan@GreekFreak.com',
        username: 'Jontantetokounmpo',
        hashedPassword: bcrypt.hashSync('TheHumbleKing')
      },
      {
        email: 'Undisputed@GOAT.com',
        username: 'Michael Jordan',
        hashedPassword: bcrypt.hashSync('Personal')
      },
      {
        email: 'Assist@Help.com',
        username: 'John Stockton',
        hashedPassword: bcrypt.hashSync('AssistsOnAssists')
      },
      {
        email: 'Average@Joe.com',
        username: 'Average Player',
        hashedPassword: bcrypt.hashSync('Alright')
      },
      {
        email: 'Drizzy@OVO.com',
        username: 'Drake',
        hashedPassword: bcrypt.hashSync('Toronto')
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
