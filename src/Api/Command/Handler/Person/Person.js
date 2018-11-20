const Message = require('../../../Message'),
  PersonMessage = require('../../Message/Person');

module.exports = (message, routeMatch) => {
  const world = message.loop.world,
    player = world.getPlayerAvatar(message.author.id);

  const person = Array.from(player.location.persons.values())[routeMatch.personIndex];
  if(person === undefined){
    return (new Message)
      .str('Нет такого персонажа')
      .send(message.author);
  }

  (new Message)
    .visit(new PersonMessage(person))
    .send(message.author);
};
