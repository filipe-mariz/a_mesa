import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VoluntaryTokens extends BaseSchema {
  protected tableName = 'voluntary_tokens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('token').notNullable()
      table.string('reference_id').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
