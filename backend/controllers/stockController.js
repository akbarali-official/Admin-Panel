import Stock from '../models/Stock.js';
import createCrud from '../utils/createCrud.js';

export const { getAll, getOne, create, update, remove } = createCrud(Stock, 'Stock');
