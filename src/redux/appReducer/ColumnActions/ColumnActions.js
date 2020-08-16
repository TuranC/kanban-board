import * as DB from '../../../DB/DB';

class ColumnActions {
  static hasTitle(columns) {
    let has = true;
    Object.keys(columns).forEach((elem) => {
      if (columns[elem].title.length === 0) {
        has = false;
      }
    });
    return has;
  }

  static addColumn(state) {
    const newState = { ...state };
    const columnId = `column-${Math.floor(Math.random() * 1000000)}`;

    const newColumn = {
      columnId,
      title: '',
      cardIds: [],
    };

    if (this.hasTitle(newState.columns)) {
      DB.addColumnDB(newColumn);
      newState.columns[columnId] = newColumn;
      newState.columnOrder.push(columnId);
    }
    return newState;
  }

  static moveTo(state, result) {
    const newState = { ...state };
    const { source, destination, draggableId } = result;
    newState.columnOrder.splice(source.index, 1);
    newState.columnOrder.splice(destination.index, 0, draggableId);
    DB.moveToDB(newState.columnOrder);
    return newState;
  }

  static setColumnTitle(state, columnId, newTitle) {
    const newState = { ...state };
    newState.columns[columnId].title = newTitle;
    DB.setColumnTitleDB(columnId, newTitle);
    return newState;
  }

  static deleteColumn(state, columnId) {
    const newState = { ...state };

    DB.deleteColumnDB(columnId, newState.columnOrder.indexOf(columnId));
    delete newState.columns[columnId];
    newState.columnOrder.splice(newState.columnOrder.indexOf(columnId), 1);
    return newState;
  }
}

export default ColumnActions;
