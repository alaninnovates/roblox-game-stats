const app = require('express')();
const axios = require('axios');
const port = 8000;

app.use(require('express').static('../client/build'));

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
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})