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
            pledge: {}
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
        this.state.pledge.footprintReduction = Math.round(this.state.pledge.weight * this.state.slider * 10)/10;
        this.props.addPledge(this.state.pledge);
    }

    render() {

        return (
        <div>
            <Container id="pledges-container">
                <Row>
                    <Col xs="12" md="12">
                        <ListGroup id='pledge-list'>
                            {this.props.pledges.map((pledge) => {
                                return (
                                    <ListGroupItem key={pledge.id} className='pledge'>
                                        <div className='pledge-info'>
                                        <img src={require("./img/" + pledge.icon + ".png")} alt={pledge.icon + "icon"} className="pledge-icon"/>
                                            <div className="pledge-text">
                                                <p className='pledge-title'>{pledge.title}</p>
                                                <p>{pledge.desc}</p>
                                            </div>
                                        </div>
                                        <Button onClick={() => 
                                            this.setState({
                                                setPledgeModal: !this.state.setPledgeModal, 
                                                pledge: pledge,
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
                    {this.state.pledge.question}
                    <div className="slider-value">{this.state.slider}</div>
                    <Input type="range" min="1" max="50" value={this.state.slider} className="slider" onChange={(e) => this.setState({ slider: e.target.value })}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.acceptPledge}>Start</Button>
                    <Button color="secondary" onClick={this.setPledgeModalToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal id="start-pledge-modal" isOpen={this.state.startPledgeModal} toggle={this.startPledgeModalToggle}>
                <ModalBody>
                    {this.state.pledge.footprintDesc + " " + this.state.pledge.footprintReduction + "g a week."}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.startPledgeModalToggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
        )
    }
}