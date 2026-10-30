import Growth from '../models/Growth.js';
import createCrud from '../utils/createCrud.js';

export const { getAll, getOne, create, update, remove } = createCrud(Growth, 'Growth');
