// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProfessionalVolunteer from "App/Models/ProfessionalVolunteer";
import Cpf from "App/validators/cpf.validator";
import RegisterEmail from "App/Services/emails/register.email";

export default class ProfessionalVolunteersController {
  public async register({ request, response }) {
    ProfessionalVolunteer.connection = request.tenantConnection

    const requiredFields = [
      'name',
      'born',
      'cpf',
      'rg',
      'number',
      'email',
      'password',
      'passwordConfirmation',
      'help_type',
      'profession',
      'supporting_document',
      'street',
      'district',
      'state',
      'country'
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

    const cpf = new Cpf()
    const validator = await cpf.cpfValidator(data.cpf);
    if (validator === false) {
      return response.status(400).json({
        message: 'CPF is not valid',
        solution: 'set a valid CPF'
      })
    }

    const professional = await ProfessionalVolunteer.create(modelCreationData);

    const email = new RegisterEmail();
    email.registerEmail(data.email)

    return professional
  }

  public async index({ request }) {
    ProfessionalVolunteer.connection = request.tenantConnection;

    const professional = await ProfessionalVolunteer.all();

    return professional
  }

  public async show({ request, params }) {
    ProfessionalVolunteer.connection = request.tenantConnection;

    const professional = ProfessionalVolunteer.findOrFail(params.professional_id);

    return professional;
  }
}
