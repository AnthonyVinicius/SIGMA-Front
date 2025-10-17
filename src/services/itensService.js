import itensData from '../data/itens.json';

let itens = [...itensData];

export default {
  getAllItens() {
    return Promise.resolve([...itens]);
  },

  getItemById(id) {
    const item = itens.find(i => i.id === id);
    return Promise.resolve(item || null);
  },

  createItem(itemData) {
    const newItem = {
      id: Math.random().toString(36).substr(2, 16),
      ...itemData
    };
    itens.push(newItem);
    return Promise.resolve(newItem);
  },

  updateItem(id, itemData) {
    const index = itens.findIndex(i => i.id === id);
    if (index !== -1) {
      itens[index] = { ...itens[index], ...itemData };
      return Promise.resolve(itens[index]);
    }
    return Promise.reject(new Error('Item não encontrado'));
  },

  deleteItem(id) {
    const index = itens.findIndex(i => i.id === id);
    if (index !== -1) {
      itens.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.reject(new Error('Item não encontrado'));
  }
};
