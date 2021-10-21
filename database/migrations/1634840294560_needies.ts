import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Needies extends BaseSchema {
  protected tableName = 'needies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().index();
      table.string('name').notNullable();
      table.string('whatsapp').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
