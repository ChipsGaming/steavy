const Message = require('../../../Message');

module.exports = (message, routeMatch) => {
  const world = message.loop.world;

  let person = undefined;
  for(const location of world.locations.values()){
    person = location.persons.get(routeMatch.personId)
    if(person !== undefined){
      break;
    }
  }
  if(person === undefined){
    return (new Message)
      .str('Нет такого персонажа')
      .send(message.author);
  }

  const location = world.locations.get(routeMatch.locationId);
  if(location === undefined){
    return (new Message)
      .str('Нет такой локации')
      .send(message.author);
  }

  person.move(location);

  (new Message)
    .str('ok')
    .send(message.author);
};
