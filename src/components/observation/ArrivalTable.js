import React from 'react';
import Table from "react-bootstrap/Table";

class ArrivalTable extends React.Component {


    render() {

        const items = this.props.arrivalObservation.map((item, key) =>
            <tr id={key} key={key}>
                <td>{item.minute}</td>
                <td>{item.customers}</td>
            </tr>
        );


        return (
            <div>
                <h5>Arrival observations</h5>
                <Table striped bordered size="sm">

                    <thead>
                    <tr>
                        <th>Minute</th>
                        <th>Customers</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ArrivalTable;