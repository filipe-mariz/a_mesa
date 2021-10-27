// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Help from "App/Models/Help";
import Needy from "App/Models/Needy";

export default class HelpsController {
  public async index({ request }) {
    Help.connection = request.tenantConnection;

    const help = await Help.all();

    return help;
  }

  public async register({ request, response }) {
    const requiredFields = [
      'needy_id',
      'help_type',
      'description',
      'adress',
      'city',
      'state',
      'status',
      'lat',
      'long',
    ];

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

    const needy = await Needy.findByOrFail('id', data.needy_id);
    if(!needy) {
      return response.status(400).json({
        message: 'User not found'
      })
    }

    Help.connection = request.tenantConnection;

    const help = await Help.create(modelCreationData);

    return help;

  }

  public async show({ request, params }) {
    Help.connection = request.tenantConnection;

    const help = await Help.findOrFail(params.help_id);

    return help;
  }

  public async update({ request, params }) {
    Help.connection = request.tenantConnection;

    const data = request.all();

    const help = await Help.findOrFail(params.help_id);

    help.merge(data);

    await help.save();

    return help;
  }

  public async updateStatus({ request, params, response }) {
    Help.connection = request.tenantConnection;

    const requiredFields = ['status'];

    const data = request.only(requiredFields)

    for (const field of requiredFields) {
      if (!data[field]) {
        return response.status(400).json({
          MissingParamError: `MISSING PROPERTY ${field} ON BODY`,
          Solution: 'Adding this field to the body may solve the problem',
        })
      }
    }

    const help = await Help.findOrFail(params.help_id);

    help.merge(data);

    await help.save();

    return help;
  }

  public async destroy({ request, response, params }) {
    Help.connection = request.tenantConnection;

    const help = await Help.findOrFail(params.help_id);

    await help.delete();

    return response.status(200).json({
      message: 'Help deleted successfully'
    })
  }
}
