import React from 'react';
import { connect } from 'react-redux';
import './ColumnSetting.scss';
import PropTypes from 'prop-types';

const ColumnSetting = (props) => {
  const column = props.columns.get(props.columnId);

  return (
    <div className="column">
      <div className="column-inner">
        <div className="column-setting-info">
          <h1 className="column-setting-title">{column.title}</h1>
          <button type="button" onClick={props.handleClickedSetting} className="column-setting-button"><i className="fas fa-times" /></button>
        </div>
        <div className="column-setting">
          <button type="button" onClick={() => props.deleteColumn(props.columnId)} className="column-setting-button delete">Delete Column</button>
        </div>
      </div>
    </div>
  );
};

ColumnSetting.propTypes = {
  columnId: PropTypes.string.isRequired,
  columns: PropTypes.object,
  handleClickedSetting: PropTypes.func.isRequired,
  deleteColumn: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    columns: state.appReducer.columns,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteColumn: (id) => dispatch({ type: 'DELETE_COLUMN', id }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnSetting);
