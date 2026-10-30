import Income from '../models/Income.js';
import createCrud from '../utils/createCrud.js';

export const { getAll, getOne, create, update, remove } = createCrud(Income, 'Income');
