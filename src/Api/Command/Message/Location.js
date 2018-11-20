module.exports = class{
  constructor(location){
    this.location = location;
  }

  visit(message){
    message.bold(this.location.name).nl()
      .is(this.location.description, message =>
        message.ital(this.location.description)
      )
      .nl().nl()
      .list(Array.from(this.location.persons.values()), (p, i, message) =>
        message.str(`${i}. `).bold(p.name).str(' ').str(p.state).nl()
      )
      .nl()
      .list(Array.from(this.location.roads.values()), (l, i, message) =>
        message.str(`${i}. `).bold(l.name).nl()
      );
  }
}
