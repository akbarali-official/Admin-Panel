import Order from '../models/Order.js';
import createCrud from '../utils/createCrud.js';

export const { getAll, getOne, create, update, remove } = createCrud(Order, 'Order');
