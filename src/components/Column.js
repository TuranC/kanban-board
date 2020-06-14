import React from 'react';
import './Column.scss';
import Card from './Card';
import EditColumnTitle from './editing/EditColumnTitle';

let key = 0;

class Column extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      cards: [],
      isChangedTag: false,
    };
  }

  handleAddCard = () => {
    const { cards } = this.state;

    cards.push(<Card key={`card${key++}`} />);

    this.setState({
      cards,
    });
  }

  handleChangeTag = () => {
    this.setState({
      isChangedTag: !this.state.isChangedTag,
    });
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.title.length > 0) {
      this.setState({
        isChangedTag: true,
      });
    }
  }

  render() {
    const classesCardField = ['card-field'];
    const cards = this.state.cards.map((card) => card);

    if (this.state.cards.length === 0) {
      classesCardField.push('card-field-default');
    }
    const changeTag = true;

    return (
      <div className="column bg-primary">
        <EditColumnTitle
          title={this.state.title}
          changeTag={changeTag}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleChangeTag={this.handleChangeTag}
          isChangedTag={this.state.isChangedTag}
        />
        <div className={classesCardField.join(' ')}>
          {cards}
          <button type="button" className="card-field-button" onClick={this.handleAddCard}>Add new card</button>
        </div>
      </div>
    );
  }
}

export default Column;
