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
        review: 'It was such a great experience to play in the same court as the GOAT lebron did. I could feel the energy from the ring he brought the cavs boosting my shot percentage',
        rating: 5,
      },
        {
        userId: 1,
        spotId: 1,
        review: 'I had tried the court again but am deducting one star due to the price. Its too expensive!',
        rating: 4,
      },
        {
        userId: 2,
        spotId: 1,
        review: 'Can you believe they did not have their own basketballs at the facility? I am paying 60000 dollars for a bring your own ball court? They did not even let me tour the entire facility and go in the locker rooms... 1 STAR!!',
        rating: 1,
      },
        {
        userId: 5,
        spotId: 1,
        review: 'What a great court, a once in a lifetime experience. I shot 100% from the field when I was here. I felt like I was in the NBA.',
        rating: 5,
      },
        {
        userId: 5,
        spotId: 2,
        review: "The court just isn't the same since the D Wade, Bosh, and LeBron era. They changed up the design of the court and it just doesn't feel authentic playing on this court.",
        rating: 2,
      },
        {
        userId: 13,
        spotId: 2,
        review: "It was ight, my private court is better. This court has nothing on the raptors arena... LET'S GO RAPTORS",
        rating: 2,
      },
        {
        userId: 7,
        spotId: 3,
        review: "This court felt nice. I was hitting fade aways in honor of Kobe.",
        rating: 4,
      },
        {
        userId: 9,
        spotId: 3,
        review: "Not worth the price. The court was a little overrated in my opinion. Don't even get me started on the traffic on the way here...",
        rating: 3,
      },
        {
        userId: 6,
        spotId: 3,
        review: "Warriors > Lakers",
        rating: 1,
      },
        {
        userId: 6,
        spotId: 3,
        review: "Curry > Lebron",
        rating: 1,
      },
        {
        userId: 6,
        spotId: 4,
        review: "I was hitting 3's left and right. This court feels so good. Everything is so clean and new since they just switched arenas back in 2019.",
        rating: 5,
      },
        {
        userId: 8,
        spotId: 4,
        review: "I miss the old arena. this court just doesn't feel the same.",
        rating: 3,
      },
        {
        userId: 5,
        spotId: 4,
        review: "LeBron > Curry",
        rating: 2,
      },
        {
        userId: 12,
        spotId: 5,
        review: "This court is so run down... first of all it doesn't even have a net. How am I supposed to know if I make my shots or not. There are so many cracks in the concrete. Sometimes when I dribbe, the ball bounces off the floor at a 30 degree angle to the sidelines. Would not recommend this court what so ever to anyone.",
        rating: 1,
      },
        {
        userId: 7,
        spotId: 6,
        review: "The court was clean and maintained. The color scheme is nice and it isnt as expensive as the other offical arenas. Would recommend 100%",
        rating: 5,
      },
        {
        userId: 9,
        spotId: 7,
        review: "It was impossible to try to get in a game before. Now with this site, I was able to host my own games on the court without the hassle of waiting ages. There are still a lot of people surrounding the court even though you rent it out. But thats what you sign up for at one of the most popular courts in America.",
        rating: 5,
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
