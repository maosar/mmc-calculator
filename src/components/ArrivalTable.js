import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class ArrivalTable extends React.Component {

	render() {

		const customerPerMinute = this.props.customerPerMinute;
		const arrivalColumns =
			[{
				Header: "Arrival Rate",
				columns: [
					{
						Header: "Minute",
						accessor: "minute"
					},
					{
						Header: "Customers",
						accessor: "customers",
					}
				]
			}];

		return (
			<ReactTable
				defaultPageSize={10}
				data={customerPerMinute}
				columns={arrivalColumns}
			/>
		)
	}
}

export default ArrivalTable;