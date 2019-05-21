// TODO: Break out into smaller components.
// TODO: Add comments/documentation.
// TODO: Update README.md
// TODO: Add a header and footer.
// TODO: Add loading animation before each calculation.


import React from 'react';
import {Card, CardDeck, Col, Container, Form, Row} from "react-bootstrap";

class App extends React.Component {
  state = {
    lambda: '',
    mu: '',
    c: '',
    p: '',
    p0: '',
    lq: '',
    wq: '',
    w: '',
    l: '',
  };

  handleLambdaChange = event => {
    this.setState({
      lambda: event.target.value,
      p: '',
      p0: '',
      lq: '',
      wq: '',
      w: '',
      l: '',
    });
  };
  handleMuChange = event => {
    this.setState({
      mu: event.target.value,
      p: '',
      p0: '',
      lq: '',
      wq: '',
      w: '',
      l: '',
    });
  };
  handleCChange = event => {
    this.setState({
      c: event.target.value,
      p: '',
      p0: '',
      lq: '',
      wq: '',
      w: '',
      l: '',
    });
  };

  calculateP() {
    if(this.state.c * this.state.mu > this.state.lambda){
      this.setState({
        p: this.state.lambda / (this.state.c * this.state.mu)
      })
    }else{
      this.setState({
        lambda: '',
        mu: '',
        c: '',
        p: ''
      })
      alert("Arrival rate cannot be larger than or equal to (service rate)*(number of servers)")
    }
  }

  calculateP0() {
    let first = 0;
    let c = this.state.c;
    let p = this.state.p;

    for (let i = c - 1; i >= 0; i--) {
      first += Math.pow(c * p, i) / App.factorialize(i);
    }

    const p0 = 1 / (first + Math.pow(c * p, c) / (App.factorialize(c) * (1 - p)));

    this.setState({
      p0: p0
    })

  }
  calculateLq(){
    this.setState({
      lq: (this.state.p0 * Math.pow(this.state.lambda/this.state.mu, this.state.c) * this.state.p)/(App.factorialize(this.state.c)* Math.pow(1-this.state.p,2))
    })
  }
  calculateWq(){
    this.setState({
      wq: this.state.lq/this.state.lambda
    })
  }
  calculateW(){
    this.setState({
      w: this.state.wq + (1/this.state.mu)
    })
  }
  calculateL(){
    this.setState({
      l: this.state.lambda * this.state.w
    })
  }

  static factorialize(num) {
    if (num === 0 || num === 1)
      return 1;
    for (var i = num - 1; i >= 1; i--) {
      num *= i;
    }
    return num;
  }

  static validateNumber(num) {
    return num !== '' && !isNaN(num);
  }

  render() {

    const lambda = this.state.lambda;
    const mu = this.state.mu;
    const c = this.state.c;
    const p = this.state.p;
    const p0 = this.state.p0;
    const lq = this.state.lq;
    const wq = this.state.wq;
    const w = this.state.w;
    const l = this.state.l;

    return (
        <Container>
          <h1 className="display-1">M/M/C Calculator</h1>
          <hr/>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="formLambda">
                  <Form.Label>Arrival rate:</Form.Label><br/>
                  <Form.Control
                      name={'lambda'}
                      type={'text'}
                      placeholder={'Enter service rate'}
                      className={`form-control ${this.state.lambda === '' ? '' : App.validateNumber(this.state.lambda) ? 'is-valid' : 'is-invalid'}`}
                      onChange={this.handleLambdaChange}
                      value={lambda}

                  />
                  <div
                      className={`${this.state.lambda === '' ? 'text-muted' : App.validateNumber(this.state.lambda) ? 'valid-feedback' : 'invalid-feedback'}`}>{this.state.lambda === '' ? 'Arrival rate must be entered' : App.validateNumber(this.state.lambda) ? '"' + this.state.lambda + '" is a number!' : '"' + this.state.lambda + '" is NOT a number!'}</div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formMu">
                  <Form.Label>Service rate:</Form.Label><br/>
                  <Form.Control
                      name={'mu'}
                      type={'text'}
                      placeholder={'Enter service rate'}
                      className={`form-control ${this.state.mu === '' ? '' : App.validateNumber(this.state.mu) ? 'is-valid' : 'is-invalid'}`}
                      onChange={this.handleMuChange}
                      value={mu}
                  />
                  <div
                      className={`${this.state.mu === '' ? 'text-muted' : App.validateNumber(this.state.mu) ? 'valid-feedback' : 'invalid-feedback'}`}>{this.state.mu === '' ? 'Service rate must be entered' : App.validateNumber(this.state.mu) ? '"' + this.state.mu + '" is a number!' : '"' + this.state.mu + '" is NOT a number!'}</div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicC">
                  <Form.Label>Number of servers:</Form.Label><br/>
                  <Form.Control
                      name={'name'}
                      type={'text'}
                      placeholder={'Enter number of servers'}
                      className={`form-control ${this.state.c === '' ? '' : App.validateNumber(this.state.c) ? 'is-valid' : 'is-invalid'}`}
                      onChange={this.handleCChange}
                      value={c}
                  />
                  <div
                      className={`${this.state.c === '' ? 'text-muted' : App.validateNumber(this.state.c) ? 'valid-feedback' : 'invalid-feedback'}`}>{this.state.c === '' ? 'Number of servers must be entered' : App.validateNumber(this.state.c) ? '"' + this.state.c + '" is a number!' : '"' + this.state.c + '" is NOT a number!'}</div>

                </Form.Group>
              </Col>
            </Row>
          </Form>
          <hr/>
          <CardDeck>
            <Card id={'p-card'}>
              <Card.Header>The average utilization of the system (p)</Card.Header>
              <Card.Body>
                <Card.Text>
                  {App.validateNumber(lambda) && App.validateNumber(mu) && App.validateNumber(c) && !App.validateNumber(p) ? this.calculateP() : ''}
                  {App.validateNumber(p) ? `P is: ${Math.round(p * 10000) / 10000}` : 'All values must be entered correctly to calculate P.'}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card id={'p0-card'}>
              <Card.Header>The  probability  that  no  customers are in the system (p0)</Card.Header>
              <Card.Body>
                <Card.Text>
                  {App.validateNumber(p) && !App.validateNumber(p0) ? this.calculateP0() : ''}
                  {App.validateNumber(p0) ? `P0 is: ${Math.round(p0 * 10000) / 10000}` : 'All values must be entered correctly to calculate p0.'}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card id={'lq-card'}>
              <Card.Header>The average number of customers waiting in line (lq)</Card.Header>
              <Card.Body>
                <Card.Text>
                  {App.validateNumber(p0) && !App.validateNumber(lq) ? this.calculateLq() : ''}
                  {App.validateNumber(lq) ? `LQ is: ${Math.round(lq * 10000) / 10000}` : 'All values must be entered correctly to calculate LQ.'}
                </Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
          <br/>
          <CardDeck>
            <Card id={'wq-card'}>
              <Card.Header>The average time spent waiting in line</Card.Header>
              <Card.Body>
                <Card.Text>
                  {App.validateNumber(lq) && !App.validateNumber(wq) ? this.calculateWq() : ''}
                  {App.validateNumber(wq) ? `WQ is: ${Math.round(wq * 10000) / 10000}` : 'All values must be entered correctly to calculate WQ.'}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card id={'w-card'}>
              <Card.Header>The average time spent in the system, including service (w)</Card.Header>
              <Card.Body>
                <Card.Text>
                  {App.validateNumber(wq) && !App.validateNumber(w) ? this.calculateW() : ''}
                  {App.validateNumber(w) ? `W is: ${Math.round(w * 10000) / 10000}` : 'All values must be entered correctly to calculate W.'}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card id={'l-card'}>
              <Card.Header>The average number of customers in the service system (l)</Card.Header>
              <Card.Body>
                <Card.Text>
                  {App.validateNumber(w) && !App.validateNumber(l) ? this.calculateL() : ''}
                  {App.validateNumber(l) ? `L is: ${Math.round(l * 10000) / 10000}` : 'All values must be entered correctly to calculate L.'}
                </Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
          <hr/>

        </Container>
    );
  }
}

export default App;
