import React from 'react';
import { connect } from 'react-redux';
import './CardSetting.scss';
import PropTypes from 'prop-types';

class CardSetting extends React.Component {
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
    event.preventDefault();

    if (this.state.input !== '') {
      this.props.submitCardTitle(this.state.input, this.props.columnId, this.props.cardId);
    }
  }

  render() {
    return (
      <div className="column">
        <div className="column-inner">
          <div className="card-setting-close">
            <p>Card setting</p>
            <button type="button" onClick={() => this.props.handleCardClicked(this.props.columnId)} className="card-setting-close-button"><i className="fas fa-times" /></button>
          </div>
          <form className="card-setting-form" onSubmit={this.handleSubmit}>
            <input className="card-setting-form-input" type="text" placeholder="New title Card" value={this.state.input} onChange={this.handleChange} />
            <button className="card-setting-form-button" type="submit"><i className="fas fa-check" /></button>
          </form>
          <div className="card-buttons-settings">
            <button onClick={() => this.props.deleteCard(this.props.columnId, this.props.cardId)} className="card-setting-delete-button" type="button">Delete Card</button>
          </div>
        </div>
      </div>
    );
  }
}

CardSetting.propTypes = {
  submitCardTitle: PropTypes.func.isRequired,
  columnId: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  handleCardClicked: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    submitCardTitle: (title, columnId, cardId) => dispatch({
      type: 'SUBMIT_CARD_TITLE', title, columnId, cardId,
    }),
    deleteCard: (columnId, cardId) => dispatch({ type: 'DELETE_CARD', columnId, cardId }),
  };
}

export default connect(null, mapDispatchToProps)(CardSetting);
