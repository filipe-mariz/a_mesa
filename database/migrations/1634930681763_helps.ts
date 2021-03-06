import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Helps extends BaseSchema {
  protected tableName = 'helps'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary();
      table.string('needy_id').notNullable();
      table.enum('help_type', ['fisico', 'mental', 'espiritual']).defaultTo('espiritual')
      table.string('description').notNullable();
      table.string('adress').notNullable();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('lat').notNullable();
      table.string('long').notNullable();
      table.enum('status', ['Pendente', 'Agendado', 'Concluido']).defaultTo('Pendendte')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
