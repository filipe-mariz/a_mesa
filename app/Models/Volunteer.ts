import uuid from 'uuid/v4'
import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import VolunteerHelper from './VolunteerHelper'

export default class Volunteer extends BaseModel {
  public static connection = 'pg'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public cpf: string

  @column()
  public phone: string

  @column()
  public help_type: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => VolunteerHelper)
  public volunteerHelper: HasMany<typeof VolunteerHelper>

  @beforeCreate()
  public static assignUuid(volunteers: Volunteer) {
    volunteers.id = uuid()
  }

  @beforeSave()
  public static async hashPassword(volunteer: Volunteer) {
    if (volunteer.$dirty.password) {
      volunteer.password = await Hash.hash(volunteer.password)
    }
  }
}
