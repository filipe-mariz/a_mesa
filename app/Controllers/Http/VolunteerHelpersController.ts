// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VolunteerHelper from "App/Models/VolunteerHelper";

export default class VolunteerHelpersController {
  public async index({ request, response }) {
    VolunteerHelper.connection = request.tenantConnection;

    const volunteerHelper = await VolunteerHelper.all();

    return volunteerHelper;
  }
}
