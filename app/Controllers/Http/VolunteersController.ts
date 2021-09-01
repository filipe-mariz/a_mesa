// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Volunteer from "App/Models/Volunteer";
import { GoogleCalendarHandler } from 'App/Services/Calendar/google-calendar-handler'
import Cpf from "App/validators/cpf.validator";
import RegisterEmail from 'App/Services/emails/register.email'

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

    const cpf = new Cpf()
    const validator = await cpf.cpfValidator(data.cpf);
    if (validator === false) {
      return response.status(400).json({
        message: 'CPF is not valid',
        solution: 'set a valid CPF'
      })
    }

    Volunteer.connection = request.tenantConnection;

    const volunteer = await Volunteer.create(modelCreationData)

    const email = new RegisterEmail();
    email.registerEmail(data.email)

    return volunteer
  }

  public async show({ request, params }) {
    Volunteer.connection = request.tenantConnection;

    const volunteer = await Volunteer.findOrFail(params.volunteer_id)

    return volunteer
  }

  public async update({ request, params }) {
    Volunteer.connection = request.tenantConnection;

    const data = request.except([ 'passwordConfirmation' ]);

    const volunteer = await Volunteer.findOrFail(params.volunteer_id);

    volunteer.merge(data);

    await volunteer.save();

    return volunteer;
  }

  public async updatePassword({ request, response }) {
    Volunteer.connection = request.tenantConnection;

    const requiredFields = ['password', 'passwordConfirmation', 'email']

    const data = request.only(requiredFields)

    for (const field of requiredFields) {
      if (!data[field]) {
        return response.status(400).json({
          MissingParamError: `MISSING PROPERTY ${field} ON BODY`,
          Solution: 'Adding this field to the body may solve the problem',
        })
      }
    }

    if (data.password !== data.passwordConfirmation) {
      return response.status(400).json({
        InvalidParamError: `INVALID PROPERTY passwordConfirmation ON BODY`,
        Solution:
          'The password and passwordConfirmation did not match, are you sure that they are the same?',
      })
    }

    const volunteer = await Volunteer.findByOrFail('email', data.email);

    volunteer.password = data.password;

    await volunteer.save();

    return volunteer;
  }

  public async createEventOnCalendar({ request, response }) {
    const requiredFields = ['calendarEvent']

    const data = request.only(requiredFields)

    for (const field of requiredFields) {
      if (!data[field]) {
        return response.status(400).json({
          MissingParamError: `MISSING PROPERTY ${field} ON BODY`,
          Solution: 'Adding this field to the body may solve the problem',
        })
      }
    }

    const { calendarEvent } = data

    const googleCalendarHandler = new GoogleCalendarHandler()
    await googleCalendarHandler.createEventOnCalendar(calendarEvent)

    return response.status(200).json({
      message: 'Event created successfully',
    })
  }

  public async destroy({ request, params, response }) {
    Volunteer.connection = request.tenantConnection;

    const volunteers = await Volunteer.findOrFail(params.volunteer_id);

    await volunteers.delete();

    return response.status(200).json({
      message: 'Volunteer deleted successfully',
    })
  }
}
