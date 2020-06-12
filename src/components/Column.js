import React from 'react';
import './Column.scss';
import PropTypes from 'prop-types';
import Card from './Card';

let key = 0;

class Column extends React.Component {
  handleAddCard = () => {
    this.setState({
      cards: this.props.cards.push('new card'),
    });
  }

  render() {
    const classesCardField = ['card-field'];
    const cards = this.props.cards.map((card) => (
      <Card cardText={card} key={`card${key++}`} />
    ));

    if (this.props.cards.length === 0) {
      classesCardField.push('card-field-default');
    }

    return (
      <div className="column bg-primary">
        <h3 className="text-center mt-2">{this.props.title}</h3>
        <div className={classesCardField.join(' ')}>
          {cards}
          <button type="button" className="card-field-button" onClick={this.handleAddCard}>Add new card</button>
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
};

export default Column;
