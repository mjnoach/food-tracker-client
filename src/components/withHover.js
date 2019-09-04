import React from 'react';

const withHover = Component =>
  class withHover extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        mouseOver: false,
        className: ""
      }
    }

    lockFocus = () => {
      if (!this.props.focusLocked)
        this.props.toggleItemFocus();
    }

    unlockFocus = () => {
      this.props.toggleItemFocus();
      this.setState({
        mouseOver: false,
        className: ""
      });
    }

    toggleHoverOn = () => {
      if (!this.props.focusLocked)
        this.setState({
          mouseOver: true,
          className: "list-item-hover"
        });
    }

    toggleHoverOff = () => {
      if (!this.props.focusLocked)
        this.setState({
          mouseOver: false,
          className: ""
        });
    }

    render() {
      return (
        <Component {...this.props} mouseOver={this.state.mouseOver} hoverStyle={this.state.className}
        toggleHoverOn={this.toggleHoverOn} toggleHoverOff={this.toggleHoverOff}
        lockFocus={this.lockFocus} unlockFocus={this.unlockFocus}/>
      )
    }
  }

export default withHover;