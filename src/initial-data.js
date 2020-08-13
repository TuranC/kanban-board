const initialData = {
  data: {
    cards: {
      'card-1': { cardId: 'card-1', content: 'take out the garbage' },
      'card-2': { cardId: 'card-2', content: 'watch my favorite show' },
      'card-3': { cardId: 'card-3', content: 'charge my phone' },
      'card-4': { cardId: 'card-4', content: 'cook dinner' },
    },
    columns: {
      'column-1': {
        columnId: 'column-1',
        title: 'to do',
        cardIds: ['card-1', 'card-2', 'card-3', 'card-4'],
      },
      'column-2': {
        columnId: 'column-2',
        title: 'in progress',
        cardIds: [],
      },
    },
    columnOrder: ['column-1', 'column-2'],
  },
};

export default initialData;
