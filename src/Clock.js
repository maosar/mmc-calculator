import React from 'react';
import ServiceObservation from './ServiceObservation'
import ArrivalObservation from './ArrivalObservation'
import ServiceTable from './ServiceTable'
import ArrivalTable from './ArrivalTable'
import {Col, Row, Button} from "react-bootstrap";
import Download from './Download'

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isTimerRunning: false,
			seconds: 0,
			minutes: 0,
			customerPerMinute: [],
			serviceTime: []
		};
		this.setCPM = this.setCPM.bind(this);
		this.setST = this.setST.bind(this);

	}

	setCPM(cpm) {
		this.setState({
			customerPerMinute: cpm
		});
	}

	setST(st) {
		this.setState({
			serviceTime: st
		});
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		if (this.state.seconds < 59) {
			this.setState({
				seconds: this.state.seconds + 1
			});
		} else {
			this.setState({
				seconds: 0,
				minutes: this.state.minutes + 1
			})
		}
	}

	render() {
		return (
			<div>
				<Row>
					<Col className={"text-center"}>
						<Button
							className={`btn-lg btn ${!this.state.isTimerRunning ? 'btn btn-success' : 'btn btn-danger'}`}
							onClick={() => {
								this.handleTimerButton();
							}}>
							{!this.state.isTimerRunning ? 'Start observation' : 'Stop observation'}
						</Button>
						<p className={'display-1'}>
                    {this.state.minutes < 10 ? '0' + (this.state.minutes) : (this.state.minutes)}:{this.state.seconds < 10 ? '0' + (this.state.seconds) : (this.state.seconds)}
                </p>
					</Col>
					<Col className={"text-center"}>
						<ArrivalObservation isTimerRunning={this.state.isTimerRunning}
						                    minutes={this.state.minutes}
						                    setCPM={this.setCPM}
						/>
					</Col>
					<Col className={"text-center"}>
						<ServiceObservation isTimerRunning={this.state.isTimerRunning}
						                    minutes={this.state.minutes}
						                    seconds={this.state.seconds} setST={this.setST}
						/>
					</Col>
				</Row>
				<br/>
				<Row>
					<Col><ArrivalTable customerPerMinute={this.state.customerPerMinute}/></Col>
					<Col><ServiceTable serviceTime={this.state.serviceTime}/></Col>
				</Row>
				{this.state.customerPerMinute !== null && this.state.serviceTime !== null ? <Download customerPerMinute={this.state.customerPerMinute}
				                                                                    serviceTime={this.state.serviceTime}
				/> : ''}


			</div>
		);
	}

	handleTimerButton() {
		if (!this.state.isTimerRunning) {
			this.setState({
				isTimerRunning: true,
			});
			this.timerID = setInterval(
				() => this.tick(),
				100
			);
		} else {
			clearInterval(this.timerID);
			this.setState({
				isTimerRunning: false,
				seconds: 0,
				minutes: 0
			})
		}
	}
}

export default Clock;