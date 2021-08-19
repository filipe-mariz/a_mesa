import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VoluntaryToken from 'App/Models/VoluntaryToken'
import NeedyToken from 'App/Models/NeedyToken'

export default class Authorize {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const authToken = request.header('x_auth_token')
    response.abortIf(!authToken, { message: 'Define the Authorization Token as a header' }, 400)

    const { tenantConnection } = request
    response.abortIf(
      !tenantConnection,
      { message: 'Define the tenant connection token as a header' },
      400
    )

    if (tenantConnection) {
      VoluntaryToken.connection = tenantConnection
      NeedyToken.connection = tenantConnection
    }

    const voluntaryToken = await VoluntaryToken.findBy('token', authToken)
    const needyToken = await NeedyToken.findBy('token', authToken)

    response.abortIf(
      !voluntaryToken && !needyToken,
      { message: 'Authorization Token not valid' },
      401
    )

    await next()
  }
}
