import Env from '@ioc:Adonis/Core/Env'
import { OrmConfig } from '@ioc:Adonis/Lucid/Orm'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig & { orm: Partial<OrmConfig> } = {
  connection: Env.get('DB_CONNECTION', 'pg'),

  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: Env.get('DB_HOST', '127.0.0.1') as string,
        port: Number(Env.get('DB_PORT', 5433)),
        user: Env.get('DB_USER', 'postgres') as string,
        password: Env.get('DB_PASSWORD', '1234') as string,
        database: Env.get('DB_NAME', 'postgres') as string,
      },
      healthCheck: false,
      debug: false,
    }
  }, orm: {},
}

export default databaseConfig
