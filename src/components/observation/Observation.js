import React from 'react';
import ServiceObservation from './ServiceObservation'
import ArrivalObservation from './ArrivalObservation'
import ServiceTable from './ServiceTable'
import ArrivalTable from './ArrivalTable'
import {Col, Row} from "react-bootstrap";
import Download from './Download'
import Timer from "./Timer";

class Observation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isObservationRunning: false,
            timer: {
                isOn: false,
                startTime: 0,
                seconds: 0,
                minutes: 0
            },
            customer: 0,
            arrivalObservation: [],
            serviceObservation: []
        };
        this.setIsObservationRunning = this.setIsObservationRunning.bind(this);
        this.setTimer = this.setTimer.bind(this);
        this.addArrivalObservation = this.addArrivalObservation.bind(this);
        this.addServiceObservation = this.addServiceObservation.bind(this);
        this.setCustomer = this.setCustomer.bind(this);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.isObservationRunning === false && this.state.isObservationRunning === true){
            this.setState({
                customer: 0,
                arrivalObservation: [],
                serviceObservation: []
            })
        }
    }

    setIsObservationRunning(boolean){
        this.setState({
            isObservationRunning: boolean
        })
    }
    setTimer(timer){
        this.setState({
            timer: timer
        })
    }
    setCustomer(num){

    }
    addArrivalObservation(arrivalObservation){
        const joined = this.state.arrivalObservation.concat(arrivalObservation)
        this.setState(  {
            arrivalObservation: joined
        })
    }
    addServiceObservation(serviceObservation){
        const joined = this.state.serviceObservation.concat(serviceObservation)
        this.setState(  {
            serviceObservation: joined
        })
    }

    render() {
        return (
            <div>
                <Row>

                    <Col md={4} className={"text-center"}>
                        <Timer setTimer={this.setTimer}
                               setIsObservationRunning={this.setIsObservationRunning}
                               timer={this.state.timer}
                               isObservationRunning={this.state.isObservationRunning}
                        />
                    </Col>

                    <Col md={4} className={"text-center"}>
                        <ArrivalObservation isObservationRunning={this.state.isObservationRunning}
                                            timer={this.state.timer}
                                            arrivalObservation={this.state.arrivalObservation}
                                            setCustomer={this.setCustomer}
                                            addArrivalObservation={this.addArrivalObservation}
                        />
                    </Col>

                    <Col md={4} className={"text-center"}>
                        <ServiceObservation isObservationRunning={this.state.isObservationRunning}
                                            timer={this.state.timer}
                                            serviceObservation={this.state.serviceObservation}
                                            setCustomer={this.setCustomer}
                                            addServiceObservation={this.addServiceObservation}
                        />
                    </Col>

                </Row>
                <br/>
                <Row className="justify-content-center">
                    <Col md={4}>
                        <ArrivalTable arrivalObservation={this.state.arrivalObservation}/>
                    </Col>
                    <Col md={4}>
                        <ServiceTable serviceObservation={this.state.serviceObservation}/>
                    </Col>
                    <Col md={4} className="text-center">
                        <h5>Actions</h5>
                        <Download customerPerMinute={this.state.arrivalObservation.customerPerMinute}
                                  serviceTime={this.state.serviceObservation}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Observation;