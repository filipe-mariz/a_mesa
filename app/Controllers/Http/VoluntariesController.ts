import Hash from '@ioc:Adonis/Core/Hash'
import Cpf from 'App/validators/cpf.validator'
import RegisterEmail from 'App/Services/emails/register.email'
import { GoogleCalendarHandler } from 'App/Services/Calendar/google-calendar-handler'
import Voluntary from 'App/Models/Voluntary'

export default class VoluntariesController {
  public async register({ request, response }) {
		Voluntary.connection = request.tenantConnection
 
    const requiredFields = [
      'email',
      'name',
      'password',
      'passwordConfirmation',
      'cpf',
      'phone',
      'help_type'
    ]

    const modelCreationData = request.except(['passwordConfirmation'])
    const data = request.only(requiredFields)

    if (data.password !== data.passwordConfirmation) {
      return response.status(400).json({
        InvalidParamError: `INVALID PROPERTY passwordConfirmation ON BODY`,
        Solution:
          'The password and passwordConfirmation did not match, are you sure that they are the same?',
      })
    }

    const cpfValidator = new Cpf()
    const cpfValid = await cpfValidator.cpfValidator(data.cpf)
    if(cpfValid === false) {
      return response.status(400).json({
        message: 'cpf is not valid'
      })
    }

    //new RegisterEmail().registerEmail(data.email)

    const voluntary = await Voluntary.create(modelCreationData)

    return voluntary
	}

	public async index({ request }) {
    Voluntary.connection = request.tenantConnection

    const voluntary = await Voluntary.all()

    return voluntary
  }
}
