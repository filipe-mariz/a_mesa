import uuid from 'uuid/v4'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Needy from './Needy';
import Volunteer from './Volunteer';

export default class Help extends BaseModel {
  public static connection = 'pg'
  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  public id: string

  @column()
  public needy_id: string

  @column()
  public help_type: string;

  @column()
  public description: string;

  @column()
  public adress: string; 

  @column()
  public city: string;

  @column()
  public state: string;

  @column()
  public status: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @hasOne(() => Needy)
  public needy: HasOne<typeof Needy>

  @beforeCreate()
  public static assignUuid(help: Help) {
    help.id = uuid()
  }
}
