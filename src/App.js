import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.scss';

const App = (props) => {
  const columns = [];
  props.columns.forEach((col) => columns.push(col.component));

  return (
    <div className="bg-primary app-kanban-board">
      <div className="kanban-board">
        <div className="kanban-board-columns">
          {columns}
          <button type="button" className="kanban-board-button" onClick={props.addColumn}>
            <i className="fas fa-plus" />
            &nbsp;
            Add Column
          </button>
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  columns: PropTypes.object.isRequired,
  addColumn: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    columns: state.appReducer.columns,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addColumn: () => dispatch({ type: 'ADD_COLUMN' }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
