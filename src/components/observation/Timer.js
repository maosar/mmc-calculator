import React from 'react';
import {Button} from "react-bootstrap";

class Timer extends React.Component {
    componentDidUpdate() {
        if (!this.props.timer.isOn) {
            clearInterval(this.timer);
        }
    }

    toggleTimer() {
        if (!this.props.isObservationRunning) {
            const timer = {
                isOn: true,
                startTime: Date.now(),
                seconds: this.props.timer.seconds,
                minutes: this.props.timer.minutes
            }
            this.props.setIsObservationRunning(true)
            this.props.setTimer(timer)
            this.timer = setInterval(
                () => this.tick(),
                1
            );
        } else {
            clearInterval(this.timer);
            const timer = {
                isOn: false,
                startTime: 0,
                seconds: 0,
                minutes: 0
            }
            this.props.setIsObservationRunning(false)
            this.props.setTimer(timer)
        }
    }

    tick() {
        var millis = Date.now() - this.props.timer.startTime
        var minutes = this.convertMS(millis).minute
        var seconds = this.convertMS(millis).seconds
        //console.log(minutes + ':' + seconds)
        const timer = {
            isOn: true,
            startTime: this.props.timer.startTime,
            seconds: (seconds === 60 ? 0 : seconds),
            minutes: minutes

        }
        this.props.setTimer(timer)
    }

    convertMS(milliseconds) {
        var day, hour, minute, seconds;
        seconds = Math.floor(milliseconds / 1000);
        minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        day = Math.floor(hour / 24);
        hour = hour % 24;
        return {
            day: day,
            hour: hour,
            minute: minute,
            seconds: seconds
        };
    }

    render() {

        return (
            <div>
                <Button
                    className={`btn-lg btn ${!this.props.timer.isOn ? 'btn btn-success' : 'btn btn-danger'}`}
                    onClick={() => {
                        this.toggleTimer()
                    }}>
                    {!this.props.timer.isOn ? 'Start observation' : 'Stop observation'}
                </Button>
                <p className={'display-1'}>
                    {this.props.timer.minutes < 10 ? '0' + (this.props.timer.minutes) : (this.props.timer.minutes)}:{this.props.timer.seconds < 10 ? '0' + (this.props.timer.seconds) : (this.props.timer.seconds)}
                </p>
            </div>
        )
    }
}

export default Timer;