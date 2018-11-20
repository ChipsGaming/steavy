const Message = require('../../../Message');

module.exports = (person) => {
  (new Message)
    .bold(person.name).str(' потерял сознание')
    .sendAll(
      Array.from(person.location.persons.values())
        .map(person => person.client)
    );
};
