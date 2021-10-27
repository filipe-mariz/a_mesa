import uuid from 'uuid/v4'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Help from './Help'

export default class VolunteerHelper extends BaseModel {
  public static connection = 'pg'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string;

  @column()
  public help_id: string;

  @column()
  public volunteer_id: string;

  @column()
  public date_of_help: string;

  @column()
  public description: string;

  @column()
  public image_link: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Help)
  public help: HasOne<typeof Help>

  @beforeCreate()
  public static assignUuid(volunteerHelper: VolunteerHelper) {
    volunteerHelper.id = uuid()
  } 
}
