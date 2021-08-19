import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Needies extends BaseSchema {
  protected tableName = 'needies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('teste')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
