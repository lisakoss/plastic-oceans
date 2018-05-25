import React from 'react';
import './index.css';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col, Container} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Pledges from './Pledges'

export default class MyFootprint extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      list: true
    }
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {

    return (
      <div>
        <Container>
            <Row>
                <Col sm="6" md="12">
                    <p className="my-footprint-title">Location: Urban City</p>
                </Col>
            </Row>
            <Row>
                <Col xs="6" md="6" className='footprint'>
                    <img src={require("./img/circle.png")} alt="circle"/>
                    <p>Your footprint</p>
                </Col>
                <Col xs="6" md="6" className='footprint'>
                    <img src={require("./img/circle.png")} alt="circle"/>
                    <p>Average footprint</p>
                </Col>
            </Row>
        </Container>
        <hr />
        {/* Pledges */}
        <div className="my-footprint-pledges">
            <Container className="list-view">
                <Row id="my-footprint-pledges-header">
                    <Col sm="6" md="6">
                        <p className="my-footprint-title">Pledges</p>
                    </Col>
                    <Col sm="6" md="6">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>View</DropdownToggle>
                            <DropdownMenu>
                            <DropdownItem onClick={() => this.setState({ list: true})}>List</DropdownItem>
                            <DropdownItem onClick={() => this.setState({ list: false})}>Card</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>
            <Pledges 
                list={this.state.list}
                pledges={this.props.pledges}
            />
        </div>
      </div>
    )
  }
}