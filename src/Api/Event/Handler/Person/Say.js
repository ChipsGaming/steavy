const Message = require('../../../Message');

module.exports = (target, message) => {
  (new Message)
    .bold(target.name).str(' ').str(message)
    .sendAll(
      Array.from(target.location.persons.values())
        .filter(person => !person.isEquals(target))
        .map(person => person.client)
    );
};
