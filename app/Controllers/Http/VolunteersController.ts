// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Volunteer from "App/Models/Volunteer";

export default class VolunteersController {
  public async index ({ request }) {
    Volunteer.connection = request.tenantConnection;

    const volunteer = await Volunteer.all();

    return volunteer;
  }
}
