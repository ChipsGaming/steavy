module.exports = class{
  constructor(person){
    this.person = person;
  }

  visit(message){
    message.bold(this.person.name).str(' ').str(this.person.state).nl()
      .str(`l${this.person.health.fixedVolume}`)
      .str(` e${this.person.energy.fixedVolume}`)
      .nl()
      .is(this.person.description, message =>
        message.ital(this.person.description)
      );
  }
}
