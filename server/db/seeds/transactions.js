import { format } from 'date-fns';

/**
 * @param {Knex} knex
 */
export const seed = async function (knex) {
  
  await knex('transactions').del();
  await knex('category').del();

  
  function datestamp(year, month) {
    const day = Math.floor(Math.random() * 28) + 1; 
    const date = new Date(year, month, day);
    return format(date, 'yyyy-MM-dd');
  }

  
  await knex('category').insert([
    { id: 1, name: 'Food' },
    { id: 2, name: 'Entertainment' },
    { id: 3, name: 'Bills' },
    { id: 4, name: 'Shopping' },
    { id: 5, name: 'Transportation' },
    { id: 6, name: 'Health' },
    { id: 7, name: 'Education' },
    { id: 8, name: 'Subscriptions' },
    { id: 9, name: 'Travel' },
  ]);

  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  
  const transactions = [];

  for (let i = 0; i < 12; i++) {
    const month = (currentMonth - i + 12) % 12; 
    const year = currentMonth - i < 0 ? currentYear - 1 : currentYear; 

    transactions.push(
      {
        name: 'Grocery Store',
        created_at: datestamp(year, month),
        amount: parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)),
        category_id: 1, 
      },
      {
        name: 'Restaurant Dinner',
        created_at: datestamp(year, month),
        amount: parseFloat((Math.random() * (60 - 15) + 15).toFixed(2)),
        category_id: 1, 
      },
      {
        name: 'Netflix Subscription',
        created_at: datestamp(year, month),
        amount: 15.99,
        category_id: 8, 
      },
      {
        name: 'Cinema Tickets',
        created_at: datestamp(year, month),
        amount: parseFloat((Math.random() * (40 - 10) + 10).toFixed(2)),
        category_id: 2, 
      },
      {
        name: 'Electricity Bill',
        created_at: datestamp(year, month),
        amount: parseFloat((Math.random() * (150 - 60) + 60).toFixed(2)),
        category_id: 3, 
      },
      {
        name: 'Internet Bill',
        created_at: datestamp(year, month),
        amount: parseFloat((Math.random() * (80 - 40) + 40).toFixed(2)),
        category_id: 3, 
      },
      {
        name: 'Clothing Store',
        created_at: datestamp(year, month),
        amount: parseFloat((Math.random() * (150 - 30) + 30).toFixed(2)),
        category_id: 4, 
      },
      {
        name: 'Online Shopping',
        created_at: datestamp(year, month),
        amount: parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)),
        category_id: 4, 
      },
      {
        name: 'Taxi Ride',
        created_at: datestamp(year, month),
        amount: parseFloat((Math.random() * (25 - 5) + 5).toFixed(2)),
        category_id: 5, 
      },
      {
        name: 'Bus Pass',
        created_at: datestamp(year, month),
        amount: 50,
        category_id: 5, 
      },
      {
        name: 'Doctor Visit',
        created_at: datestamp(year, month),
        amount: parseFloat((Math.random() * (120 - 60) + 60).toFixed(2)),
        category_id: 6, 
      },
      {
        name: 'Pharmacy Purchase',
        created_at: datestamp(year, month),
        amount: parseFloat((Math.random() * (40 - 10) + 10).toFixed(2)),
        category_id: 6, 
      },
      {
        name: 'Online Course',
        created_at: datestamp(year, month),
        amount: parseFloat((Math.random() * (200 - 50) + 50).toFixed(2)),
        category_id: 7, 
      },
      {
        name: 'Textbooks',
        created_at: datestamp(year, month),
        amount: parseFloat((Math.random() * (100 - 30) + 30).toFixed(2)),
        category_id: 7, 
      },
      {
        name: 'Flight Ticket',
        created_at: datestamp(year, month),
        amount: parseFloat((Math.random() * (600 - 200) + 200).toFixed(2)),
        category_id: 9, 
      },
      {
        name: 'Hotel Booking',
        created_at: datestamp(year, month),
        amount: parseFloat((Math.random() * (300 - 100) + 100).toFixed(2)),
        category_id: 9, 
      }
    );
  }

  
  await knex('transactions').insert(transactions);
};
