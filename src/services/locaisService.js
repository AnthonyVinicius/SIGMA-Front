import locaisData from '../data/locais.json';

let locais = [...locaisData];

export default {
  getAllLocais() {
    return Promise.resolve([...locais]);
  },

  getLocalById(id) {
    const local = locais.find(l => l.id === id);
    return Promise.resolve(local || null);
  },

  createLocal(localData) {
    const newLocal = {
      id: Math.random().toString(36).substr(2, 16),
      ...localData,
      qrCode: null
    };
    locais.push(newLocal);
    return Promise.resolve(newLocal);
  },

  updateLocal(id, localData) {
    const index = locais.findIndex(l => l.id === id);
    if (index !== -1) {
      locais[index] = { ...locais[index], ...localData };
      return Promise.resolve(locais[index]);
    }
    return Promise.reject(new Error('Local não encontrado'));
  },

  deleteLocal(id) {
    const index = locais.findIndex(l => l.id === id);
    if (index !== -1) {
      locais.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.reject(new Error('Local não encontrado'));
  },

  getLocaisByCategoria(categoria) {
    const filtered = locais.filter(l => l.categoria === categoria);
    return Promise.resolve(filtered);
  },

  getCategorias() {
    const categorias = [...new Set(locais.map(l => l.categoria))];
    return Promise.resolve(categorias);
  }
};
