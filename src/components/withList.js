import React from 'react';
import update from 'immutability-helper';

const withList = Component =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        focusLocked: false
      }
    }

    removeItemFromList = (deletedId, array) => {
      const updatedArray = array.filter(item => item.id !== deletedId);
      return updatedArray;
    }

    addItemToList = (item, array, sortByName = true) => {
      console.log(Component.state);
      const updatedArray = update(array, {$push: [item]});
      sortByName && this.sortItemsByName(updatedArray);
      return updatedArray;
    }

    sortItemsByName = (array) => {
      array.sort((a,b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }

    toggleItemFocus = () => {
      this.setState({focusLocked: !this.state.focusLocked});
    }

    render() {
      return (
        <Component {...this.props} toggleItemFocus={this.toggleItemFocus} focusLocked={this.state.focusLocked}
        addItemToList={this.addItemToList} removeItemFromList={this.removeItemFromList}/>
      )
    }
  }

export default withList;