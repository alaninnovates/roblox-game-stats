const app = require('express')();
const axios = require('axios');
const cors = require('cors');
const port = 8000;

app.use(cors());

app.get('/list', async (_req, res) => {
	const gameList = await axios.get(
		'https://games.roblox.com/v1/games/list?model.pageContext.isSeeAllPage=true'
	);
	res.send(gameList.data);
});

app.get('/get', async (req, res) => {
	const id = req.params.id;
	const gameData = await axios.get(
		`https://games.roblox.com/v1/games?universeIds=${id}`
	);
	res.send(gameData.data);
});

app.get('/getInfo', async (_req, res) => {
	const gameInfo = await axios.get(
		'https://games.roblox.com/v1/games/list?model.pageContext.isSeeAllPage=true'
	);
	const requests = gameInfo.data.games.map((game) =>
		axios.get(
			`https://games.roblox.com/v1/games?universeIds=${game.universeId}`
		)
	);
	const responses = await Promise.all(requests);
	res.send(responses.map((r) => r.data.data[0]));
});

app.listen(port, () => {
	console.log(`API up on http://localhost:${port}`);
});
