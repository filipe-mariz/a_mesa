import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Needy from './Needy';

export default class Help extends BaseModel {
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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Needy)
  public needy: HasOne<typeof Needy>
}
