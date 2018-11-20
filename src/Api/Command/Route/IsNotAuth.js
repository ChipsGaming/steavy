module.exports = class{
  route(message){
    const world = message.loop.world;

    return world.getPlayerAvatar(message.author.id) === null? {} : null;
  }
}
