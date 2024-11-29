import { format } from "date-fns";


/**
 * @param {Knex} knex
 */
export const seed = async function (knex) {
  // Delete all existing entries in transactions and category tables
  await knex('transactions').del();
  await knex('category').del();

  function datestamp(){
    return format(new Date(), 'yyyy-MM-dd')
  }

  // Insert categories
  await knex('category').insert([
    { id: 1, name: 'Food' },
    { id: 2, name: 'Entertainment' },
    { id: 3, name: 'Bills' },
    { id: 4, name: 'Shopping' },
    { id: 5, name: 'Transportation' },
  ]);

  // Insert transactions linked to categories
  await knex('transactions').insert([
    {
      name: 'Grocery Store',
      created_at: datestamp(),
      amount: 45.99,
      category_id: 1, // Food
    },
    {
      name: 'Netflix Subscription',
      created_at: datestamp(),
      amount: 12.99,
      category_id: 2, // Entertainment
    },
    {
      name: 'Electricity Bill',
      created_at: datestamp(),
      amount: 89.50,
      category_id: 3, // Bills
    },
    {
      name: 'New Shoes',
      created_at: datestamp(),
      amount: 75.00,
      category_id: 4, // Shopping
    },
    {
      name: 'Bus Ticket',
      created_at: datestamp(),
      amount: 2.75,
      category_id: 5, // Transportation
    },
  ]);
};
