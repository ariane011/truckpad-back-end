
exports.up = function(knex) {
  return knex.schema.createTable('motoristas', function (table) {
      table.string('id').primary();
      table.string('nome').notNullable();
      table.string('telefone').notNullable();
      table.date('dtNascimento').notNullable();
      table.string('cpf').notNullable();
      table.string('cnh').notNullable();
      table.string('categoria').notNullable();
      table.boolean('status').notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('motoristas');
};
