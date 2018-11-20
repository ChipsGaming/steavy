module.exports = class{
  constructor(acl, handler, router){
    this.acl = acl;
    this.handler = handler;
    this.router = router;

    acl.addHandler(handler);
  }

  route(message){
    const player = message.loop.world.getPlayerAvatar(message.author.id);
    if(!this.acl.isAllowed(player.role, this.handler)){
      return null;
    }

    return this.router.route(message);
  }
};
