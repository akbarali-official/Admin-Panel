import Customer from '../models/Customer.js';
import createCrud from '../utils/createCrud.js';

export const { getAll, getOne, create, update, remove } = createCrud(Customer, 'Customer');
