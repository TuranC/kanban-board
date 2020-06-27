import React from 'react';
import Column from '../../components/Column/Column';

function copyColumn(columns) {
  const copy = new Map();
  for (const elem of columns) {
    copy.set(elem[0], elem[1]);
  }
  return copy;
}

function hasAllColumnsTitle(columns) {
  let result = true;
  for (const col of columns) {
    if (col[1].title === '') {
      result = false;
      break;
    }
  }
  return result;
}

function addCard(columns, card, columnId, cardId) {
  const modifiedState = copyColumn(columns);

  if (!modifiedState.get(columnId).cards.has(cardId)) {
    const newCard = {
      title: '',
      component: card,
    };
    modifiedState.get(columnId).cards.set(cardId, newCard);
  }
  return modifiedState;
}

function addColumn(columns) {
  const modifiedState = copyColumn(columns);
  if (hasAllColumnsTitle(modifiedState)) {
    const id = `Column:${Math.floor(Math.random() * 1000000)}`;
    if (!modifiedState.has(id)) {
      const columnState = {
        title: '',
        id,
        cards: new Map(),
        cardSettingsClicked: false,
      };
      columnState.component = <Column key={id} columnId={id} />;
      modifiedState.set(id, columnState);
    }
  }
  return modifiedState;
}

function submitTitle(columns, title, id) {
  const modifiedState = copyColumn(columns);
  modifiedState.get(id).title = title;
  return modifiedState;
}

function deleteColumn(columns, id) {
  const modifiedState = copyColumn(columns);
  modifiedState.delete(id);
  return modifiedState;
}

function cardClicked(columns, id) {
  const modifiedState = copyColumn(columns);
  modifiedState.get(id).cardSettingsClicked = !modifiedState.get(id).cardSettingsClicked;
  return modifiedState;
}

function submitCardTitle(columns, title, columnId, cardId) {
  const modifiedState = copyColumn(columns);
  modifiedState.get(columnId).cards.get(cardId).title = title;
  return modifiedState;
}

function deleteCard(columns, columnId, cardId) {
  const modifiedState = copyColumn(columns);
  modifiedState.get(columnId).cards.delete(cardId);
  modifiedState.get(columnId).cardSettingsClicked = !modifiedState.get(columnId).cardSettingsClicked;
  return modifiedState;
}

const initialState = {
  columns: new Map(),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COLUMN': return {
      columns: addColumn(state.columns),
    };
    case 'ADD_CARD': return {
      columns: addCard(state.columns, action.card, action.columnId, action.cardId),
    };
    case 'SUBMIT_TITLE': return {
      columns: submitTitle(state.columns, action.title, action.id),
    };
    case 'DELETE_COLUMN': return {
      columns: deleteColumn(state.columns, action.id),
    };
    case 'CARD_CLICKED': return {
      columns: cardClicked(state.columns, action.id),
    };
    case 'SUBMIT_CARD_TITLE': return {
      columns: submitCardTitle(state.columns, action.title, action.columnId, action.cardId),
    };
    case 'DELETE_CARD': return {
      columns: deleteCard(state.columns, action.columnId, action.cardId),
    };
    default: return state;
  }
}
