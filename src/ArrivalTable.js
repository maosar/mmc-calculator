import React from 'react';
import Table from "react-bootstrap/Table";

class ArrivalTable extends React.Component{


	render(){

		const customerPerMinute = this.props.customerPerMinute;
		const items = customerPerMinute.map((item, key) =>
			<tr id={key} key={key}><td>{item.minute}</td><td>{item.customers}</td></tr>
		);


		return (
				<Table striped bordered size="sm">
					<thead>
					<tr><th>Minute</th><th>Customers</th></tr>
					</thead>
					<tbody>
					{items}
					</tbody>
				</Table>
		)
	}
}
export default ArrivalTable;