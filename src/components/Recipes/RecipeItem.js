import React, { Component } from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import withHover from '../withHover';

class RecipeItem extends Component {
  render() {
    return (
      <Link to={`/app/recipes/${this.props.id}`} className="link">
        <ListGroup.Item className={"list-item " + this.props.hoverStyle} 
        onMouseMove={this.props.toggleHoverOn} onMouseLeave={this.props.toggleHoverOff}>
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

export default withHover(RecipeItem);