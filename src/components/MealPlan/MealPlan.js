import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Day from './Day';
import MealForm from './MealForm';
import '../../stylesheets/meal-plan.css';

export default class MealPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: []
    };
  }

  componentDidMount() {
    this.fetchMeals();
  }

  fetchMeals = () => {
    axios.get('/meals')
      .then(response => {
        const meals = this.groupByDay(response.data);
        this.setState({meals: meals});
        console.log(this.state.meals);
      });
  }

  groupByDay = (mealsArray) => {
    return mealsArray.reduce((groupedMeals, meal) => {
      (groupedMeals[meal.day] = groupedMeals[meal.day] || []).push(meal);
      return groupedMeals;
    }, {});
  };

  render() {
    const weekdays = ["Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const days = weekdays.map(weekday => {
      return <option key={weekday}>{weekday}</option>
    });
    const mealPlan = weekdays.map(weekday => {
      return <Day key={weekday} day={weekday} meals={this.state.meals[weekday]} />
    });

    return (
      <Container className="meal-plan">
        <MealForm days={days} />
        {mealPlan}
      </Container>
    )
  }
}