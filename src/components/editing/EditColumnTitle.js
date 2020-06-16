import React from 'react';
import PropTypes from 'prop-types';
import './EditColumnTitle.scss';

const EditColumnTitle = (props) => {
  let inputOrH3 = (
    <div className="column-settings-title">
      <h3 className="text-center mt-2 column-title" onClick={props.handleChangeTag}>{props.title}</h3>
      <i className="fas fa-ellipsis-v column-setting" onClick={props.handleSettings} />
    </div>
  );

  if (!props.isChangedTag) {
    if (props.changeTag) {
      inputOrH3 = (
        <div className="column-settings-title">
          <form onSubmit={props.handleSubmit} className="column-settings-form">
            <input
              type="text"
              value={props.title}
              placeholder="write title"
              className="column-input"
              onChange={props.handleChange}
            />
            <button type="submit" className="fas fa-check column-setting-check" />
          </form>
        </div>
      );
    }
  }

  return inputOrH3;
};

EditColumnTitle.propTypes = {
  title: PropTypes.string.isRequired,
  changeTag: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChangeTag: PropTypes.func.isRequired,
  isChangedTag: PropTypes.bool.isRequired,
  handleSettings: PropTypes.func.isRequired,
};

export default EditColumnTitle;
