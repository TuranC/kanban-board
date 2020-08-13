import React from 'react';
import { connect } from 'react-redux';
import './ColumnSettings.scss';
import PropTypes from 'prop-types';

const ColumnSettings = ({
  column,
  provided,
  handleSettingsColumnClicked,
  handleDeleteColumn,
}) => (
  <div className="column-settings">
    <div className="column-title-and-close">
      <h3 {...provided.dragHandleProps} className="column-settings-title">
        {column.title}
        {' '}
        settings
      </h3>
      <button type="button" onClick={handleSettingsColumnClicked} className="column-settings-close-button">
        <i className="fas fa-times" />
      </button>
    </div>
    <div className="column-settings-parameters">
      <button type="button" onClick={() => handleDeleteColumn(column.columnId)} className="column-settings-parameters-delete">
        Delete
        column
      </button>
    </div>
  </div>
);

ColumnSettings.propTypes = {
  provided: PropTypes.object.isRequired,
  column: PropTypes.shape({
    cardIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    columnId: PropTypes.string.isRequired,
  }),
  handleSettingsColumnClicked: PropTypes.func.isRequired,
  handleDeleteColumn: PropTypes.func.isRequired,
};

export default connect()(ColumnSettings);
