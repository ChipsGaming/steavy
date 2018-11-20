const Message = require('../../../Message');

module.exports = (person, weapon, target, volume) => {
  if(weapon === ''){
    weapon = 'рукой';
  }

  (new Message)
    .bold(person.name).str(` бьет ${weapon} `).bold(target.name).str(` нанося ${Math.abs(volume)}`)
    .sendAll(
      Array.from(person.location.persons.values())
        .map(person => person.client)
    );
};
