const cliArgsParser = require('command-line-args'),
  Discord = require('discord.js'),
  Loop = require('./Game/Loop'),
  World = require('./Game/World'),
  Location = require('./Game/Location'),
  AclManager = require('./Api/Acl'),
  CommandsHandler = require('./Api/Command/MainHandler'),
  EventsHandler = require('./Api/Event/MainHandler');

const context = cliArgsParser([
  {name: 'token', alias: 't', type: String},
  {name: 'password', alias: 'p', type: String},
  {name: 'simulation', alias: 's', type: Number, defaultValue: 500}
]);

const world = new World;
const location = new Location;
location.name = 'First location';
location.description = 'This is first location';
world.addLocation(location);

const otherLocation = new Location;
otherLocation.name = 'Дорога';
location.addRoad(otherLocation);
otherLocation.addRoad(location);

const loop = new Loop(world);
loop.start(context.simulation);


const commandsHandler = new CommandsHandler(
  new AclManager(['admin', 'player']),
  context.password,
  loop
);
commandsHandler.handle(new Discord.Client, context.token);

const eventsHandler = new EventsHandler(
  {}
);
eventsHandler.handle(world.events);
