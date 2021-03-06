// initialize template system early, to let error handler use them
// koa-views is a wrapper around many template systems!
// most of time it's better to use the chosen template system directly
var jade = require('jade');
var config = require('config');
var path = require('path');



module.exports = function* (next) {

  var ctx = this;

  /* default helpers */
  this.locals = {
    /* at the time of this middleware, user is unknown, so we make it a getter */
    get user() {
      return ctx.req.user; // passport sets this
    },

    get flash() {
      return ctx.flash;
    }
  };

  this.render = function(templatePath, locals) {
    locals = locals || {};
    // warning!
    // _.assign does NOT copy defineProperty
    // so I use this.locals as a root and merge all props in it, instead of cloning this.locals
    var localsFull = Object.create(this.locals);

    for(var key in locals) {
      localsFull[key] = locals[key];
    }

    var templatePathResolved = path.join(config.template.root, templatePath + '.jade');

    return jade.renderFile(templatePathResolved, localsFull);
  };

  yield* next;

};
