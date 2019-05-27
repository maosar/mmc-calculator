import React from 'react';
import Table from "react-bootstrap/Table";

class ServiceTable extends React.Component{

	render(){
		const serviceTime = this.props.serviceTime;
		const items = serviceTime.map((item, key) =>
			<tr id={key} key={key}><td>{item.startTime}</td><td>{item.stopTime}</td><td>{item.serviceTime}</td></tr>
		);
		return (
			<Table striped bordered size="sm">
				<thead>
				<tr><th>Start time</th><th>Stop time</th><th>Service time</th></tr>
				</thead>
				<tbody>
				{items}
				</tbody>
			</Table>
		)
	}
}
export default ServiceTable;