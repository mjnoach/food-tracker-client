import React, { Component } from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class RecipeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
      className: ""
    };
  }

  toggleFocusedOn = () => {
    this.setState({
      mouseOver: true,
      className: "list-item-hover"
    });
  }

  toggleFocusedOff = () => {
    this.setState({
      mouseOver: false,
      className: ""
    });
  }

  render() {
    return (
      <Link to={`/app/recipes/${this.props.id}`} className="link">
        <ListGroup.Item className={"list-item " + this.state.className} 
        onMouseMove={this.toggleFocusedOn} onMouseLeave={this.toggleFocusedOff}>
          <Row className="align-items-center">
            <Col>
              {this.props.name}
            </Col>
          </Row>
        </ListGroup.Item>  
      </Link>
    )
  }
}
