import React from 'react';
import './index.css';
import {Grid, Row, Col, ListGroup, ListGroupItem, Button} from 'react-bootstrap'

export default class MyFootprint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div>
          
        <Grid>
            <Row className="show-grid">
                <Col xs={6} md={12}>
                    <p>Location: Urban City</p>
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={6} md={6}>
                    <p>Your footprint</p>
                </Col>
                <Col xs={6} md={6}>
                    <p>Average footprint</p>
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={12} md={12}>
                    <ListGroup>
                        <ListGroupItem>
                            <div className='pledge-info'>
                                <p className='pledge-title'>Avoid Straws</p>
                                <p>Say no to plastic straws when you order a drink.</p>
                            </div>
                            <Button>Accept</Button>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className='pledge-info'>
                                <p className='pledge-title'>Go for Paper Bags</p>
                                <p>Ditch plastic bags at the grocery store.</p>
                            </div>
                            <Button>Accept</Button>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className='pledge-info'>
                                <p className='pledge-title'>Use Reusable Water Bottles</p>
                            </div>
                            <Button>Accept</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        </Grid>
      </div>
    )
  }
}