import * as actionConst from '../actionConst/actionConst';
import ColumnActions from './ColumnActions/ColumnActions';
import CardActions from './CardActions/CardActions';

export default function appReducer(state, action) {
  switch (action.type) {
    case actionConst.ADD_COLUMN: return {
      data: ColumnActions.addColumn(state.data),
    };
    case actionConst.ADD_CARD: return {
      data: CardActions.addCard(state.data, action.columnId),
    };
    case actionConst.DELETE_COLUMN: return {
      data: ColumnActions.deleteColumn(state.data, action.columnId),
    };
    case actionConst.DELETE_CARD: return {
      data: CardActions.deleteCard(state.data, action.columnId, action.cardId),
    };
    case actionConst.MOVE_TO: return {
      data: ColumnActions.moveTo(state.data, action.from, action.to, action.draggableId),
    };
    case actionConst.MOVE_TO_CARD: return {
      data: CardActions.moveToCard(state.data,
        action.source,
        action.destination,
        action.draggableId),
    };
    case actionConst.MOVE_CARD_TO_NEW_COLUMN: return {
      data: CardActions.moveCardToNewColumn(state.data, action.result),
    };
    case actionConst.SET_COLUMN_TITLE: return {
      data: ColumnActions.setColumnTitle(state.data, action.id, action.newTitle),
    };
    case actionConst.SET_CARD_TITLE: return {
      data: CardActions.setCardTitle(state.data, action.id, action.newTitle),
    };
    default: return state;
  }
}
