import Database from '@ioc:Adonis/Lucid/Database'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TenantDb {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const tenantId = request.header('x_tenant_id')

    response.abortIf(!tenantId, { message: 'Define the Tenant Id as a header' }, 400)

    if (tenantId)
      response.abortIf(
        !Database.manager.has(tenantId),
        { message: 'The Tenant Id indicated is not valid' },
        400
      )

    request.tenantConnection = tenantId

    await next()
  }
}
