import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Column from './components/column/Column';
import { moveCardInColumn } from './utilities/dndMoves/dndMoves';
import './App.scss';

class App extends React.Component {
  onDragEnd = (result) => {
    const {
      destination,
      source,
      draggableId,
      type,
    } = result;

    const {
      cards,
      columns,
      columnOrder,
      dispatch,
    } = this.props;

    if (destination === null || source === null) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      dispatch({
        type: 'MOVE_TO',
        from: source.index,
        to: destination.index,
        draggableId,
      });

      const newState = {
        cards,
        columns,
        columnOrder,
      };

      this.setState(newState);
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newState = moveCardInColumn(result, { cards, columns, columnOrder });
      dispatch({
        type: 'MOVE_TO_CARD',
        source,
        destination,
        draggableId,
      });

      this.setState(newState);
      return;
    }

    dispatch({
      type: 'MOVE_CARD_TO_NEW_COLUMN',
      result,
    });
    this.setState({
      newState: 'ready',
    });
  }

  handleAddColumn = () => {
    const {
      dispatch, columns, columnOrder,
    } = this.props;
    dispatch({ type: 'ADD_COLUMN' });
    this.setState({
      columns,
      columnOrder,
    });
  }

  handleDeleteColumn = (columnId) => {
    const { dispatch, columns } = this.props;
    dispatch({ type: 'DELETE_COLUMN', columnId });
    this.setState({
      columns,
    });
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

App.propTypes = {
  cards: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  columnOrder: PropTypes.array.isRequired,
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
