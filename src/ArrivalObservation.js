import React from 'react';
import Button from "react-bootstrap/Button";

class ArrivalObservation extends React.Component {
	state = {
		customer: 0,
		customerPerMinute: []
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.minutes !== this.props.minutes && this.props.minutes !== 0) {
			this.setState(previousState => ({
				customer: 0,
				customerPerMinute: [
					...previousState.customerPerMinute,
					{minute: this.props.minutes, customers: this.state.customer}
				]
			}), () => {
				this.props.setCPM(this.state.customerPerMinute)
			});
		}
	}

	render() {
		if (this.props.isTimerRunning) {
			return (
				<div>
					<Button
						className={'btn btn-primary btn-lg'}
						onClick={() => {
							this.handleAddCustomer();
						}}>
						Add Customer
					</Button>
					<p className={'display-1'}>{this.state.customer}</p><br/>
				</div>
			)
		} else {
			return (
				<div>
					<Button
						className={'btn btn-primary btn-lg'}
						disabled
					>
						Add Customer
					</Button>
					<p className={'display-1'}>{this.state.customer}</p><br/>
				</div>
			)
		}
	}

	handleAddCustomer() {
		this.setState({
			customer: this.state.customer + 1
		})
	}
}

export default ArrivalObservation;