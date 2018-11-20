const Message = require('../../../Message');

module.exports = (message, routeMatch) => {
  const world = message.loop.world,
    player = world.getPlayerAvatar(message.author.id);

  const from = world.locations.get(routeMatch.from);
  if(from === undefined){
    return (new Message)
      .str('Нет исходной локации')
      .send(message.author);
  }

  if(routeMatch.to === undefined){
    from.removeAllRoads();
  }
  else{
    const to = world.locations.get(routeMatch.to)
    if(to === undefined){
      return (new Message)
        .str('Нет целевой локации')
        .send(message.author);
    }

    switch(routeMatch.roads){
      case '<>':
        from.addRoad(to);
        to.addRoad(from);
        break;
      case '>':
        from.addRoad(to);
        break;
      case '<':
        to.addRoad(from);
        break;
    }
  }
  
  (new Message)
    .str('ok')
    .send(message.author);
};
