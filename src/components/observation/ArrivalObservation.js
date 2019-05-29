import React from 'react';
import Button from "react-bootstrap/Button";

class ArrivalObservation extends React.Component {
    state = {
        arrivalObservation:{
            minute: 1,
            customers: 0
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.timer.minutes !== this.props.timer.minutes && this.props.timer.minutes !== 0) {
            this.props.addArrivalObservation(this.state.arrivalObservation)
            this.setState({
                arrivalObservation:{
                    minute: this.state.arrivalObservation.minute + 1,
                    customers: 0
                }
            })
        }
    }
    handleAddCustomer() {
        this.setState({
            arrivalObservation:{
                minute: this.state.arrivalObservation.minute,
                customers: this.state.arrivalObservation.customers + 1
            }
        })
    }

    render() {
        if (this.props.timer.isOn) {
            return (
                <div>
                    <Button className={'btn btn-primary btn-lg'}
                            onClick={() => {
                                this.handleAddCustomer()
                            }}
                    >
                        Add Customer
                    </Button>
                    <p className={'display-1'}>{this.state.arrivalObservation.customers}</p><br/>
                </div>
            )
        } else {
            return (
                <div>
                    <Button disabled
                            className={'btn btn-primary btn-lg'}
                    >
                        Add Customer
                    </Button>
                    <p className={'display-1'}>{this.state.arrivalObservation.customers}</p><br/>
                </div>
            )
        }

    }


}

export default ArrivalObservation;