import React from 'react';
import Button from "react-bootstrap/Button";

class ServiceObservation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isTimerRunning: false,
			serviceTime: [],
			startTime: {
				minutes: 0,
				second: 0,
			},
			stopTime: {
				minutes: 0,
				second: 0,
			}

		};
	}



	render() {
		const observationTime = (this.props.minutes * 60 + this.props.seconds) - (this.state.startTime.minutes * 60 + this.state.startTime.seconds);
		if (this.props.isTimerRunning) {
			return (
				<div>
					<Button
						className={`btn-lg btn ${!this.state.isTimerRunning ? 'btn-success' : 'btn-danger'}`}
						onClick={() => {
							this.handleTimerButton();
						}}>
						{!this.state.isTimerRunning ? 'Start service' : 'Stop service'}
					</Button>
					<p className={'display-1'}>{!this.state.isTimerRunning ? '0' : observationTime}</p>
				</div>
			);
		} else {
			return (
				<div>
					<Button
						disabled
						className={`btn-lg btn ${!this.state.isTimerRunning ? 'btn-success' : 'btn-danger'}`}
					>
						{!this.state.isTimerRunning ? 'Start service' : 'Stop service'}
					</Button>
					<p className={'display-1'}>{!this.state.isTimerRunning ? '0' : observationTime}</p>
				</div>
			);
		}
	}

	handleTimerButton() {
		if (!this.state.isTimerRunning) {
			this.setState({
				startTime: {
					minutes: this.props.minutes,
					seconds: this.props.seconds
				},
				isTimerRunning: true
			});

		} else {
			this.setState({
				stopTime: {
					minutes: this.props.minutes,
					seconds: this.props.seconds
				},
				isTimerRunning: false
			}, () =>{
				const observationTime = ((this.state.stopTime.minutes * 60) + this.state.stopTime.seconds) - ((this.state.startTime.minutes * 60) + this.state.startTime.seconds);
				this.setState(previousState => ({
					serviceTime: [
						...previousState.serviceTime,
						{startTime: (this.state.startTime.minutes < 10 ? '0' : '') + this.state.startTime.minutes + ':' + (this.state.startTime.seconds < 10 ? '0' : '') + this.state.startTime.seconds,
							stopTime: (this.state.stopTime.minutes < 10 ? '0' : '') + this.state.stopTime.minutes + ':' + (this.state.stopTime.seconds < 10 ? '0' : '') + this.state.stopTime.seconds,
							serviceTime: observationTime}
					]

				}), () => {
					this.props.setST(this.state.serviceTime)
				})
			});
		}
	}


}

export default ServiceObservation;