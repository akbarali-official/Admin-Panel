import Earning from '../models/Earning.js';
import createCrud from '../utils/createCrud.js';

export const { getAll, getOne, create, update, remove } = createCrud(Earning, 'Earning');
