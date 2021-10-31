import React from 'react';
import { Card, Button } from 'antd';

export const MyCard = ({event}) => {
	return (
	<Card className="card" title={event.name} style={{ width: 300 }}>
		<p>Start : {event.dateStart}</p>
        <p>End : {event.dateEnd}</p>
        <p>Id : {event.id}</p>
        <Button>Bet</Button>
	</Card>);
}