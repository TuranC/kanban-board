import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ColumnInput.scss';

class ColumnInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };
  }

  handleChange = (event) => {
    const { input } = this.state;
    if (input.length < 40) {
      this.setState({
        input: event.target.value,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { handleEditingColumnTitle, dispatch, column } = this.props;
    const { input } = this.state;

    handleEditingColumnTitle(false);
    if (input !== '') {
      dispatch({ type: 'SET_COLUMN_TITLE', id: column.columnId, newTitle: input });
    }
  }

  render() {
    const { provided, column, children } = this.props;
    const { input } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} {...provided.dragHandleProps} className="column-form">
          <input
            type="text"
            onChange={this.handleChange}
            value={input}
            className="column-form-input"
            placeholder={column.title === '' ? 'New Title' : column.title}
          />
          <button type="submit" className="column-form-button"><i className="fas fa-check" /></button>
        </form>
        {children}
      </>
    );
  }
}

ColumnInput.propTypes = {
  handleEditingColumnTitle: PropTypes.func.isRequired,
  provided: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ColumnInput);
