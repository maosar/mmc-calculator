import React from "react";
import ReactExport from "react-data-export";
import Button from "react-bootstrap/Button";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Download extends React.Component {
	render() {
		return (
			<ExcelFile element={<Button className={'btn btn-primary'}>Export data to spreadsheet</Button>}>
				<ExcelSheet data={this.props.serviceObservation} name="Service Time">
					<ExcelColumn label="Start Time" value="startTime"/>
					<ExcelColumn label="Stop Time" value="stopTime"/>
					<ExcelColumn label="Service Time" value="serviceTime"/>
				</ExcelSheet>
				<ExcelSheet data={this.props.arrivalObservation} name="Customers Per Minute">
					<ExcelColumn label="Minute" value="minute"/>
					<ExcelColumn label="Customers" value="customers"/>
				</ExcelSheet>
			</ExcelFile>
		);
	}
}
export default Download;