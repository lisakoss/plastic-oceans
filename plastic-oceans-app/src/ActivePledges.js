import React from 'react';
import './index.css';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col, Container} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class ActivePledges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div>
        <Container>
          <Row className="show-grid">
                <Col xs={12} md={12}>
                    <ListGroup className='active-pledge-list'>
                        <ListGroupItem className='pledge'>
                            <div className='pledge-info'>
                                <p className='pledge-title'>Avoid Straws</p>
                                <p>Say no to plastic straws when you order a drink.</p>
                            </div>
                              <Button>Delete</Button>
                        </ListGroupItem>
                        <ListGroupItem className='pledge'>
                            <div className='pledge-info'>
                                <p className='pledge-title'>Go for Paper Bags</p>
                                <p>Ditch plastic bags at the grocery store.</p>
                            </div>
                            <Button>Delete</Button>
                        </ListGroupItem>
                        <ListGroupItem className='pledge'>
                            <div className='pledge-info'>
                                <p className='pledge-title'>Use Reusable Water Bottles</p>
                            </div>
                            <Button>Delete</Button>
                        </ListGroupItem>
                        <ListGroupItem className='pledge'>
                            <div className='pledge-info'>
                                <p className='pledge-title'>Use Reusable Water Bottles</p>
                            </div>
                            <Button>Delete</Button>
                        </ListGroupItem>
                        <ListGroupItem className='pledge'>
                            <div className='pledge-info'>
                                <p className='pledge-title'>Use Reusable Water Bottles</p>
                            </div>
                            <Button>Delete</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
          </Container>
      </div>
    )
  }
}