import * as DB from '../../../DB/DB';

class CardActions {
  static hasCardTitle(cards, column) {
    let has = true;

    const columnCards = column.cardIds;
    columnCards.forEach((key) => {
      if (cards[key].content === '') {
        has = false;
      }
    });

    return has;
  }

  static addCard(state, columnId) {
    const newState = { ...state };
    const cardId = `card-${Math.floor(Math.random() * 1000000)}`;
    const newCard = {
      cardId,
      content: '',
    };

    if (this.hasCardTitle(state.cards, state.columns[columnId])) {
      DB.addCardDB(columnId, newCard);
      newState.cards[cardId] = newCard;
      newState.columns[columnId].cardIds.push(cardId);
    }

    return newState;
  }

  static deleteCard(state, columnId, cardId) {
    const newState = { ...state };
    const position = newState.columns[columnId].cardIds.indexOf(cardId);
    newState.columns[columnId].cardIds.splice(position, 1);
    delete newState.cards[cardId];

    DB.deleteCardDB(columnId, cardId, position);
    return newState;
  }

  static moveToCard(state, source, destination, draggableId) {
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

      DB.moveCardToDB(newColumn);
      return newState;
    }
    return state;
  }

  static moveCardToNewColumn(state, result) {
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

    DB.moveCardToNewColumnDB(newStart, newFinish);
    return newState;
  }

  static setCardTitle(state, id, newTitle) {
    const newState = { ...state };
    newState.cards[id].content = newTitle;
    DB.setCardTitleDB(id, newTitle);
    return newState;
  }
}

export default CardActions;
