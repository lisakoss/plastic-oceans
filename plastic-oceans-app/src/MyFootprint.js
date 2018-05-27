import React from 'react';
import './index.css';
import { Button, Row, Col, Container} from 'reactstrap';
import Pledges from './Pledges'

export default class MyFootprint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  calculateFootprint() {

  }

  calculateAverageFootprint() {
      
  }

  render() {

    return (
      <div>
        <Container>
            <Row>
                <Col sm="6" md="12">
                    <p id="my-footprint-title">Location: Urban City</p>
                </Col>
            </Row>
            <Row>
                <Col xs="6" md="6" className='footprint'>
                    <img src={require("./img/circle.png")} alt="circle"/>
                    <p>Your footprint</p>
                </Col>
                <Col xs="6" md="6" className='footprint'>
                    <div className="footprint-circle">
                        <img src={require("./img/circle.png")} alt="circle"/>
                        <div className="footprint-weight">
                            <p>959g</p>
                            <p>per week</p>
                        </div>
                    </div>
                    <p>Average footprint</p>
                </Col>
            </Row>
        </Container>

        <hr />

        <Container id="my-footprint-pledges">
            <p id="my-footprint-pledges-header">Pledges</p>
            <Pledges 
                pledges={this.props.pledges}
            />
        </Container>
      </div>
    )
  }
}