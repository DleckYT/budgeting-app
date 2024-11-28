/**
 * @param {Knex} knex
 */
export const up = async function (knex) {
  // Create the 'category' table first since 'transactions' references it
  await knex.schema.createTable('category', (table) => {
    table.increments('id').primary(); // Primary key
    table.string('name').notNullable(); // Category name
  });

  // Create the 'transactions' table
  await knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary(); // Primary key
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Created at timestamp
    table.string('name').notNullable(); // Transaction name
    table.float('amount').notNullable(); // Transaction amount
    table
      .integer('category_id')
      .unsigned()
      .references('id')
      .inTable('category')
      .onDelete('SET NULL') // Sets category_id to NULL if category is deleted
      .onUpdate('CASCADE'); // Updates transactions if category id is updated
  });
};

export const down = async function (knex) {
  // Drop the tables in reverse order to avoid foreign key constraints
  await knex.schema.dropTableIfExists('transactions');
  await knex.schema.dropTableIfExists('category');
};