// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Volunteer from "App/Models/Volunteer";

export default class VolunteersController {
  public async index ({ request }) {
    Volunteer.connection = request.tenantConnection;

    const volunteer = await Volunteer.all();

    return volunteer;
  }

  public async register({ request, response }) {
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation',
      'cpf',
      'phone',
      'help_type'
    ]

    const modelCreationData = request.except([ 'passwordConfirmation' ])
    const data = request.only(requiredFields)

    for(const field of requiredFields) {
      if(!data[field]) {
        return response.status(400).json({
          MissingParamError: `MISSING PROPERTY ${field} ON BODY`,
          Solution: 'Adding this field to the body may solve the problem',
        })
      }
    }

    if(data.password !== data.passwordConfirmation) {
      return response.status(400).json({
        InvalidParamError: `INVALID PROPERTY passwordConfirmation ON BODY`,
        Solution:
          'The password and passwordConfirmation did not match, are you sure that they are the same?',
      })
    }

    Volunteer.connection = request.tenantConnection;

    const volunteer = await Volunteer.create(modelCreationData)

    return volunteer
  }
}
