import React from 'react';
import './Card.scss';
import EditCardTitle from './editing/EditCardTitle';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardTitle: '',
      isChangedTag: false,
    };
  }

  handleChangeTag = () => {
    this.setState({
      isChangedTag: !this.state.isChangedTag,
    });
  }

  handleChange = (event) => {
    this.setState({
      cardTitle: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.cardTitle.length > 0) {
      this.setState({
        isChangedTag: true,
      });
    }
  }

  render() {
    const changeTag = true;
    return (
      <EditCardTitle
        cardTitle={this.state.cardTitle}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleChangeTag={this.handleChangeTag}
        isChangedTag={this.state.isChangedTag}
        changeTag={changeTag}
      />
    );
  }
}

export default Card;
