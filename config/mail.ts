import Env from '@ioc:Adonis/Core/Env'

class Mails {
    public host = Env.get('SERVER_EMAIL');
    public port = 587;
    public user = Env.get('MAIL');
    public password = Env.get('PASSWORD');
}

export default new Mails;
