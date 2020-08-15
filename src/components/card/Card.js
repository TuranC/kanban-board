import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import CardInput from './cardInput/CardInput';
import './Card.scss';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseOn: true,
      formOrTitle: true,
    };
  }

  handleMouseOver = () => {
    this.setState({
      mouseOn: false,
    });
  }

  handleMouseOut = () => {
    this.setState({
      mouseOn: true,
    });
  }

  handleEditCard = (isClicked) => {
    this.setState({
      formOrTitle: !isClicked,
    });
  }

  handleInputOrTitle = () => {
    const { card } = this.props;
    const { formOrTitle } = this.state;
    if (card.content !== '') {
      if (formOrTitle === false) {
        return false;
      }
      return true;
    }

    if (card.content === '') {
      if (formOrTitle === true) {
        return false;
      }
      return true;
    }
    return false;
  }

  render() {
    const { card, index, handleDeleteCard } = this.props;
    const { mouseOn } = this.state;
    return (
      <Draggable draggableId={card.cardId} index={index}>
        {(provided) => (
          <div>
            {this.handleInputOrTitle() ? (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="card"
                onMouseOver={this.handleMouseOver}
                onFocus={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                onBlur={this.handleMouseOut}
              >
                <p>{card.content}</p>
                <div className="card-buttons">
                  <button
                    type="button"
                    onClick={() => this.handleEditCard(true)}
                    className="card-btn"
                    hidden={mouseOn}
                  >
                    <i className="fas fa-edit" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCard(card.cardId)}
                    className="card-btn"
                    hidden={mouseOn}
                  >
                    <i className="fas fa-trash-alt" />
                  </button>
                </div>
              </div>
            ) : <CardInput provided={provided} card={card} handleEditCard={this.handleEditCard} />}
          </div>
        )}
      </Draggable>
    );
  }
}

Card.defaultProps = {
  card: {
    cardId: '',
    content: '',
  },
};

Card.propTypes = {
  card: PropTypes.shape({
    cardId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
  handleDeleteCard: PropTypes.func.isRequired,
};

export default connect()(Card);
