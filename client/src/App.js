// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import { Game } from './components/Game';

const App = () => {
	const [gameList, setGameList] = useState();
	const fetchGames = async () => {
		const data = await fetch('http://localhost:8000/getInfo').then((d) =>
			d.json()
		);
		setGameList(data);
	};

	useEffect(() => {
		fetchGames();
		setInterval(() => {
			fetchGames();
		}, 30 * 1000);
	}, []);

	return (
		<div className="container">
			<div className="game_list">
				{gameList ? (
					gameList.map((g) => (
						<Game
							name={g.name}
							playing={g.playing}
							visits={g.visits}
						/>
					))
				) : (
					<div className="load-center loading" />
				)}
			</div>
		</div>
	);
};

export default App;
