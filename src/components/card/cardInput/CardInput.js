import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './CardInput.scss';

class CardInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  }

  handleSubmit = (event) => {
    const { input } = this.state;
    const { dispatch, card, handleEditCard } = this.props;
    if (input.length > 0) {
      dispatch({
        type: 'SET_CARD_TITLE',
        id: card.cardId,
        newTitle: input,
      });

      this.setState({
        input,
      });
    }
    handleEditCard(false);
    event.preventDefault();
  }

  render() {
    const { provided, card } = this.props;
    const { input } = this.state;
    return (
      <div
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
        className="card"
      >
        <form className="card-form" onSubmit={this.handleSubmit}>
          <input
            className="card-form-input"
            type="text"
            value={input}
            onChange={this.handleChange}
            placeholder={card.content === '' ? 'new card Title' : card.content}
          />
          <button type="submit" className="card-form-button"><i className="fas fa-check" /></button>
        </form>
      </div>
    );
  }
}

CardInput.propTypes = {
  card: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  handleEditCard: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(CardInput);
