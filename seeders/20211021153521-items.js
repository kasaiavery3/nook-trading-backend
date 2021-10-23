'use strict';
const axios = require('axios');
const fetchData = async () => {
  try {
    const {data} = await axios.get('https://acnhapi.com/v1/houseware');
    let itemResults = [];
  
    const items = Object.keys(data);

    items.forEach(element => {
      const item = data[element][0]
      const itemData = {};
      // console.log(item.name);
      let name = item.name['name-USen']
      let price = item['buy-price']
      let shop = item['source']
      let image = item['image_uri']
      // console.log(image)
      itemData.name = name;
      itemData.price = price;
      itemData.shop = shop;
      itemData.image = image;
      itemData.createdAt = new Date();
      itemData.updatedAt = new Date();
      // console.log(itemData)
      itemResults.push(itemData);
      // console.log(itemResults)
    })
    return itemResults;

    // items.forEach(item => {
    //   console.log(data[item])
    // })

  // data.forEach(item => {
  //   console.log('We have entered the forEach block');
  // })

    // for (let i = 0; i < response.data.length; i++) {
    //   console.log('Hello we are in the for loop');
    //   const item = response.data[i];

    //   console.log(item.name);
    // }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const items = await fetchData();
    await queryInterface.bulkInsert('Items', items, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Items', null, {});
  }
};
