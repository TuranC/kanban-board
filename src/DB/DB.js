import { openDB } from 'idb';

async function connectDB() {
  const db = await openDB('kanban-board-DB', 1, {
    upgrade(database) {
      const dBase = database.createObjectStore('data');
      dBase.createIndex('columns', 'columnId');
      dBase.createIndex('cards', 'cardId');
    },
  });
  const columnOrder = await db.transaction('data', 'readwrite').objectStore('data').get('order') || [];
  await db.transaction('data', 'readwrite').objectStore('data').put(columnOrder, 'order');
  return db;
}

function fromArrayToObj(data) {
  const obj = {};
  Object.values(data).forEach((elem) => {
    obj[elem.columnId] = elem;
  });
  return obj;
}

function transformArrayCardToObj(cards) {
  const obj = {};
  Object.values(cards).forEach((elem) => {
    obj[elem.cardId] = elem;
  });
  return obj;
}

export async function getAllData() {
  const db = await connectDB();
  const store = db.transaction('data', 'readonly').objectStore('data');

  const columns = await store.index('columns').getAll();
  const cards = await store.index('cards').getAll();

  const columnOrder = await store.get('order');
  const data = {
    cards: transformArrayCardToObj(cards),
    columns: fromArrayToObj(columns),
    columnOrder,
  };

  return data;
}

export async function addColumnDB(column) {
  const db = await connectDB();

  const store = db.transaction('data', 'readwrite').objectStore('data');
  const columnOrder = await store.get('order') || [];
  columnOrder.push(column.columnId);

  await store.put(columnOrder, 'order');
  await store.add(column, column.columnId);
}

export async function deleteColumnDB(columnId, columnOrderIndex) {
  const db = await connectDB();
  const store = db.transaction('data', 'readwrite').objectStore('data');

  const column = await store.get(columnId);

  Object.values(column.cardIds).forEach(async (elem) => {
    await store.delete(elem);
  });

  await store.delete(columnId);
  const columnOrder = await store.get('order');
  columnOrder.splice(columnOrderIndex, 1);
  await store.put(columnOrder, 'order');
  await store.delete(columnId);
}

export async function moveToDB(newColumnOrder) {
  const db = await connectDB();
  const store = db.transaction('data', 'readwrite').objectStore('data');
  await store.put(newColumnOrder, 'order');
}

export async function setColumnTitleDB(columnId, newTitle) {
  const db = await connectDB();
  const store = db.transaction('data', 'readwrite').objectStore('data');
  const column = await store.get(columnId);
  column.title = newTitle;
  await store.put(column, columnId);
}

export async function addCardDB(columnId, card) {
  const db = await connectDB();
  const store = db.transaction('data', 'readwrite').objectStore('data');
  await store.add(card, card.cardId);
  const column = await store.get(columnId);
  column.cardIds.push(card.cardId);
  await store.put(column, columnId);
}

export async function deleteCardDB(columnId, cardId, position) {
  const db = await connectDB();
  const store = db.transaction('data', 'readwrite').objectStore('data');
  const column = await store.get(columnId);
  column.cardIds.splice(position, 1);
  await store.put(column, columnId);
  await store.delete(cardId);
}

export async function moveCardToDB(newColumn) {
  const db = await connectDB();
  const store = db.transaction('data', 'readwrite').objectStore('data');
  await store.put(newColumn, newColumn.columnId);
}

export async function moveCardToNewColumnDB(newStart, newFinish) {
  const db = await connectDB();
  const store = db.transaction('data', 'readwrite').objectStore('data');

  await store.put(newStart, newStart.columnId);
  await store.put(newFinish, newFinish.columnId);
}

export async function setCardTitleDB(id, newTitle) {
  const db = await connectDB();
  const store = db.transaction('data', 'readwrite').objectStore('data');
  const card = await store.get(id);
  card.content = newTitle;
  await store.put(card, id);
}
