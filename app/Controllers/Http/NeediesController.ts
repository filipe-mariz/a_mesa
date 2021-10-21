// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Needy from "App/Models/Needy";

export default class NeediesController {
  public async index ({ request }) {
    Needy.connection = request.tenantConnection;
  
    const needy = await Needy.all();

    return needy
  }

  public async register({ request, response }) {
    const requiredFields = [ 'name', 'whatsapp', 'password', 'passwordConfirmation'];

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

    Needy.connection = request.tenantConnection;

    const needy = await Needy.create(modelCreationData)

    return needy;
  }

  public async show({ request, params }) {
    Needy.connection = request.tenantConnection;

    const needy = await Needy.findOrFail(params.needy_id);

    return needy;
  }

  public async update({ request, params }) {
    Needy.connection = request.tenantConnection;

    const data = request.except([ 'passwordConfirmation' ]);

    const needy = await Needy.findOrFail(params.needy_id);

    needy.merge(data);

    await needy.save();

    return needy;
  }

  public async password({ request, response }) {
    Needy.connection = request.tenantConnection;

    const requiredFields = [
      'lastPassword', 
      'newPassword', 
      'passwordConfirmation', 
      'whatsapp'
    ];

    const data = request.only(requiredFields)
    const needy = await Needy.findByOrFail('whatsApp', data.whatsapp);

    for (const field of requiredFields) {
      if (!data[field]) {
        return response.status(400).json({
          MissingParamError: `MISSING PROPERTY ${field} ON BODY`,
          Solution: 'Adding this field to the body may solve the problem',
        })
      }
    }

    if (data.lastPassword !== needy.password) {
      return response.status(400).json({
        message: 'password is not match with last password'
      })
    }

    if (data.lastPassword === needy.password) {
      return response.status(400).json({
        message: 'it is not possible to use the same password as the previous one'
      })
    }

    if (data.password !== data.passwordConfirmation) {
      return response.status(400).json({
        InvalidParamError: `INVALID PROPERTY passwordConfirmation ON BODY`,
        Solution:
          'The password and passwordConfirmation did not match, are you sure that they are the same?',
      })
    }

    needy.password = data.password

    await needy.save();

    return needy;
  }

  public async updatePassword({ request, response }) {
    Needy.connection = request.tenantConnection;

    const requiredFields = [
      'lastPassword', 
      'newPassword', 
      'passwordConfirmation', 
      'whatsapp'
    ];

    const data = request.only(requiredFields)
    const needy = await Needy.findByOrFail('whatsapp', data.whatsapp);

    for (const field of requiredFields) {
      if (!data[field]) {
        return response.status(400).json({
          MissingParamError: `MISSING PROPERTY ${field} ON BODY`,
          Solution: 'Adding this field to the body may solve the problem',
        })
      }
    }

    if (data.lastPassword !== needy.password) {
      return response.status(400).json({
        message: 'password is not match with last password'
      })
    }

    if (data.lastPassword === needy.password) {
      return response.status(400).json({
        message: 'it is not possible to use the same password as the previous one'
      })
    }

    if (data.password !== data.passwordConfirmation) {
      return response.status(400).json({
        InvalidParamError: `INVALID PROPERTY passwordConfirmation ON BODY`,
        Solution:
          'The password and passwordConfirmation did not match, are you sure that they are the same?',
      })
    }

    needy.password = data.password

    await needy.save();

    return needy;
  }

  public async destroy({ request, response, params }) {
    Needy.connection = request.tenantConnection;

    const needy = await Needy.findOrFail(params.needy_id);

    await needy.delete();

    return response.status(200).json({
      message: 'Needy deleted successfully'
    })
  }

}
