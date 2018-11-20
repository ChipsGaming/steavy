const Message = require('../../../Message');

module.exports = (message, routeMatch) => {
  const world = message.loop.world,
    player = world.getPlayerAvatar(message.author.id);

  const location = world.locations.get(routeMatch.locationId);
  if(location === undefined){
    return (new Message)
      .str('Нет такой локации')
      .send(message.author);
  }

  player.move(location);

  (new Message)
    .str('ok')
    .send(message.author);
};
