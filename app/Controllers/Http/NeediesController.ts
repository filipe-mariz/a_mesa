// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Needy from "App/Models/Needy"

export default class NeediesController {
    public async register({ request, response }) {
		Needy.connection = request.tenantConnection

    const requiredFields = [
      'teste'
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

    //const cpfValidator = new Cpf()
    /* const cpfValid = await cpfValidator.cpfValidator(data.cpf)
    if(cpfValid === false) {
      return response.status(400).json({
        message: 'cpf is not valid'
      })
    } */

    //new RegisterEmail().registerEmail(data.email)

    const voluntary = await Needy.create(modelCreationData)

    return voluntary
	}
}
