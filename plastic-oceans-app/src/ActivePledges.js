import React from 'react';
import './index.css';
import { Button, Row, Col, Container, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter} from 'reactstrap';

export default class ActivePledges extends React.Component {
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
            <Container>
                <Row>
                    <Col xs={12} md={12}>
                        <ListGroup id='active-pledge-list'>
                            {this.props.pledges.map((pledge) => {
                                return (
                                    <ListGroupItem key={pledge.id} className='pledge'>
                                        <div className='pledge-info'>
                                            <p className='pledge-title'>{pledge.title}</p>
                                            <p>{pledge.desc}</p>
                                        </div>
                                        <Button onClick={this.toggle}>Delete</Button>
                                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                            <ModalBody>Are you sure you want to remove this pledge?</ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.toggle}>Delete</Button>
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
            </div>
        )
    }
}