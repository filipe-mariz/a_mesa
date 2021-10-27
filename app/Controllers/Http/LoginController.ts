// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import argon2 from 'phc-argon2';
import ApiToken from 'App/Models/ApiToken';
import Volunteer from 'App/Models/Volunteer';
import Needy from 'App/Models/Needy';
import ProfessionalVolunteer from 'App/Models/ProfessionalVolunteer';

export default class LoginController {
  public async volunteer({ request, response }) {
    const requiredFields = ['email', 'password']

    const data = request.only(requiredFields)

    for (const field of requiredFields) {
      if (!data[field]) {
        return response.status(400).json({
          MissingParamError: `MISSING PROPERTY ${field} ON BODY`,
          Solution: 'Adding this field to the body may solve the problem',
        })
      }
    }

    Volunteer.connection = request.tenantConnection

    const volunteer = await Volunteer.findByOrFail('email', data.email)

    const isPasswordValid = await argon2.verify(volunteer.password, data.password);

    if (!isPasswordValid) {
      return response.status(400).json({
        InvalidParamError: `INVALID PROPERTY password ON BODY`,
        Solution:
          'You provided a wrong password, be sure to check if you are using the correct one',
      })
    }

    const token = await argon2.hash(`${data.email}-${data.password}`)

    const creationBody = { token, reference_id: volunteer.id }

    const apiToken = await ApiToken.create(creationBody)

    return apiToken
  }

  public async professioal({ request, response }) {
    const requiredFields = ['email', 'password']

    const data = request.only(requiredFields)

    for (const field of requiredFields) {
      if (!data[field]) {
        return response.status(400).json({
          MissingParamError: `MISSING PROPERTY ${field} ON BODY`,
          Solution: 'Adding this field to the body may solve the problem',
        })
      }
    }

    ProfessionalVolunteer.connection = request.tenantConnection

    const professionalVolunteer = await ProfessionalVolunteer.findByOrFail('email', data.email)

    const isPasswordValid = await argon2.verify(professionalVolunteer.password, data.password);

    if (!isPasswordValid) {
      return response.status(400).json({
        InvalidParamError: `INVALID PROPERTY password ON BODY`,
        Solution:
          'You provided a wrong password, be sure to check if you are using the correct one',
      })
    }

    const token = await argon2.hash(`${data.email}-${data.password}`)

    const creationBody = { token, reference_id: professionalVolunteer.id }

    const apiToken = await ApiToken.create(creationBody)

    return apiToken
  }

  public async needy({ request, response }) {
    const requiredFields = ['whatsapp', 'password']

    const data = request.only(requiredFields)

    for (const field of requiredFields) {
      if (!data[field]) {
        return response.status(400).json({
          MissingParamError: `MISSING PROPERTY ${field} ON BODY`,
          Solution: 'Adding this field to the body may solve the problem',
        })
      }
    }

    Needy.connection = request.tenantConnection

    const needy = await Needy.findByOrFail('whatsapp', data.whatsapp)

    const isPasswordValid = await argon2.verify(needy.password, data.password);

    if (!isPasswordValid) {
      return response.status(400).json({
        InvalidParamError: `INVALID PROPERTY password ON BODY`,
        Solution:
          'You provided a wrong password, be sure to check if you are using the correct one',
      })
    }

    const token = await argon2.hash(`${data.whatsapp}-${data.password}`)

    const creationBody = { token, reference_id: needy.id }

    const apiToken = await ApiToken.create(creationBody)

    return apiToken
  }
}
