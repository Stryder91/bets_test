import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import { Tournament } from './Tournament';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


export const HltvC = ({ setEvt }) => {
	const [events, setEvents] = useState([]);
	const [eventState, setEvent] = useState(0);

	useEffect(() => {
		axios.get('/events')
		.then(function (res) {
			setEvents(res.data);
			console.log("response", res.data);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
	}, [])

	const _setEvent = event => {
		setEvent(event);
		setEvt(event.id);
	}
	if (events && events.length > 0) {
		return (
			<div>
				<div>All events</div>
				<div className="d-center">
					{events.map(e => <MyCard key={e.id} setEvent={_setEvent} event={e}/>)}
				</div>
			</div>
		)
	} 
	return <div>Loading events ...</div>
}

const MyCard = ({event, setEvent}) => {
	return (
	<Card className="card card-event" title={event.name} style={{ width: 300 }}>
		<p>Start : {event.dateStart}</p>
		<p>End : {event.dateEnd}</p>
		<p>Id : {event.id}</p>
		<Link to={`${event.id}`}>
			<Button className="m-1" onClick={() => setEvent(event)}>Results</Button>	
		</Link>
		<Link to={`incoming`}>
			<Button className="m-1" onClick={() => setEvent(event)}>Bet</Button>	
		</Link>
	</Card>);
}

const getProps = state => {
	return {
	  titleHome : state.titleHome,
	}
}

const setProps = dispatch => {
	return {
		setEvt: id => {
			dispatch({type: "SET_EVENT", id: id});
		},
	}
};
export const Hltv = connect(getProps, setProps)(HltvC);

