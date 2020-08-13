export function moveCardInColumn(result, state) {
  const { cards, columns, columnOrder } = state;
  const { destination, source, draggableId } = result;

  const start = state.columns[source.droppableId];
  const newCardIds = Array.from(start.cardIds);
  newCardIds.splice(source.index, 1);
  newCardIds.splice(destination.index, 0, draggableId);

  const newColumn = {
    ...start,
    cardIds: newCardIds,
  };

  const newState = {
    cards,
    columns: {
      ...columns,
      [newColumn.columnId]: newColumn,
    },
    columnOrder,
  };
  return newState;
}
