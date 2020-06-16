import React from 'react';
import PropTypes from 'prop-types';
import './EditCardTitle.scss';

const EditCardTitle = (props) => {
  const change = props.changeTag;
  let inputOrP = <p>{props.cardTitle}</p>;

  if (!props.isChangedTag) {
    if (change) {
      inputOrP = (
        <form onSubmit={props.handleSubmit} className="card-form">
          <input
            type="text"
            onChange={props.handleChange}
            value={props.cardTitle}
            placeholder="write card title"
            className="card-input"
          />
          <button type="submit" className="fas fa-check card-button-submit" />
        </form>
      );
    }
  }

  return (
    <div className="card">
      {inputOrP}
    </div>
  );
};

EditCardTitle.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isChangedTag: PropTypes.bool.isRequired,
  changeTag: PropTypes.bool.isRequired,
};

export default EditCardTitle;
