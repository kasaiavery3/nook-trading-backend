// require('dotenv').config();
const express = require('express');
const router = express.Router();
// const passport = require("../config/ppConfig");
// const md5 = require('md5');
// const axios = require('axios');
// const isLoggedIn = require('../middleware/isLoggedIn');

// let publicKey = process.env.PUBLIC_KEY
// let privateKey = process.env.PRIVATE_KEY
// let SECRET_SESSION = process.env.SECRET_SESSION;
// let ts = new Date().getTime();
// const hash = md5(ts + privateKey + publicKey);
// const animalCrossingUrl = `https://acnhapi.com/v1/houseware`;
const { User, Item } = require('../models');


// Get information on all items
router.get('/', async (req, res) => {
    try {
        const allItems = await Item.findAll({});
        return res.status(200).json({message: "Success", items: allItems});

    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'There was an error, please try again'});
    }
})

// Get information on a specific item using its id
router.get('/:id', async (req, res) => {

})


// router.get("/:idx", async (req, res) => {
//     try {
//         const {data} = await axios.get('https://acnhapi.com/v1/houseware');
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//     }
// });

// router.get("/", (req, res) => {
//     axios.get(`${animalCrossingUrl}`).then(response => {
//         let data = response.data.data.results;
//         console.log(data);
//         let comicResults = []; // we want to push each ComicData into
        
//         for (let i = 0; i < data.length; i++) {
//             let comicBook = data[i];
//             const comicData = {}; // where we want to put the data.
//             let title = comicBook.title;
//             let id = comicBook.id;
//             let description = comicBook.description;
//             let issueNumber = comicBook.issueNumber;
//             if (comicBook.images[0]) {
//                 let path = comicBook.images[0].path;
//                 let extension = comicBook.images[0].extension;
//                 let image = path + '.' + extension;
//                 console.log(image);
//                 comicData.title = title;
//                 comicData.description = description;
//                 comicData.issueNumber = issueNumber;
//                 comicData.image = image;
//                 comicData.id = id;
//             }
//             comicResults.push(comicData);
//         }
//         let results = comicResults.filter(function(c) {
//             if(c.title) {
//                 return true;
//             } else {
//                 return false;
//             }
//         });
    
//         console.log(results); // then we send the results to the comics/index page
//         res.render("comics/index", { data: results }); // on the index.ejs page for comics
//     })
// });

// router.post('/comment', isLoggedIn, async (req, res) => {
//     console.log(req.body)
//     let newComment = await Comment.create({
//         comicBookId: req.body.comicBookId,
//         subject: req.body.subject,
//         body: req.body.body,
//         userId: req.user.id
//     })
//     console.log(newComment.toJSON())
//     res.redirect(`/comics/${req.body.comicBookId}`);
// });

// router.delete('/comment/:idx', isLoggedIn, async (req, res) => {
//     try {
//         let deleteComment = await Comment.destroy({
//             where: {id: req.params.idx}
//         })
//         res.redirect(`/comics/${req.body.comicBookId}`)
//     } catch (error) {
//         console.log(error)
//         res.redirect('/comics')
//     }
// })

module.exports = router;