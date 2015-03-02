// Not really a REPL frontend for ``legacy-issues``

var Sys  = require('./sys.js')
var REPL = require('repl')

function main(env) {
  if (process.argv[2])
    env.cwd = process.argv[2]
  else
    env.cwd = '.'
  options = { useGlobal: true,
              eval:      function(cmd, ctx, filename, callback) {
                           callback(null, evalDo(cmd));
                         },
              prompt:    'issues> ',
              env:       env }
  REPL.start(options)
}

function evalDo(x) {
  if (x[0] === '"')
    return eval(x.substr(1))
  tokens = x .
           replace(/\s+/g, ' ') . 
           split(' ')
  console.log(tokens)
}

var configMaybe = Sys.env(process.argv[2])
if (configMaybe.dir) main(configMaybe)
