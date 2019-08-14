import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const RecipeItem = ({id, name}) =>
    <Link to={`/app/recipes/${id}`} className="recipe-item-link">
      <ListGroup.Item className="recipe-item">
        <Row className="align-items-center">
          <Col>
            {name}
          </Col>
        </Row>
      </ListGroup.Item>  
    </Link>
