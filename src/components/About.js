import React from "react";
import {Col, Row, Tab, Tabs} from "react-bootstrap";
import Card from "react-bootstrap/Card";

class About extends React.Component {
    render() {
        return (
            <div>
                <h2 id={"about"}>About</h2>
                <hr/>
                <Row>
                    <Col md={8}>
                        <Tabs defaultActiveKey="project" id="uncontrolled-tab-example">
                            <Tab eventKey="project" title="The Project">
                                <p>
                                    This is a school project created by Mattias and Erik, students at Dalarnas
                                    University.
                                    The purpose for this project is to learn the basics of queue calculations, React.js
                                    and React-Bootstrap.
                                </p>
                                <p>
                                    Right now it is a two-in-one React.js app. First we have the queue observation part,
                                    which is a tool to help keep track during a single line queue observation. It
                                    creates
                                    tables of data and can export it to .xlsl file format to be able to read it in Excel
                                    and do the proper arrival rate and service rate calculations there. The second part
                                    is the M/M/C-Calculator where you can type in the arrival rate and service rate
                                    from your queue observation. It then calculates the P-value and other interesting
                                    values you can get from a queue observation!
                                </p>
                            </Tab>
                            <Tab eventKey="profile" title="Us">
                                <p>
                                    We are two very busy students studying Systems Science at Dalarnas University, this
                                    part is still under construction.
                                </p>
                            </Tab>

                        </Tabs>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Header><span>Contact</span></Card.Header>
                            <Card.Body>
                            <p>Mattias: <a href={"http://github.com/maosar"}>Github</a></p>
                            <p>Erik: <a href={"http://github.com/Albinsson"}>Github</a></p>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
                <hr/>
            </div>
        )
    }
}

export default About;