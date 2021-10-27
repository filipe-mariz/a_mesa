import uuid from 'uuid/v4'
import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProfessionalVolunteer extends BaseModel {
  public static connection = 'pg'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string;

  @column()
  public born: string;

  @column()
  public cpf: string;

  @column()
  public rg: string;

  @column()
  public number: string;

  @column()
  public email: string;

  @column()
  public password: string

  @column()
  public help_type: string;

  @column()
  public profession: string;

  @column()
  public supporting_document: string;

  @column()
  public street: string;

  @column()
  public district: string;

  @column()
  public state: string;

  @column()
  public country: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(professionalVolunteer: ProfessionalVolunteer) {
    professionalVolunteer.id = uuid()
  }

  @beforeSave()
  public static async hashPassword(professionalVolunteer: ProfessionalVolunteer) {
    if (professionalVolunteer.$dirty.password) {
      professionalVolunteer.password = await Hash.hash(professionalVolunteer.password)
    }
  }
}
