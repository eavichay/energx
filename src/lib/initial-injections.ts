declare class Slim {
  static plugin (x:string, f: Function) : void
}

function isClass (fn : any) : boolean {
  return typeof fn === 'function'
    && /^class\s/.test(Function.prototype.toString.call(fn))
}

Slim.plugin('create', function inject (target) {
  const { injections } = target.constructor;
  if (injections) {
    // noinspection TypeScriptUnresolvedFunction
    Object.entries(injections).forEach( ([key, value] : [string, any]) => {
      if (isClass(value)) {
        target[key] = new value()
      } else if (typeof value === 'function') {
        target[key] = value();
      } else {
        target[key] = value;
      }
    })
  }
})