'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Images', [
      {
        spotId: 1,
        url: 'https://venuecoalition.com/wp-content/uploads/2018/01/Quicken-Loans-Arena-Photo.jpg'
      },
      {
        spotId: 1,
        url: 'https://sporttechie-prod.s3.amazonaws.com/rocket-mortgage-fieldhouse-exterior-1500x1000.png'
      },
      {
        spotId: 1,
        url: 'https://seatgeek.com/images/seatviews/546bfad2-b02c-40cc-9f8b-3498ddd5673a/flat/640x480.jpg'
      },
      {
        spotId: 1,
        url: 'https://media.bleacherreport.com/w_800,h_533,c_fill/br-img-images/003/730/601/hi-res-d1ba93199df7e25250546f0c12f2e2cf_crop_north.jpg'
      },
      {
        spotId: 1,
        url: 'https://cdn.nba.com/teams/legacy/www.nba.com/cavaliers/sites/cavaliers/files/170907-court-758.jpg'
      },
      {
        spotId: 2,
        url: 'https://s.abcnews.com/images/US/american-airlines-arena-gty-aa-200216_hpMain_16x9_992.jpg'
      },
      {
        spotId: 2,
        url: 'https://www.nba.com/resources/static/team/v2/heat/custom-projects/2018-19_Uniforms/imgs/vice-nights-court-1.jpg'
      },
      {
        spotId: 2,
        url: 'https://heatnation.com/wp-content/uploads/2018/11/Capture-e1541539731424.jpg'
      },
      {
        spotId: 2,
        url: 'https://hoopshabit.com/files/2015/09/9288454-nba-playoffs-toronto-raptors-miami-heat.jpg'
      },
      {
        spotId: 2,
        url: 'https://www.nba.com/heat/sites/heat/files/1000_court-viceversa_210510.jpg'
      },
      {
        spotId: 3,
        url: 'https://pbs.twimg.com/media/FHdxS5sWYAgT1X0.jpg'
      },
      {
        spotId: 3,
        url: 'https://ca-times.brightspotcdn.com/dims4/default/f7697cb/2147483647/strip/true/crop/3725x2488+0+0/resize/840x561!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F64%2Fa1%2F3fdb57c541d087567abea78c582d%2Fcrypto.com%20Arena%20Roof%20Rendering_FINAL.jpg'
      },
      {
        spotId: 3,
        url: 'https://ca-times.brightspotcdn.com/dims4/default/0ddfdd3/2147483647/strip/true/crop/4651x3123+0+0/resize/1486x998!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ff2%2Fac%2Fa128710a4f06b10afd0ee327ef86%2Fla-photos-1staff-477390-sp-0131-lakers-blazers19-wjs.jpg'
      },
      {
        spotId: 3,
        url: 'https://4.bp.blogspot.com/-EUDs0MjleBI/UoZz7l2QFeI/AAAAAAAACjE/ISaaWXXIOy8/s1600/nba-2k14-pc-next-gen-court-mod-lakers.jpg'
      },
      {
        spotId: 3,
        url: 'https://cdn11.bigcommerce.com/s-d0a73/images/stencil/1280x1280/products/21577/45046/0084871_nba-los-angeles-lakers-nba-court-large-runner_580__57534.1578102660.jpg'
      },
      {
        spotId: 4,
        url: 'https://cdn-west.sqhk.co/connor/2015/11/gg38q5Y/GoldenStateWarriors-2015.jpg'
      },
      {
        spotId: 4,
        url: 'https://esassoc.com/wp-content/uploads/2021/10/Golden-State-Warriors-01a.jpg'
      },
      {
        spotId: 4,
        url: 'https://netstorage-sportsbrief.akamaized.net/images/b017e602b4e6b3ff.jpg'
      },
      {
        spotId: 4,
        url: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_12/3459817/210325-san-francisco-chase-center-warriors-2019-ac-1056p.jpg'
      },
      {
        spotId: 4,
        url: 'https://www.nbcsports.com/sites/rsnunited/files/archive/assets_article/bayarea/2019/08/23/warriorsprimary.jpg'
      },
      {
        spotId: 5,
        url: 'https://basketballword.com/wp-content/uploads/2020/08/Webp.net-resizeimage-87.jpg'
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/5331961/pexels-photo-5331961.jpeg'
      },
      {
        spotId: 5,
        url: 'https://image1.masterfile.com/getImage/NzAwLTAwMTkzNDg2ZW4uMDAwMDAwMDA=AN7wDm/700-00193486en_Masterfile.jpg'
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/2186255/pexels-photo-2186255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.jpg'
      },
      {
        spotId: 6,
        url: 'https://www.planetsport.com/image-library/og/1600/l/luka-doncic-dallas-mavericks-nba-may2022.jpg'
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_980/v1576518587/photos/259090_original.jpg'
      },
      {
        spotId: 6,
        url: 'https://2.bp.blogspot.com/-qpASKaWzU20/UofZZwppWuI/AAAAAAAAAdM/e27e2NUJNVo/s1600/nba-2k14-dallas-mavericks-hd-court-mod.jpg'
      },
      {
        spotId: 6,
        url: 'https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/lMIeR62v6QDldF70RhizxLwMRgA=/1660x934/smart/filters:no_upscale()/cloudfront-us-east-1.images.arcpublishing.com/dmn/6Y2CFCY75KDF56T33C34I73DDA.jpg'
      },
      {
        spotId: 6,
        url: 'https://images.thdstatic.com/productImages/5a361c34-f038-4551-b66f-b23163363ece/svn/blue-fanmats-sports-rugs-9239-64_600.jpg'
      },
      {
        spotId: 7,
        url: 'https://boardroom.tv/wp-content/uploads/2021/10/20211008-NBPA-RUCKER-JL-84-1280x720.jpg'
      },
      {
        spotId: 7,
        url: 'https://pbs.twimg.com/media/FBRqyk_WQAcAbaZ.jpg'
      },
      {
        spotId: 7,
        url: 'https://www.nycgovparks.org/photo_gallery/full_size/24850.jpg'
      },
      {
        spotId: 7,
        url: 'https://www.knupsports.com/wp-content/uploads/2021/05/Rucker-Park.jpg'
      },
      {
        spotId: 7,
        url: 'https://thesource.com/wp-content/uploads/2021/09/rucker-park.jpeg'
      },
      {
        spotId: 7,
        url: 'https://64.media.tumblr.com/5bb61f9b587726e037e9fca0bc6d5036/tumblr_nj7puqVz6Q1qzyjm6o1_1280.jpg'
      },
      {
        spotId: 7,
        url: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Rucker_Park_%28WTM_wikiWhat_027%29.jpg'
      },
      {
        spotId: 8,
        url: 'https://1.bp.blogspot.com/-NItCAodTIyg/UoaH7RJiAzI/AAAAAAAACkA/Ea32TokOlZk/s1600/nba-2k14-knicks-court-update-HD.jpg'
      },
      {
        spotId: 8,
        url: 'https://img.msg.com/wp-content/uploads/2021/02/BillyJoel_071818_1902_RT-1.jpg'
      },
      {
        spotId: 8,
        url: 'https://media.ceetiz.com/activity/MSGNYC004/thumbnails/642x450/billet-nba-match-knicks-new-york-ceetiz.jpg'
      },
      {
        spotId: 8,
        url: 'https://library.sportingnews.com/styles/facebook_1200x630/s3/2022-01/jeremy-lin_198j1xsq6lfmm1pqmiilm6l79r.jpg?itok=V2lviI2w.jpg'
      },
      {
        spotId: 8,
        url: 'https://www.hispanosnba.com/imagenes/estadios/pistas/Knicks-court.png'
      },
      {
        spotId: 9,
        url: 'https://cdn.nba.com/teams/legacy/www.nba.com/bucks/sites/bucks/files/20150623_bucks_newcourt_gdf_0588.jpg'
      },
      {
        spotId: 9,
        url: 'https://hpro-web-assets.s3.amazonaws.com/insights/uploads/2019/05/Fiserv-Forum.jpg'
      },
      {
        spotId: 9,
        url: 'https://cdn.nba.com/teams/legacy/www.nba.com/bucks/sites/bucks/files/20150623_bucks_newcourt_gdf_0960.jpg'
      },
      {
        spotId: 9,
        url: 'https://www.fiservforum.com/assets/img/milwaukee-bucks-team-header-2b706d35ab.jpg'
      },
      {
        spotId: 9,
        url: 'https://newscdn2.weigelbroadcasting.com/0iHmR-1496443448-57327-blog-8150768_G.jpg'
      },
      {
        spotId: 10,
        url: 'https://www.lafitness.com/Pages/images/slide-img/Image-Rotator-5L.jpg'
      },
      {
        spotId: 10,
        url: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/LA_Fitness_building.jpg'
      },
      {
        spotId: 10,
        url: 'https://patch.com/img/cdn/users/850318/2013/07/raw/d235d137a55edab06bd51e671785e6f1.jpg'
      },
      {
        spotId: 10,
        url: 'https://www.timberlineconstruction.com/wp-content/uploads/construction_firm_mass_health_club_LAFitnessStoughton6-1280x853.jpg'
      },
      {
        spotId: 10,
        url: 'https://www.pinnaclecommercial.us/wp-content/uploads/2017/11/laf16.jpg'
      },
      {
        spotId: 11,
        url: 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2021/12/09/16390802555372.jpg'
      },
      {
        spotId: 11,
        url: 'https://www.thesun.co.uk/wp-content/uploads/2021/12/NINTCHDBPICT000697138362.jpg'
      },
      {
        spotId: 11,
        url: 'https://i0.wp.com/nautica.news/wp-content/uploads/2021/10/5EC0A10D-B7C9-4830-948C-3E5A8ACD84B0.png?resize=696%2C418&ssl=1.jpg'
      },
      {
        spotId: 11,
        url: 'https://i0.wp.com/nautica.news/wp-content/uploads/2021/10/5044CF05-46EE-44D3-8B08-290B3C1D97E4.png?resize=696%2C418&ssl=1.jpg'
      },
      {
        spotId: 11,
        url: 'https://www.thesun.co.uk/wp-content/uploads/2021/12/NINTCHDBPICT000697528859.jpg'
      },
      {
        spotId: 12,
        url: 'https://images.pexels.com/photos/8084838/pexels-photo-8084838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.jpg'
      },
      {
        spotId: 12,
        url: 'https://www.rainbowplaymidwest.com/wp-content/uploads/image2-e1580228540868-1436x533.jpg'
      },
      {
        spotId: 12,
        url: 'https://images.pexels.com/photos/5274530/pexels-photo-5274530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.jpg'
      },
      {
        spotId: 12,
        url: 'https://p0.pikist.com/photos/151/715/basketball-ball-sport-game-competition-play-equipment-basket-leisure.jpg'
      },
      {
        spotId: 13,
        url: 'https://c0.wallpaperflare.com/preview/225/222/575/basketball-court-net-rim.jpg'
      },
      {
        spotId: 13,
        url: 'https://c1.wallpaperflare.com/preview/896/767/643/basketball-court-basketball-backboard-hoop.jpg'
      },
      {
        spotId: 13,
        url: 'https://www.uniquepavingmaterials.com/wp-content/uploads/2022/04/pexels-tom-jackson-2891884-1-1024x683.jpg'
      },
      {
        spotId: 13,
        url: 'https://cityofsantamonica.getbynder.com/m/5db598b84e0e50a0/Standard_Image-Person-Playing-Basketball-on-a-Basketball-Court-With-Palm-Trees-in-the-Background-at-Ocean-View-Park.jpg'
      },
      {
        spotId: 14,
        url: 'https://thumbs.dreamstime.com/b/basketball-hoop-net-basketball-court-bright-blue-sky-arizona-basketball-hoop-146035978.jpg'
      },
      {
        spotId: 14,
        url: 'https://images.squarespace-cdn.com/content/v1/5a9dd1c24cde7acca5cda1e5/1611318570300-FTCKOVGX5HACAPP6NIMX/109009231_748119422609155_8582032060676022828_n.jpg'
      },
      {
        spotId: 14,
        url: 'https://realhoopers.com/wp-content/uploads/2020/11/playing-basketball-double-rim.jpg'
      },
      {
        spotId: 15,
        url: 'https://i.ytimg.com/vi/VUPduqWo7hI/maxresdefault.jpg'
      },
      {
        spotId: 15,
        url: 'https://cdn.vox-cdn.com/thumbor/VjxzIkohLpO1BrHFxxIC4lL3oWg=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19884286/drakehouse.jpg'
      },
      {
        spotId: 15,
        url: 'https://i.pinimg.com/736x/04/1f/01/041f017c8871928c6e624a3fa61a1ec6.jpg'
      },
      {
        spotId: 15,
        url: 'https://shenanigang.com/wp-content/uploads/2019/07/Drake-Court-780x575.png'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Images', null, {});
  }
};
