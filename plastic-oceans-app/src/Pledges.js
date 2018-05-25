import React from 'react';
import './index.css';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col, Container} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Carousel from './Carousel'

export default class Pledges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            slider: 0,
            cards: []
        }
        this.toggle = this.toggle.bind(this);
    }  

    toggle(question) {
        this.setState({
            modal: !this.state.modal,
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
                                            <Button onClick={() => this.setState({modal: !this.state.modal, question: pledge.question })}>
                                                Accept
                                            </Button>
                                        </ListGroupItem>
                                    )
                                })}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            ):(
                <Container className="card-view">
                    {this.props.pledges.map((pledge) => {
                        this.state.cards.push(
                            <Card>
                                <CardBody>
                                    <CardTitle>PLEDGE</CardTitle>
                                    <CardSubtitle>{pledge.title}</CardSubtitle>
                                    <CardText>{pledge.desc}</CardText>
                                    <Button onClick={() => this.setState({modal: !this.state.modal, question: pledge.question })}>
                                        Accept
                                    </Button>
                                </CardBody>
                            </Card>
                        );
                    })}
                    <Carousel 
                        cards={this.state.cards}
                    />
                </Container>)}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.state.question}</ModalHeader>
                    <ModalBody>
                        pledge slider
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Start</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
        </div>
        )
    }
}