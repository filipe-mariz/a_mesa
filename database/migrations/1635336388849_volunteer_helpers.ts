import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VolunteerHelpers extends BaseSchema {
  protected tableName = 'volunteer_helpers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary();
      table.string('help_id').notNullable();
      table.string('volunteer_id').notNullable();
      table.string('date_of_help').notNullable();
      table.string('description').notNullable();
      table.string('image_link').notNullable();
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
