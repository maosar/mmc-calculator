import React from 'react';
import Button from "react-bootstrap/Button";

class ServiceObservation extends React.Component {
    state = {
        timer: {
            isOn: false,
            startTime: 0,
            seconds: 0,
        },
        serviceObservation: {
            startTime: 0,
            stopTime: 0,
            serviceTime: 0
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.timer.isOn) {
            clearInterval(this.serviceTimer);
        }
    }

    toggleTimer() {
        if (!this.state.timer.isOn) {
            this.setState({
                timer: {
                    isOn: true,
                    startTime: Date.now(),
                    seconds: this.state.timer.seconds
                },
                serviceObservation: {
                    startTime: (this.props.timer.minutes < 10 ? '0' + (this.props.timer.minutes) : (this.props.timer.minutes))+':'+(this.props.timer.seconds < 10 ? '0' + (this.props.timer.seconds) : (this.props.timer.seconds)),
                    stopTime: 0,
                    serviceTime: 0
                }
            })
            this.timer = setInterval(
                () => this.tick(),
                1
            );
        } else {
            clearInterval(this.timer);
            this.setState({
                timer: {
                    isOn: false,
                    startTime: 0,
                    seconds: 0
                },
                serviceObservation: {
                    startTime: this.state.serviceObservation.startTime,
                    stopTime: (this.props.timer.minutes < 10 ? '0' + (this.props.timer.minutes) : (this.props.timer.minutes))+':'+(this.props.timer.seconds < 10 ? '0' + (this.props.timer.seconds) : (this.props.timer.seconds)),
                    serviceTime: this.state.serviceObservation.serviceTime
                }
            }, ()=>{
                this.props.addServiceObservation(this.state.serviceObservation)
            })

        }
    }

    tick() {
        var millis = Date.now() - this.state.timer.startTime
        var seconds = Math.floor(millis / 1000)
        this.setState({
            timer: {
                isOn: true,
                startTime: this.state.timer.startTime,
                seconds: (seconds === 60 ? 0 : seconds),

            },
            serviceObservation: {
                startTime: this.state.serviceObservation.startTime,
                stopTime: 0,
                serviceTime: this.state.timer.seconds
            }
        })
    }

    render() {
        const observationTime = this.state.timer.seconds;
        if (this.props.timer.isOn) {
            return (
                <div>
                    <Button
                        className={`btn-lg btn ${this.state.timer.isOn ? 'btn-danger' : 'btn-success'}`}
                        onClick={() => {
                            this.toggleTimer()
                        }}
                    >
                        {!this.state.timer.isOn ? 'Start service' : 'Stop service'}
                    </Button>
                    <p className={'display-1'}>{this.state.timer.isOn ? observationTime : '0'}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <Button disabled
                            className={`btn-lg btn ${this.state.timer.isOn ? 'btn-danger' : 'btn-success'}`}
                    >
                        {this.state.timer.isOn ? 'Stop service' : 'Start service'}
                    </Button>
                    <p className={'display-1'}>{this.state.timer.isOn ? observationTime : '0'}</p>
                </div>
            );
        }
    }
}

export default ServiceObservation;