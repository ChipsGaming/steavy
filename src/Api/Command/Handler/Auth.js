const Person = require('../../../Game/Person'),
  Message = require('../../Message'),
  LocationMessage = require('../Message/Location');

module.exports = (message, routeMatch) => {
  const world = message.loop.world;

  const person = new Person;
  person.name = message.author.username;
  if(routeMatch.password === routeMatch.correctPassword){
    person.role = 'admin';
  }
  person.state = 'стоит';
  Array.from(world.locations.values())[0].addPerson(person);
  world.setPlayerAvatar(message.author, person);

  (new Message)
    .visit(new LocationMessage(person.location))
    .send(message.author);
};
