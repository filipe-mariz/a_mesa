// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VolunteerHelper from "App/Models/VolunteerHelper";
import Help from "App/Models/Help";
import Volunteer from "App/Models/Volunteer";

export default class VolunteerHelpersController {
  public async index({ request, response }) {
    VolunteerHelper.connection = request.tenantConnection;

    const volunteerHelper = await VolunteerHelper.all();

    return volunteerHelper;
  }

  public async register({ request, response }) {
    const requiredFields = [
      'help_id',
      'volunteer_id',
      'date_of_help',
      'description',
      'image_link'
    ]

    const modelCreationData = request.all();
    const data = request.only(requiredFields);

    for(const field of requiredFields) {
      if(!data[field]) {
        return response.status(400).json({
          MissingParamError: `MISSING PROPERTY ${field} ON BODY`,
          Solution: 'Adding this field to the body may solve the problem',
        })
      }
    }

    const volunteer = await Volunteer.findByOrFail('id', data.volunteer_id)
    const help = await Help.findByOrFail('id', data.help_id);
    if((!help) || (!volunteer)) {
      return response.status(400).json({
        message: 'Is not possible'
      })
    }

    VolunteerHelper.connection = request.tenantConnection;

    const volunteerHelper = await VolunteerHelper.create(modelCreationData);

    return volunteerHelper;
  }

  public async show({ request, params }) {
    VolunteerHelper.connection = request.tenantConnection;

    const volunteerHelper = await VolunteerHelper.findOrFail(params.volunteerHelper_id);

    return volunteerHelper;
  }

  public async update({ request, params }) {
    VolunteerHelper.connection = request.tenantConnection;

    const data = request.all();

    const volunteerHelper = await VolunteerHelper.findOrFail(params.volunteerHelper_id);

    volunteerHelper.merge(data);

    await volunteerHelper.save();

    return volunteerHelper;
  }
}
