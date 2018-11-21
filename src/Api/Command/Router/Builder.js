const AndRouter = require('./AndRouter'),
  OrRouter = require('./OrRouter'),
  RegexRouter = require('./RegexRouter'),
  ProtectRouter = require('./ProtectRouter'),
  CallbackRouter = require('./CallbackRouter');

const and = (...routes) => new AndRouter(routes),
  or = (...routes) => new OrRouter(routes),
  p = (acl, handler, router) => new ProtectRouter(acl, handler, router),
  rx = (regex, names, defaults = {}) => new RegexRouter(regex, names, defaults),
  cb = (callback) => new CallbackRouter(callback),
  ps = (acl, routes) => Object.keys(routes).map(handler => p(acl, handler, routes[handler])),
  and_ps = (acl, routes) => and(...ps(acl, routes)),
  or_ps = (acl, routes) => or(...ps(acl, routes));

module.exports = {
  and: and,
  or: or,
  p: p,
  rx: rx,
  cb: cb,
  ps: ps,
  and_ps: and_ps,
  or_ps: or_ps
};
