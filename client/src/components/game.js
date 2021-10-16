import './Game.css';

export const Game = (props) => {
	return (
		<div className="gamediv">
			<h2>{props.name}</h2>
			<p>Playing: {props.playing}</p>
			<p>Visits: {props.visits}</p>
		</div>
	);
};
