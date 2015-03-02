var Proc = require('child_process')

function run(x) {
  return Proc.execSync(x).toString()
} 

function cat(x) {
  return run('cat ' + x)
}

function toPath(path) {
  if (path === undefined)
    path = '.issues/config'
  else
    path = path + '/.issues/config'
  return path
}

function issuesEnv(x, path) {
  if (run('[ ! -f "' + path + '" ] && echo -n "enoent" || echo -n "ok"') === 'enoent')
    return undefined
  return run(cat(path) + '\necho -n $issues_' + x)
}

function env(path) {
  path = toPath(path)
  return zippedToObject(
    [ 'team', 'dir', 'project', 'url', 'statuses' ].map(function(x) {return [x, issuesEnv(x, path)]})
  )
}

function zippedToObject(zipped) {
  return zipped.reduce( (function(a, x) {
                          a[x[0]] = x[1]
                          return a
                        }), {} )
}

function objectToZipped(object) {
  var zipped = []
  for (x in object) {
    zipped[zipped.length] = [x, object[x]]
  }
  return zipped
}

module.exports = {
  run: run,
  cat: cat,
  env: env
}
