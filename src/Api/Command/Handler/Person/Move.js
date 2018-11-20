const Message = require('../../../Message'),
  LocationMessage = require('../../Message/Location');

module.exports = (message, routeMatch) => {
  const player = message.loop.world.getPlayerAvatar(message.author.id);

  const location = Array.from(player.location.roads.values())[routeMatch.locationIndex];
  if(location === undefined){
    return (new Message)
      .str('Нет такой локации')
      .send(message.author);
  }

  if(player.location.isEquals(location)){
    return (new Message)
      .str('Вы уже в этой локации')
      .send(message.author);
  }

  if(player.energy.volume < 50){
    return (new Message)
      .str('Вы слишком устали')
      .send(message.author);
  }

  player.move(location);

  (new Message)
    .visit(new LocationMessage(location))
    .send(message.author);
};
