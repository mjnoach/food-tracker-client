import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Day from './Day';
import MealForm from './MealForm';
import '../../stylesheets/meal-plan.css';

const weekdays = ["Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default class MealPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealPlan: {
        Monday: [],
        Teusday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
      }
    };
  }

  componentDidMount() {
    this.fetchMeals();
  }

  fetchMeals = () => {
    axios.get('/meals')
      .then(response => {
        const mealPlan = this.state.mealPlan;
        for (const day in response.data)
          mealPlan[day] = response.data[day];
        this.setState({mealPlan: mealPlan});
      });
  }

  addMealToList = (meal) => {
    const mealPlan = this.state.mealPlan;
    mealPlan[meal.day].push(meal);
    this.setState({mealPlan: mealPlan});
  }

  render() {
    const days = weekdays.map(weekday =>
      <option key={weekday}>{weekday}</option>
    );
    const mealPlan = [];
    for (const day in this.state.mealPlan) {
      mealPlan.push(<Day key={day} day={day} meals={this.state.mealPlan[day]} />);
    };

    return (
      <Container className="meal-plan">
        <MealForm days={days} addMealToList={this.addMealToList}/>
        {mealPlan}
      </Container>
    )
  }
}

