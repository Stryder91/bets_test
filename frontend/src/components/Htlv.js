import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import { Tournament } from './Tournament';
import { Link } from 'react-router-dom';


export const Hltv = () => {
	const [events, setEvents] = useState([]);
	const [eventState, setEvent] = useState(0)

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

	if (eventState && eventState.id > 0) {
		console.log("tournament, id", eventState.id)
		return(
			<Tournament eventState={eventState}/>
		)
	}
	if (events && events.length > 0) {
		return (
			<div>
				<div>All events</div>
				<div className="d-center">
					{events.map(e => <MyCard key={e.id} setEvent={setEvent} event={e}/>)}
				</div>
			</div>
		)
	} 
	return <div>Loading events ...</div>
}

const MyCard = ({event, setEvent}) => {
	console.log("Event", event.id)
	return (
	<Card className="card card-event" title={event.name} style={{ width: 300 }}>
		<p>Start : {event.dateStart}</p>
		<p>End : {event.dateEnd}</p>
		<p>Id : {event.id}</p>
		<Link to={`${event.id}`}>
			<Button onClick={() => setEvent(event)}>Bet</Button>
		</Link>
	</Card>);
}

