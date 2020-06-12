import React from 'react';
import './Card.scss';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <p>{this.props.cardText}</p>
      </div>
    );
  }
}

Card.propTypes = {
  cardText: PropTypes.string.isRequired,
};

export default Card;
