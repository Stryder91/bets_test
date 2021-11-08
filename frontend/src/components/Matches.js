import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Card, InputNumber } from 'antd';
import { connect } from 'react-redux';

export const MatchesC = ({ eventId}) => {

	const [matches, setMatches] = useState([]);
	
	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const id = queryParams.get('id');

		console.log("THIS PROPS", id)
		axios.get(`/matches?id=${eventId}`)
		.then(function (res) {
			setMatches(res.data)
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
	}, []);


	return (
		<div>
			<h1>Place your bet on incoming matches</h1>
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
	const DEFAULT_BET = 5;
	const [stake, setStake] = useState(DEFAULT_BET);

	// Parameters verification
	let matchTitle = "";
	if (match && match.team1 && match.team2 && match.team1.name && match.team2.name) {
		matchTitle = `Match between ${match.team1.name} and ${match.team2.name}` 
	} else {
		matchTitle = "Error defining teams"
	}
	let team1 = (match && match.team1 && match.team1.name) ? match.team1.name : "Unknown";
	let team2 = (match && match.team2 && match.team2.name) ? match.team2.name : "Unknown";
	let matchId = (match && match.id) ? match.id : "Error";
	let matchEvtName = match && match.event && match.event.name ? match.event.name : "Unknown Event";
	let matchFormat =  match && match.format ? match.format : "Unknown Format";
	/////////////

	// Format timestamp 
	let playingDate = new Intl.DateTimeFormat('en-US', { 
		year: 'numeric', 
		month: '2-digit', 
		day: '2-digit', 
		hour: '2-digit', 
		minute: '2-digit', 
		second: '2-digit' 
	}).format(match.date)
	
	const _onChange = value => {
		setStake(value);
	}

	const _setBet = () => {
		console.log("Bet is : ", stake)
	}

	return (
		<Card className="card p-1" title={matchTitle} style={{ width: 800 }}>
			<p>Playing date : {playingDate}</p>
			<p>Begins in : </p>
			<div className="d-between">
				<div className="team-card team-card-left">
					<div>{team1}</div> 
					<div> <Button onClick={_setBet} className="green-btn">Bet</Button></div> 
				</div>
				<div>
					<InputNumber min={1} max={10} defaultValue={DEFAULT_BET} onChange={_onChange} />		
					<div></div>
				</div>
				<div className="team-card team-card-right"> 	
					<div>{team2}</div> 
					<div><Button onClick={_setBet} className="green-btn" >Bet</Button></div>
				</div>
			</div>
			<div className="mt-5">
			<Alert
				message={matchEvtName}
				description={`Format: ${matchFormat} - Match id: ${matchId}`}
				type="info"
				showIcon
			/>
			</div>
		</Card>
	)
}
const getProps = state => {
	return {
	  eventId : state.eventId,
	}
}

export const Matches = connect(getProps, null)(MatchesC);
