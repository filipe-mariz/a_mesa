// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Volunteer from 'App/Models/Volunteer'
import RegisterEmail from 'App/Services/emails/register.email'
import Cpf from 'App/validators/cpf.validator'

export default class VolunteersController {
  public async register({ request, response }) {
    Volunteer.connection = request.tenantConnection

    const requiredFields = [
      'name',
      'email',
      'password',
      'confirmPassword',
      'phone',
      'help_type'
    ]

    const modelCreationData = request.except(['confirmPassword'])
    const data = request.only(requiredFields)

    for (const field of requiredFields) {
      if (!data[field]) {
        return response.status(400).json({
          MissingParamError: `MISSING PROPERTY ${field} ON BODY`,
          Solution: 'Adding this field to the body may solve the problem',
        })
      }
    }

    if (data.password !== data.confirmPassword) {
      return response.status(400).json({
        InvalidParamError: `INVALID PROPERTY passwordConfirmation ON BODY`,
        Solution:
          'The password and passwordConfirmation did not match, are you sure that they are the same?',
      })
    }

    /* const cpfValidator = new Cpf()
    const cpfValid = await cpfValidator.cpfValidator(data.cpf)
    if(cpfValid === false) {
      return response.status(400).json({
        message: 'cpf is not valid'
      })
    } */

    const volunteer = await Volunteer.create(modelCreationData);

    new RegisterEmail().registerEmail(data.email);

    return volunteer
  }
}
