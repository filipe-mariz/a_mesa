import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { authorize } from 'App/Services/Calendar/config'

export default class GoogleAuthorize {
  public async handle({}: HttpContextContract, next: () => Promise<void>) {
    authorize()

    await next()
  }
}
