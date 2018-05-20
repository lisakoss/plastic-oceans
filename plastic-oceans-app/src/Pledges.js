import React from 'react';
import './index.css';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col, Container} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Pledges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        }
        this.toggle = this.toggle.bind(this);
    }  

    toggle() {
        this.setState({
        modal: !this.state.modal
        }); 
    }

    render() {

        return (
        <div>
            {(this.props.list) ? (
                <Container className="list-view">
                    <Row>
                        <Col xs="12" md="12">
                            <ListGroup className='pledge-list'>
                                {this.props.pledges.map((pledge) => {
                                    return (
                                        <ListGroupItem key={pledge.id} className='pledge'>
                                            <div className='pledge-info'>
                                                <p className='pledge-title'>{pledge.title}</p>
                                                <p>{pledge.desc}</p>
                                            </div>
                                            <Button onClick={this.toggle}>Accept</Button>
                                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                                <ModalHeader toggle={this.toggle}>How many plastic straws will you avoid this week?</ModalHeader>
                                                <ModalBody>
                                                    pledge
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary" onClick={this.toggle}>Start</Button>
                                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                                </ModalFooter>
                                            </Modal>
                                        </ListGroupItem>
                                    )
                                })}
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