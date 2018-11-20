const Discord = require('discord.js');

module.exports = class{
  constructor(acl, context){
    this.context = context;
    this.acl = acl;
    this.router = null;
  }

  initRouter(){
    this.router = new Api.OrRouter([
      new Api.AndRouter([
        new (require('./Router/IsPersonalBotMessage')),
        new Api.OrRouter([
          new Api.RegexRouter(/ping$/i, [], {handler: message => message.reply('pong')}),
          new Api.RegexRouter(/войти(?: (.+))?$/i, ['password'], {handler: require('./MessageHandler/Enter')}),
        ])
      ]),
      new Api.AndRouter([
        new (require('./Router/IsPrivateBotMessage')),
        new (require('./Router/IsEnter')),
        new Api.OrRouter([
          new (require('./MessageHandler/Acl/Router'))(this),
          new (require('./MessageHandler/Loop/Router'))(this),
          new (require('./MessageHandler/Person/Router'))(this),

          new Api.AndRouter([
            new (require('./Router/IsLoopStart')),
            new Api.OrRouter([
              new Api.ProtectRouter(this.acl, 'Help', new Api.RegexRouter(/^\?$/i, [], {handler: require('./MessageHandler/Help')})),
              new Api.ProtectRouter(this.acl, 'ViewLocation', new Api.RegexRouter(/^о(?:смотреть)?$/i, [], {handler: require('./MessageHandler/ViewLocation')})),
              new Api.ProtectRouter(this.acl, 'ViewPerson', new Api.RegexRouter(/^о(?:смотреть)? с(?:ебя)?$/i, [], {handler: require('./MessageHandler/ViewPerson')})),
              new Api.ProtectRouter(this.acl, 'Move', new Api.RegexRouter(/^(с|w|св|wd|вс|dw|в|d|юв|sd|вю|ds|ю|s|юз|sa|зю|as|з|a|сз|wa|зс|aw)$/i, ['direction'], {handler: require('./MessageHandler/Move')})),
              new (require('./MessageHandler/Item/Router'))(this),
              new (require('./MessageHandler/Talk/Router'))(this),
              new Api.ProtectRouter(this.acl, 'Talk/Say', new Api.RegexRouter(/(.+)/i, ['message'], {handler: require('./MessageHandler/Talk/Say')})),
            ]),
          ]),
        ]),
      ]),
    ]);
  }

  async run(){
    this.context.discord = new Discord.Client;

    this.context.discord.on('ready', () => {
      console.log('ready');
    });

    this.context.discord.on('message', (message) => {
      if(message.author.bot){
        return;
      }
      console.log(`${message.author.username}: ${message.content.substr(0, 100)}`);

      message.context = this.context;
      message.person = this.context.game.world.getPlayerPerson(message.author);
      const routeMatch = this.router.route(message);
      if(routeMatch === null){
        return;
      }
      
      routeMatch.handler(message, routeMatch);
    });

    this.context.discord.login(this.context.token);
  }
};
