import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Download extends React.Component {
	render() {
		return (
			<ExcelFile element={<button>Download Data</button>}>
				<ExcelSheet data={this.props.serviceTime} name="Service Time">
					<ExcelColumn label="Start Time" value="startTime"/>
					<ExcelColumn label="Stop Time" value="stopTime"/>
					<ExcelColumn label="Service Time" value="serviceTime"/>
				</ExcelSheet>
				<ExcelSheet data={this.props.customerPerMinute} name="Customers Per Minute">
					<ExcelColumn label="Minute" value="minute"/>
					<ExcelColumn label="Customers" value="customers"/>
				</ExcelSheet>
			</ExcelFile>
		);
	}
}
export default Download;