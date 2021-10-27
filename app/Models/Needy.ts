import uuid from 'uuid/v4'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeCreate, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Help from './Help'

export default class Needy extends BaseModel {
  public static connection = 'pg'
  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public whatsapp: string

  @column()
  public password: string

  @column()
  public born: string

  @column()
  public rg: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeCreate()
  public static assignUuid(needy: Needy) {
    needy.id = uuid()
  }

  @beforeSave()
  public static async hashPassword(needy: Needy) {
    if (needy.$dirty.password) {
      needy.password = await Hash.hash(needy.password)
    }
  }

  @hasMany(() => Help)
  public help: HasMany<typeof Help>
}
