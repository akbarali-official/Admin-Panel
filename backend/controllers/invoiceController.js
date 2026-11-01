import Invoice from '../models/Invoice.js';
import createCrud from '../utils/createCrud.js';

export const { getAll, getOne, create, update, remove } = createCrud(Invoice, 'Invoice');
