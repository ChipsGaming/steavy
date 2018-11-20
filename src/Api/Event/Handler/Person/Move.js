const Message = require('../../../Message');

module.exports = (target, location, prevLocation) => {
  (new Message)
    .bold(target.name).str(' ушел ').bold(location.name)
    .sendAll(
      Array.from(prevLocation.persons.values())
        .filter(person => !person.isEquals(target))
        .map(person => person.client)
    );
};
