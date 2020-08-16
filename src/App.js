import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Column from './components/column/Column';
import './App.scss';

class App extends React.Component {
  moveColumn = (result) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'MOVE_TO',
      result,
    });
    this.setState({});
  }

  columnCardMove = (result) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'MOVE_TO_CARD',
      result,
    });
    this.setState({});
  }

  moveCardToNewColumn = (result) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'MOVE_CARD_TO_NEW_COLUMN',
      result,
    });
    this.setState({});
  }

  onDragEnd = (result) => {
    const { destination, source, type } = result;
    const { columns } = this.props;

    if (destination === null || source === null) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      this.moveColumn(result);
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
    if (start === finish) {
      this.columnCardMove(result);
      return;
    }

    this.moveCardToNewColumn(result);
  }

  handleAddColumn = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'ADD_COLUMN' });
    this.setState({});
  }

  handleDeleteColumn = (columnId) => {
    const { dispatch } = this.props;
    dispatch({ type: 'DELETE_COLUMN', columnId });
    this.setState({});
  }

  columnList = () => {
    let columnList;
    const { columns, columnOrder } = this.props;

    if (columnOrder) {
      columnList = columnOrder.map((elemId, index) => {
        const column = columns[elemId];
        return (
          <Column
            key={column.columnId}
            index={index}
            column={column}
            handleDeleteColumn={this.handleDeleteColumn}
          />
        );
      });
    }
    return columnList;
  }

  render() {
    return (
      <div className="app">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="all-Columns" type="column" direction="horizontal">
            {(provided) => (
              <div className="kanban-board" {...provided.droppableProps} ref={provided.innerRef}>
                {this.columnList()}
                {provided.placeholder}
                <button type="button" onClick={this.handleAddColumn} className="kanban-board-add-column-button">
                  Add
                  Column
                </button>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

App.defaultProps = {
  cards: {},
  columns: {},
  columnOrder: [],
};

App.propTypes = {
  cards: PropTypes.objectOf(PropTypes.shape({
    cardId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
  columns: PropTypes.objectOf(PropTypes.shape({
    columnId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cardIds: PropTypes.arrayOf(PropTypes.string),
  })),
  columnOrder: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    cards: state.data.cards,
    columns: state.data.columns,
    columnOrder: state.data.columnOrder,
  };
}

export default connect(mapStateToProps)(App);
