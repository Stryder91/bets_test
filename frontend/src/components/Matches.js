import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import BettingPool from '../abis/BettingPool.json';
import SimpleStorage from '../abis/SimpleStorage.json';

import { Alert, Button, Card, InputNumber } from 'antd';
import GetWeb3 from '../blockchain/GetWeb3';

export const MatchesC = ({ account, networkId, eventId}) => {
	const [myStake, setMyStake] = useState(0)
	const [vault, setVault] = useState(0);
	const [matches, setMatches] = useState([]);
	const [dapp, setDapp] = useState({});
	const [dappTokenBalance, setdappTokenBalance] = useState(null)
	
	useEffect(async() => {
		// const queryParams = new URLSearchParams(window.location.search);
		// const id = queryParams.get('id');
		// axios.get(`/matches?id=${eventId}`)
		// .then(function (res) {
		// 	setMatches(res.data);
		// })
		// .catch(function (error) {
		// 	// handle error
		// 	console.log(error);
		// })
		console.log("SimpleStorage", SimpleStorage)
	}, []);

	const Go = async () => {
		await loadBlockchainData(account);
	}
	
	const loadBlockchainData = async (account) => {
		const web3 = await GetWeb3();
		
		// Load DappToken -> network Id from store	
		const deployedNetwork = SimpleStorage.networks[networkId];
		console.log("COucou let's go", deployedNetwork, networkId)
		if(deployedNetwork) {
			console.log("1", dapp)
			const dappToken = new web3.eth.Contract(SimpleStorage.abi, deployedNetwork && deployedNetwork.address)
			console.log("DAPP", dappToken, dapp)

			setDapp({ dappToken });
		
			// await dappToken.methods.set(myStake).send({ from: account });
			
			// // Get the value from the contract to prove it worked.
			// const after = await dappToken.methods.get().call();
			// setVault(parseInt(after));

			// console.log("After", vault, dapp)

		} else {
			console.log("3")
		  window.alert('DappToken contract not deployed to detected network.')
		}
	}
	const _setStake = async (value) => {
		setMyStake(value);
	}
	const _test = async () => {
		console.log("On test", dapp);
		const myRes = await dapp.methods.set(5).send({ from: account });
		console.log("dapp is : ", dapp, myRes);
	}
	return (
		<div>
			<h1>Place your bet on incoming matches</h1>
			<InputNumber min={1} max={100} defaultValue={myStake} onChange={_setStake} />
			<Button onClick={Go}>Fill vault</Button>
			<Button onClick={_test}>Test</Button>
			<p>In the vault : {vault}</p>

			<div className="d-center"> 
				{
				(matches && matches.length > 0) 
					? matches.map(m => <MatchCard key={m.id} account={account} match={m} dapp={dapp}/>)
					: <div>Loading matches</div>
				}
			</div>
		</div>
	);
}

const MatchCard = ({ account, match, dapp}) => {
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

	const _setBet = async () => {
		const myRes = await dapp.methods.getBalance().call();
		console.log("dapp is : ", dapp, myRes);
	}

	return (
		<Card className="card p-1" title={matchTitle} style={{ width: 800 }}>
			<p>Playing date : {playingDate}</p>
			<p>Begins in : </p>
			<div className="d-between">
				<div className="team-card team-card-left">
					<div>{team1}</div> 
					<InputNumber min={1} max={10} defaultValue={DEFAULT_BET} onChange={_onChange} />
					<div className="mt-2"> <Button onClick={_setBet} className="green-btn">Bet</Button></div> 
				</div>

				<div className="team-card team-card-right"> 	
					<div>{team2}</div> 
					<InputNumber min={1} max={10} defaultValue={DEFAULT_BET} onChange={_onChange} />		
					<div className="mt-2"><Button onClick={_setBet} className="green-btn" >Bet</Button></div>
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
		account : state.account,
		networkId : state.networkId,
	  eventId : state.eventId,
	}
}

export const Matches = connect(getProps, null)(MatchesC);
