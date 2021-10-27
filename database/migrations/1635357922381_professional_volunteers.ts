import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProfessionalVolunteers extends BaseSchema {
  protected tableName = 'professional_volunteers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary();
      table.string('name').notNullable();
      table.string('born').notNullable();
      table.string('cpf').notNullable().unique();
      table.string('rg').notNullable().unique();
      table.string('number').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.enum('help_type', ['fisico', 'mental', 'espiritual']).defaultTo('espiritual');
      table.string('profession').notNullable();
      table.string('supporting_document').notNullable().unique();
      table.string('street').notNullable();
      table.string('district').notNullable();
      table.string('state').notNullable().defaultTo('PE');
      table.string('country').notNullable().defaultTo('BR')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
