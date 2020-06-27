import React from 'react';
import Column from '../../components/Column/Column';
import Card from '../../components/Card/Card';

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

function addCard(columns, id) {
  const modifiedState = copyColumn(columns);

  if (hasAllColumnsTitle(modifiedState)) {
    const column = modifiedState.get(id);
    const newId = `Card:${Math.floor(Math.random() * 1000000)}`;

    if (!column.cards.has(newId)) {
      column.cards.set(newId, <Card key={newId} cardId={newId} />);
    }
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

const initialState = {
  columns: new Map(),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COLUMN': return {
      columns: addColumn(state.columns),
    };
    case 'ADD_CARD': return {
      columns: addCard(state.columns, action.id),
    };
    case 'SUBMIT_TITLE': return {
      columns: submitTitle(state.columns, action.title, action.id),
    };
    case 'DELETE_COLUMN': return {
      columns: deleteColumn(state.columns, action.id),
    };
    default: return state;
  }
}
