import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Voluntaries extends BaseSchema {
  protected tableName = 'voluntaries'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().index()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('cpf').notNullable().unique()
      table.string('phone').notNullable()
      table.enum('help_type', ['fisico', 'mental', 'espiritual']).defaultTo('espiritual')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
