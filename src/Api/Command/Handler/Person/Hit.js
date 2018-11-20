const Message = require('../../../Message');

module.exports = (message, routeMatch) => {
  const world = message.loop.world,
    player = world.getPlayerAvatar(message.author.id);

  const person = Array.from(player.location.persons.values())[routeMatch.personIndex];
  if(person === undefined){
    return (new Message)
      .str('Нет такого персонажа')
      .send(message.author);
  }

  if(player.energy.volume < 20){
    return (new Message)
      .str('Вы слишком устали')
      .send(message.author);
  }

  player.hit(
    routeMatch.weapon || 'рукой',
    person
  );
};
