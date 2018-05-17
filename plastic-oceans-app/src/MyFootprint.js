import React from 'react';
import './index.css';
import {Grid, Row, Col, ListGroup, ListGroupItem, Button, SplitButton, MenuItem, Carousel} from 'react-bootstrap'
import { Card, CardText, CardBody,CardTitle, CardSubtitle } from 'reactstrap';

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
                    <p className="my-footprint-title">Location: Urban City</p>
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={6} md={6} className='footprint'>
                    <p>Your footprint</p>
                </Col>
                <Col xs={6} md={6} className='footprint'>
                    <p>Average footprint</p>
                </Col>
            </Row>
        </Grid>
        {/* Pledges */}
        <Grid className="my-footprint-pledges">
            <Row className="show-grid" id="my-footprint-pledges-header">
                <Col xs={6} md={6}>
                    <p className="my-footprint-title">Pledges</p>
                </Col>
                <Col xs={6} md={6}>
                    <SplitButton title="View">
                        <MenuItem>Block</MenuItem>
                        <MenuItem>List</MenuItem>
                    </SplitButton>
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={12} md={12}>
                    <ListGroup className='pledge-list'>
                        <ListGroupItem className='pledge'>
                            <div className='pledge-info'>
                                <p className='pledge-title'>Avoid Straws</p>
                                <p>Say no to plastic straws when you order a drink.</p>
                            </div>
                            <Button>Accept</Button>
                        </ListGroupItem>
                        <ListGroupItem className='pledge'>
                            <div className='pledge-info'>
                                <p className='pledge-title'>Go for Paper Bags</p>
                                <p>Ditch plastic bags at the grocery store.</p>
                            </div>
                            <Button>Accept</Button>
                        </ListGroupItem>
                        <ListGroupItem className='pledge'>
                            <div className='pledge-info'>
                                <p className='pledge-title'>Use Reusable Water Bottles</p>
                            </div>
                            <Button>Accept</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
            {/*<Row className="show-grid">
                <Col xs={12} md={12}>
                    <Card>
                        <CardBody>
                        <CardTitle>PLEDGE</CardTitle>
                        <CardSubtitle>Avoid Straws</CardSubtitle>
                        <CardText>Say no to plastic straws when you order a drink.</CardText>
                        <Button>Accept</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>*/}
        </Grid>
      </div>
    )
  }
}