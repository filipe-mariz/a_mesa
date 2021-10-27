import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ApiToken extends BaseModel {
  public static connection = 'pg'
  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public token: string

  @column()
  public reference_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
