import React from 'react';
import ServiceObservation from './ServiceObservation'
import ArrivalObservation from './ArrivalObservation'
import ServiceTable from './ServiceTable'
import ArrivalTable from './ArrivalTable'
import {Col, Row, Button} from "react-bootstrap";
import Download from './Download';
import ArrivalTableNew from './components/ArrivalTable';
import ServiceTableNew from './components/ServiceTable';

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
					<Col md={4} className={"text-center"}>
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
					<Col md={4} className={"text-center"}>
						<ArrivalObservation isTimerRunning={this.state.isTimerRunning}
						                    minutes={this.state.minutes}
						                    setCPM={this.setCPM}
						/>
					</Col>
					<Col md={4} className={"text-center"}>
						<ServiceObservation isTimerRunning={this.state.isTimerRunning}
						                    minutes={this.state.minutes}
						                    seconds={this.state.seconds} setST={this.setST}
						/>
					</Col>
				</Row>
				<br/>

				{/*<Row className="justify-content-center">*/}
				{/*	<Col md={4}><ArrivalTable customerPerMinute={this.state.customerPerMinute}/></Col>*/}
				{/*	<Col md={4}><ServiceTable serviceTime={this.state.serviceTime}/></Col>*/}
				{/*	<Col md={4} className="text-center">*/}
				{/*		<h5>Actions</h5>*/}
				{/*		<Download customerPerMinute={this.state.customerPerMinute}*/}
				{/*		          serviceTime={this.state.serviceTime}*/}
				{/*		/>*/}
				{/*		<Button className={'btn btn-danger'}>Reset data</Button>*/}
				{/*	</Col>*/}
				{/*</Row>*/}

				<Row>
					<Col md={4}>
						<ArrivalTableNew customerPerMinute={this.state.customerPerMinute}/>
					</Col>
					<Col md={6}>
						<ServiceTableNew serviceTime={this.state.serviceTime}/>
					</Col>
					<Col md={2}>
						<Download customerPerMinute={this.state.customerPerMinute}
						          serviceTime={this.state.serviceTime}
						/>
						<br/>
						<Button className={'btn btn-danger'}>Reset data</Button>
					</Col>
				</Row>


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