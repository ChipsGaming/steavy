const Message = require('../../../Message');

module.exports = (target) => {
  (new Message)
    .bold(target.name).str(' ').str(target.state).nl()
    .sendAll(
      Array.from(target.location.persons.values())
        .filter(person => !person.isEquals(target))
        .map(person => person.client)
    );
};
