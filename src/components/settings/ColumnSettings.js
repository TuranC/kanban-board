import React from 'react';
import PropTypes from 'prop-types';

const ColumnSettings = (props) => (
  <div className="column bg-primary">
    <div className="column-settings">
      <div className="column-settings-close">
        <i className="fas fa-times" onClick={props.handleSettings} />
      </div>
      <div className="column-settings-buttons">
        <button className="column-setting-button" id={props.id} onClick={props.handleDeleteColumn}>Delete column</button>
      </div>
    </div>
  </div>
);

ColumnSettings.propTypes = {
  handleSettings: PropTypes.func.isRequired,
  handleDeleteColumn: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default ColumnSettings;
