import React from 'react';
import Button from "react-bootstrap/Button";

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTimerRunning: false,
            seconds: 0,
            minutes: 0,
            customer: 0,
            customerPerMinute: []
        };
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
                minutes: this.state.minutes + 1,
                customer: 0,
                customerPerMinute: [
                    this.state.customerPerMinute,
                    [this.state.minutes + 1, this.state.customer]
                ]
            })
        }
    }

    render() {
        return (
            <div>
                <Button
                    className={!this.state.isTimerRunning ? 'btn btn-success' : 'btn btn-danger'}
                    onClick={() => {
                        this.handleTimerButton();
                    }}>
                    {!this.state.isTimerRunning ? 'Start timer' : 'Stop timer'}
                </Button>
                <span className={'display-1'}>
                    {this.state.minutes < 10 ? '0' + (this.state.minutes) : (this.state.minutes)}:{this.state.seconds < 10 ? '0' + (this.state.seconds) : (this.state.seconds)}
                </span><br/>
                <Button
                    onClick={() => {
                        this.handleAddCustomer();
                    }}>
                    Add Customer
                </Button>
                <span className={'display-1'}>{this.state.customer}</span><br/>
                <span className={'display-1'}>{this.state.customerPerMinute}</span>
            </div>
        );
    }

    handleTimerButton() {
        if (!this.state.isTimerRunning) {
            this.setState({
                isTimerRunning: true,
            })
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

    handleAddCustomer() {
        this.setState({
            customer: this.state.customer + 1
        })
    }
}

export default Clock;