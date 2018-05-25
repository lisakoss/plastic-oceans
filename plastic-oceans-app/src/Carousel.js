import React from 'react';
import './index.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Row, Col, Container} from 'reactstrap';
import MyFootprint from './MyFootprint.js'
import ActivePledges from './ActivePledges.js'
import classnames from 'classnames';

import firebase, { auth } from './firebase.js';

export default class Footprint extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
        currentImageIndex: 0
    };

    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
  }

  previousSlide () {
    const newIndex = this.state.currentImageIndex - 1;

    this.setState({
      currentImageIndex: newIndex
    });
  }

  nextSlide () {
    const newIndex = this.state.currentImageIndex + 1;
    
    this.setState({
        currentImageIndex: newIndex
    });
  }

  render() {

    return (
      <Container className="carousel">
        <Row>
            <i class="fas fa-angle-left" onClick={ this.previousSlide }></i>
            <Col xs="4" md="4">
                {this.props.cards[this.state.currentImageIndex]}
            </Col>
            <i class="fas fa-angle-right" onClick={ this.nextSlide }></i>
        </Row>
      </Container>
    )
  }
}
