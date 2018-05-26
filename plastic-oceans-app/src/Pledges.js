import React from 'react';
import './index.css';
import { Button, Row, Col, Container, Input, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter} from 'reactstrap';

export default class Pledges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            slider: 0,
        }
        this.toggle = this.toggle.bind(this);
        this.acceptPledge = this.acceptPledge.bind(this);
    }  

    toggle() {
        this.setState({
            modal: !this.state.modal,
        }); 
    }

    acceptPledge() {
        this.toggle();
        console.log(this.state.pledge + "accepted");
        console.log(this.state.slider);
    }

    render() {

        return (
        <div>
            <Container>
                <Row>
                    <Col xs="12" md="12">
                        <ListGroup id='pledge-list'>
                            {this.props.pledges.map((pledge) => {
                                return (
                                    <ListGroupItem key={pledge.id} className='pledge'>
                                        <div className='pledge-info'>
                                            <p className='pledge-title'>{pledge.title}</p>
                                            <p>{pledge.desc}</p>
                                        </div>
                                        <Button onClick={() => 
                                            this.setState({modal: !this.state.modal, question: pledge.question, pledge: pledge.id})}>
                                            Accept
                                        </Button>
                                    </ListGroupItem>
                                )
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
                
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalBody>
                    {this.state.question}
                    <div className="slider-value">{this.state.slider}</div>
                    <Input type="range" min="0" max="100" value={this.state.slider} className="slider" onInput={(e) => this.setState({ slider: e.target.value })}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.acceptPledge}>Start</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        )
    }
}