import Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('metadata', table => {
        table.bigIncrements('id').unsigned().primary();
        table.string('description', 255).notNullable();
        table.string('external_url', 255).notNullable();
        table.string('image', 255).notNullable();
        table.string('name', 255).notNullable();
        table.string('animation_url', 255).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('metadata');
}

