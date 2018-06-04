import React from 'react';
import './index.css';
import { Button, Row, Col, Container, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter} from 'reactstrap';

export default class ActivePledges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deletePledgeModal: false,
        }
        this.deletePledgeModalToggle = this.deletePledgeModalToggle.bind(this);
        this.deletePledge = this.deletePledge.bind(this);
    }     

    // Toggles delete pledge modal
    deletePledgeModalToggle() {
        this.setState({
            deletePledgeModal: !this.state.deletePledgeModal
        }); 
    }

    // Called when user deletes pledge
    deletePledge() {
        this.deletePledgeModalToggle();
        this.props.deletePledge(this.state.pledge);
    }

    render() {
        return (
            <div>
                <Container id="active-pledges-container">
                    <Row>
                        <Col xs="12" md="12">
                            <ListGroup id='active-pledge-list'>
                                {this.props.pledges.map((pledge) => {
                                    return (
                                        <ListGroupItem key={pledge.id} className='pledge'>
                                            <div className='pledge-info'>
                                                <img src={require("./img/" + pledge.icon + ".png")} alt={pledge.icon + "icon"} className="pledge-icon"/>
                                                <div className="pledge-text">
                                                    <p className='pledge-title'>{pledge.title}</p>
                                                    <p>{pledge.desc}</p>
                                                    <p>{"-" + pledge.footprintReduction + "g/week"}</p>
                                                </div>
                                            </div>
                                            <Button onClick={() =>
                                                this.setState({
                                                    deletePledgeModal: !this.state.deletePledgeModal,
                                                    pledge: pledge
                                                })}>
                                                Delete
                                            </Button>
                                        </ListGroupItem>
                                    )
                                })}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
                <Modal isOpen={this.state.deletePledgeModal} toggle={this.deletePledgeModalToggle}>
                    <ModalBody>Are you sure you want to remove this pledge?</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.deletePledge}>Delete</Button>
                        <Button color="secondary" onClick={this.deletePledgeModalToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}