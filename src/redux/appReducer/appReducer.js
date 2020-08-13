import {
  addColumnDB,
  deleteColumnDB,
  moveToDB,
  setColumnTitleDB,
  addCardDB,
  deleteCardDB,
  moveCardToDB,
  moveCardToNewColumnDB,
  setCardTitleDB,
} from '../../db/DB';

function hasTitle(columns) {
  for (const key in columns) {
    if (columns[key].title.length === 0) {
      return false;
    }
  }
  return true;
}

function addColumn(state) {
  const newState = { ...state };
  const columnId = `column-${Math.floor(Math.random() * 1000000)}`;

  const newColumn = {
    columnId,
    title: '',
    cardIds: [],
  };

  if (hasTitle(newState.columns)) {
    addColumnDB(newColumn);
    newState.columns[columnId] = newColumn;
    newState.columnOrder.push(columnId);
  }
  return newState;
}

function moveTo(state, from, to, draggableId) {
  const newState = { ...state };
  newState.columnOrder.splice(from, 1);
  newState.columnOrder.splice(to, 0, draggableId);
  moveToDB(newState.columnOrder);
  return newState;
}

function setColumnTitle(state, columnId, newTitle) {
  const newState = { ...state };
  newState.columns[columnId].title = newTitle;
  setColumnTitleDB(columnId, newTitle);
  return newState;
}

function deleteColumn(state, columnId) {
  const newState = { ...state };

  deleteColumnDB(columnId, newState.columnOrder.indexOf(columnId));
  delete newState.columns[columnId];
  newState.columnOrder.splice(newState.columnOrder.indexOf(columnId), 1);
  return newState;
}

function hasCardTitle(cards, column) {
  const has = true;

  const columnCards = column.cardIds;
  for (const elem of columnCards) {
    if (cards[elem].content === '') {
      return false;
    }
  }
  return has;
}

function addCard(state, columnId) {
  const newState = { ...state };
  const cardId = `card-${Math.floor(Math.random() * 1000000)}`;
  const newCard = {
    cardId,
    content: '',
  };

  if (hasCardTitle(state.cards, state.columns[columnId])) {
    addCardDB(columnId, newCard);
    newState.cards[cardId] = newCard;
    newState.columns[columnId].cardIds.push(cardId);
  }

  return newState;
}

function deleteCard(state, columnId, cardId) {
  const newState = { ...state };
  const position = newState.columns[columnId].cardIds.indexOf(cardId);
  newState.columns[columnId].cardIds.splice(position, 1);
  delete newState.cards[cardId];

  deleteCardDB(columnId, cardId, position);
  return newState;
}

function moveToCard(state, source, destination, draggableId) {
  const start = state.columns[source.droppableId];
  const finish = state.columns[destination.droppableId];

  if (start === finish) {
    const newCardIds = Array.from(start.cardIds);
    newCardIds.splice(source.index, 1);
    newCardIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...start,
      cardIds: newCardIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.columnId]: newColumn,
      },
    };

    moveCardToDB(newColumn);
    return newState;
  }
  return state;
}

function moveCardToNewColumn(state, result) {
  const { source, destination, draggableId } = result;
  const { columns, cards, columnOrder } = state;

  const start = columns[source.droppableId];
  const finish = columns[destination.droppableId];

  const startCardIds = Array.from(start.cardIds);
  startCardIds.splice(source.index, 1);

  const newStart = {
    ...start,
    cardIds: startCardIds,
  };

  const finishCardIds = Array.from(finish.cardIds);
  finishCardIds.splice(destination.index, 0, draggableId);

  const newFinish = {
    ...finish,
    cardIds: finishCardIds,
  };

  const newState = {
    cards,
    columns: {
      ...columns,
      [newStart.columnId]: newStart,
      [newFinish.columnId]: newFinish,
    },
    columnOrder,
  };

  moveCardToNewColumnDB(newStart, newFinish);
  return newState;
}

function setCardTitle(state, id, newTitle) {
  const newState = { ...state };
  newState.cards[id].content = newTitle;
  setCardTitleDB(id, newTitle);
  return newState;
}

export default function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_COLUMN': return {
      data: addColumn(state.data),
    };
    case 'ADD_CARD': return {
      data: addCard(state.data, action.columnId),
    };
    case 'DELETE_COLUMN': return {
      data: deleteColumn(state.data, action.columnId),
    };
    case 'DELETE_CARD': return {
      data: deleteCard(state.data, action.columnId, action.cardId),
    };
    case 'MOVE_TO': return {
      data: moveTo(state.data, action.from, action.to, action.draggableId),
    };
    case 'MOVE_TO_CARD': return {
      data: moveToCard(state.data, action.source, action.destination, action.draggableId),
    };
    case 'MOVE_CARD_TO_NEW_COLUMN': return {
      data: moveCardToNewColumn(state.data, action.result),
    };
    case 'SET_COLUMN_TITLE': return {
      data: setColumnTitle(state.data, action.id, action.newTitle),
    };
    case 'SET_CARD_TITLE': return {
      data: setCardTitle(state.data, action.id, action.newTitle),
    };
    default: return state;
  }
}
