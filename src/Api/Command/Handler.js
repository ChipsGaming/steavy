module.exports = class{
  constructor(router){
    this.router = router;
  }

  onReady(){
  }

  onMessage(message){
    const routeMatch = this.router.route(message);
    if(routeMatch === null){
      return;
    }
    
    routeMatch.handler(message, routeMatch);
  }

  async handle(discord, token){
    discord.on('ready', this.onReady.bind(this));
    discord.on('message', this.onMessage.bind(this));

    discord.login(token);
  }
};
