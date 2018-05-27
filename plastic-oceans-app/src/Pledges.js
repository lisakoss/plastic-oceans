import React from 'react';
import './index.css';
import { Button, Row, Col, Container, Input, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter} from 'reactstrap';

export default class Pledges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setPledgeModal: false,
            startPledgeModal: false,
            slider: 0,
        }
        this.setPledgeModalToggle = this.setPledgeModalToggle.bind(this);
        this.startPledgeModalToggle = this.startPledgeModalToggle.bind(this);
        this.acceptPledge = this.acceptPledge.bind(this);
    }  

    // Pledge slider modal toggle
    // Modal appears when user clicks accept on a pledge
    setPledgeModalToggle() {
        this.setState({
            setPledgeModal: !this.state.setPledgeModal,
        }); 
    }

    // Pledge info modal toggle
    // Modal appears after user starts pledge
    startPledgeModalToggle() {
        this.setState({
            startPledgeModal: !this.state.startPledgeModal,
        }); 
    }

    // Called when user starts a pledge
    acceptPledge() {
        this.setPledgeModalToggle();
        this.startPledgeModalToggle();
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
                                            this.setState({
                                                setPledgeModal: !this.state.setPledgeModal, 
                                                question: pledge.question, 
                                                pledge: pledge.id,
                                                footprintDesc: pledge.footprintDesc,
                                                weight: pledge.weight,
                                                slider: 0
                                            })}>
                                            Accept
                                        </Button>
                                    </ListGroupItem>
                                )
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
            
            <Modal id="set-pledge-modal" isOpen={this.state.setPledgeModal} toggle={this.setPledgeModalToggle}>
                <ModalBody>
                    {this.state.question}
                    <div className="slider-value">{this.state.slider}</div>
                    <Input type="range" min="0" max="100" value={this.state.slider} className="slider" onInput={(e) => this.setState({ slider: e.target.value })}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.acceptPledge}>Start</Button>
                    <Button color="secondary" onClick={this.setPledgeModalToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal id="start-pledge-modal" isOpen={this.state.startPledgeModal} toggle={this.startPledgeModalToggle}>
                <ModalBody>
                    {this.state.footprintDesc + " " + (this.state.weight * this.state.slider) + "g a week."}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.startPledgeModalToggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
        )
    }
}