import React from 'react';
import './Card.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Card extends React.Component {
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
    this.props.submitCardTitle(this.state.input, this.props.columnId, this.props.cardId);
  }

  render() {
    const card = this.props.columns.get(this.props.columnId).cards.get(this.props.cardId);

    const input = (
      <form onSubmit={this.handleSubmit}>
        <input placeholder="Card title" onChange={this.handleChange} value={this.state.input} type="text" />
        <button type="submit"><i className="fas fa-check" /></button>
      </form>
    );

    return (
      <div className="card">
        <div className="card-title-and-settings">
          { card.title === '' ? input : <p onClick={() => this.props.handleCardClicked(this.props.cardId)}>{card.title}</p>}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  submitCardTitle: PropTypes.func.isRequired,
  columnId: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  columns: PropTypes.object,
  handleCardClicked: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    columns: state.appReducer.columns,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitCardTitle: (title, columnId, cardId) => dispatch({
      type: 'SUBMIT_CARD_TITLE', title, columnId, cardId,
    }),
    cardClicked: (id) => dispatch({ type: 'CARD_CLICKED', id }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
