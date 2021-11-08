import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'antd';

export const Tournament = ({eventState}) => {

	const [matches, setMatches] = useState([]);
	useEffect(() => {
		axios.get(`/matches?id=${eventState.id}`)
		.then(function (res) {
			console.log("From matches", res.data)
			setMatches(res.data)
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
	}, [])
	return (
		<div>
			<h1>Welcome to Tournament n° {eventState.id}</h1>
			<div className="d-center"> 
				{
				(matches && matches.length > 0) 
					? matches.map(m => <MatchCard key={m.id} match={m} />)
					: <div>Loading matches</div>
				}
			</div>
		</div>
	);
}

const MatchCard = ({match}) => {
	let matchTitle = "";
	if (match && match.team1 && match.team2 && match.team1.name && match.team2.name) {
		matchTitle = `Match between ${match.team1.name} and ${match.team2.name}` 
	} else {
		matchTitle = "Error defining teams"
	}
	return (
		<Card className="card p-1" title={matchTitle} style={{ width: 500 }}>
			<div className="d-between">
				<div className="team-card team-card-left">
					<div>
						<img src={match.team1.logo} alt="coucou"/>
					</div>
					<div>{match.team1.name} </div> 
				</div>
				<div className="display-score">
					{match.result.team1} - {match.result.team2}
				</div>
				<div className="team-card team-card-right"> 	
					<div>
						<img src={match.team2.logo} alt="coucou"/>
					</div>
					<div>{match.team2.name} </div>
				</div>
			</div>
		</Card>
	)
}