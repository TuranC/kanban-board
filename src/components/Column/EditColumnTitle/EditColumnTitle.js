import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './EditColumnTitle.scss';

class EditColumnTitle extends React.Component {
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
      this.props.handleEditTitleClicked();
      this.props.submitTitle(this.state.input, this.props.columnId);
    }
  }

  render() {
    const column = this.props.columns.get(this.props.columnId);
    let inputOrTitle = (
      <>
        <form className="column-title-and-setting-form" onSubmit={this.handleSubmit}>
          <input placeholder="Name Column" className="form-input" type="text" value={this.state.input} onChange={this.handleChange} />
          <button className="form-button" type="submit"><i className="fas fa-check" /></button>
        </form>
      </>
    );

    if (!this.props.editTitleClicked) {
      inputOrTitle = (
        <>
          <h1 onClick={this.props.handleEditTitleClicked} className="text-dark title">{column.title}</h1>
          <i onClick={this.props.handleClickedSetting} className="fas fa-ellipsis-h settings" />
        </>
      );
    }
    return inputOrTitle;
  }
}

EditColumnTitle.propTypes = {
  columnId: PropTypes.string.isRequired,
  columns: PropTypes.object.isRequired,
  submitTitle: PropTypes.func.isRequired,
  handleClickedSetting: PropTypes.func.isRequired,
  handleEditTitleClicked: PropTypes.func.isRequired,
  editTitleClicked: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    columns: state.appReducer.columns,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitTitle: (title, id) => dispatch({ type: 'SUBMIT_TITLE', title, id }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditColumnTitle);
