const app = require('express')();
const axios = require('axios');
const port = 8000;

app.use(require('express').static('../client/build'));

app.get('/game', (req, res) => {
  const game = {
    "data": [
      {
        "id": 1659645941,
        "rootPlaceId": 4872321990,
        "name": "Islands 🌎 [FURNITURE!]",
        "description": "Welcome to Islands!\r\n\r\n🌲 Build your own island\r\n👩‍🌾 Create huge farms\r\n💸 Sell items to make money\r\n👨‍🍳 Cook tasty delicacies\r\n✨ Forage valuable items\r\n🔥 And more!\r\n\r\n🛑 If you get stuck on loading screen, type /reset in chat. This WILL reset your island and inventory. Your data cannot be recovered.\r\n\r\n👑 Creators:\r\nSnickTrix (https://twitter.com/lukechatton)\r\nspleenhook (https://twitter.com/spleenhook)\r\n\r\n🎵 Music by: https://twitter.com/LawnReality",
        "creator": {
          "id": 5774246,
          "name": "Easy.gg",
          "type": "Group"
        },
        "price": null,
        "allowedGearGenres": [
          "All"
        ],
        "allowedGearCategories": [],
        "playing": 15158,
        "visits": 99999,
        "maxPlayers": 15,
        "created": "2020-04-08T02:47:17.397Z",
        "updated": "2021-01-15T18:09:41.013Z",
        "studioAccessToApisAllowed": false,
        "createVipServersAllowed": true,
        "universeAvatarType": "MorphToR15",
        "genre": "All"
      }
    ]
  }
  res.send(game)
})

app.get('/list', (req, res) => {
  axios.get('https://games.roblox.com/v1/games/list?model.pageContext.isSeeAllPage=true')
    .then(res => res.data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err)
    })
})

app.get('/get', (req, res) => {
  id = req.params.id;
  axios.get(`https://games.roblox.com/v1/games?universeIds=${id}`)
    .then(res => res.data)
    .then(data => {
      res.send(data);
    })
})

app.get('/getInfo', (req, res) => {
  // let gameData = []
  axios.get('https://games.roblox.com/v1/games/list?model.pageContext.isSeeAllPage=true')
    .then(res => res.data)
    .then(data => {
      let requests = [];
      data.games.forEach(game => {
        requests.push(axios.get(`https://games.roblox.com/v1/games?universeIds=${game.universeId}`))
      })
      let toReturn = [];
      axios.all(requests)
        .then(axios.spread((...responses) => {
          responses.forEach(r => {
            toReturn.push(r.data.data[0])
          })
          res.send(toReturn)
        }))
        /*
      data.games.forEach(async game => {
        // console.log(game);
        const res = await axios.get(`https://games.roblox.com/v1/games?universeIds=${game.universeId}`)
        const data = await res.data
        //console.log(data)
        gameData.push(data);
      })
      */
    })
  // console.log(gameData);
  // res.send(gameData);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})