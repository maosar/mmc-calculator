import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class TotalTable extends React.Component {

	render() {
		const serviceTime = this.props.serviceTime;

		const serviceTimeColumns =
			[{
				Header: "Service Time",
				columns:
					[{
						Header: "Start Time",
						accessor: "startTime"
					},
						{
							Header: "End Time",
							accessor: "stopTime",
						},
						{
							Header: "Service Time",
							accessor: "serviceTime",
						}]
			}];

		return (
			<ReactTable
				defaultPageSize={10}
				data={serviceTime}
				columns={serviceTimeColumns}
			/>
		)
	}
}

export default TotalTable;