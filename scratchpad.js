const axios = require('axios');
// const fetch = require('node-fetch')

// const animalCrossingUrl = `https://acnhapi.com/v1/`
// axios.get(animalCrossingUrl).then(response => {
//     let data = 
// })

// axios.get('https://acnhapi.com/v1/houseware') 
//   .then(response => {
//       let data = response.data
//       let itemResults = [];
//     //   console.log(data)

//     for(let i = 0; i < data.length; i++) {
//         let item = data[i];
//         const itemData = {};
//         let name = item.name['name-USen']
//         console.log('name: ', name)
//     }
//   })
//   .catch(error => {
//       console.log(error)
//   })


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
        console.log(itemData)
        itemResults.push(itemData);
      })
      console.log(itemResults)

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

  fetchData();