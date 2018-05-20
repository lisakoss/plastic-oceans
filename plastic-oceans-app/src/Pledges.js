import React from 'react';
import './index.css';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col, Container} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Pledges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div>
        {(this.props.list) ? (
            <Container className="list-view">
                <Row>
                    <Col xs="12" md="12">
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
                                    <p>Ditch disposable plastic water bottles</p>
                                </div>
                                <Button>Accept</Button>
                            </ListGroupItem>
                            <ListGroupItem className='pledge'>
                                <div className='pledge-info'>
                                    <p className='pledge-title'>Use Reusable Water Bottles</p>
                                    <p>Ditch disposable plastic water bottles</p>
                                </div>
                                <Button>Accept</Button>
                            </ListGroupItem>
                            <ListGroupItem className='pledge'>
                                <div className='pledge-info'>
                                    <p className='pledge-title'>Use Reusable Water Bottles</p>
                                    <p>Ditch disposable plastic water bottles</p>
                                </div>
                                <Button>Accept</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        ):(
            <Container className="card-view">
                <Row>
                    <Col xs="6" sm="6" md="3" className="card-container">
                        <Card>
                            <CardBody>
                            <CardTitle>PLEDGE</CardTitle>
                            <CardSubtitle>Avoid Straws</CardSubtitle>
                            <CardText>Say no to plastic straws when you order a drink.</CardText>
                            <Button>Accept</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>)}
      </div>
    )
  }
}