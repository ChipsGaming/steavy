module.exports = class{
  handle(events){
    events.on('person.setState', require('./Handler/Person/SetState'));
    events.on('person.say', require('./Handler/Person/Say'));
    events.on('person.move', require('./Handler/Person/Move'));
    events.on('person.hit', require('./Handler/Person/Hit'));
    events.on('person.die', require('./Handler/Person/Die'));
    events.on('person.revive', require('./Handler/Person/Revive'));
  }
}
