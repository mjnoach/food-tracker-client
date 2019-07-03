import React, { Component } from 'react';
import update from 'immutability-helper';
import { axiosInstance } from '../App.js';
import { Container, Table } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';

export default class Supplies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplies: []
    };
  }  

  handleSubmit = (e) => {
    e.preventDefault();
    let itemName = this.itemName.value.charAt(0).toUpperCase() + this.itemName.value.slice(1).toLowerCase();
    axiosInstance.post('/food_items', {
      name: itemName,
      quantity: parseInt(this.quantity.value, 10)
    })
      .then(response => {
        console.log('POST /food_items\n', response);
        this.updateSuppliesList(response.data);
      })
      .catch(error => {
        console.log('POST /food_items\n', error.response.data.errors);
      });
  }

  componentDidMount() {
    axiosInstance.get('/food_items')
      .then(response => {
        console.log('GET /food_items\n', response);
        this.setState({supplies: response.data})
      })
      .catch(error => {
        console.log('GET /food_items\n', error.response.data);
        // console.log('GET /food_items\n', error);
        // if (error.response.data.errors === 'Signature has expired') {          
        //   sessionStorage.clear();
        //   alert('Your session has expired\nPlease log in.');
          this.props.history.push('/');
        // }
      });
  }

  updateSuppliesList = (item) => {
    const supplies = update(this.state.supplies, {$push: [item]});
    this.setState({supplies: supplies.sort(function(a,b) {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    })});
  }

  render() {
    let items = this.state.supplies.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>+ / -</td>
        </tr>
      )
    });

    return (
      <div>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Current supply</th>
                  <th>Action</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td>
                    <Form.Control size="sm" type="text" placeholder="name" ref={input => this.itemName = input} />
                  </td>
                  <td>
                    <Form.Control size="sm" type="number" placeholder="quantity" ref={input => this.quantity = input} defaultValue="1" />
                  </td>
                  <td>
                    <Button size="sm" variant="primary" type="submit">create</Button>
                  </td>
                </tr>
              </thead>
              <tbody>
                { items }
              </tbody>
            </Table>
          </Form>                  
        </Container>
      </div>
    )
  }
}