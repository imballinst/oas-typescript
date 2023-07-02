// ../../node_modules/openapi-zod-client/dist/generateZodClientFromOpenAPI-8fd9f4ff.esm.js
import path from "node:path";
import { snakeToCamel, capitalize, kebabToCamel, get, getSum, sortObjKeysFromArray, sortBy, sortListFromRefArray, pick as pick$1 } from "pastable/server";
import { match } from "ts-pattern";
import { create } from "handlebars";
import prettier from "prettier";
import parserTypescript from "prettier/parser-typescript";
import { t, ts } from "tanu";
import { sync } from "whence";
function _regeneratorRuntime() {
  _regeneratorRuntime = function() {
    return exports;
  };
  var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
    obj[key] = desc.value;
  }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function() {
    return this;
  });
  var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg, value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value2) {
          invoke("next", value2, resolve, reject);
        }, function(err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function(unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function(error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function(method, arg) {
      if ("executing" === state)
        throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method)
          throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg; ; ) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel)
              continue;
            return delegateResult;
          }
        }
        if ("next" === context.method)
          context.sent = context._sent = context.arg;
        else if ("throw" === context.method) {
          if ("suspendedStart" === state)
            throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else
          "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel)
            continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (void 0 === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method))
          return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type)
      return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = void 0), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(true);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod)
        return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next)
        return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1, next = function next2() {
          for (; ++i < iterable.length; )
            if (hasOwn.call(iterable, i))
              return next2.value = iterable[i], next2.done = false, next2;
          return next2.value = void 0, next2.done = true, next2;
        };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: void 0,
      done: true
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function(genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function(genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function(arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
    return this;
  }), define(Gp, "toString", function() {
    return "[object Generator]";
  }), exports.keys = function(val) {
    var object = Object(val), keys = [];
    for (var key in object)
      keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length; ) {
        var key2 = keys.pop();
        if (key2 in object)
          return next.value = key2, next.done = false, next;
      }
      return next.done = true, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), !skipTempReset)
        for (var name in this)
          "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = void 0);
    },
    stop: function() {
      this.done = true;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type)
        throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function(exception) {
      if (this.done)
        throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = void 0), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i], record = entry.completion;
        if ("root" === entry.tryLoc)
          return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc)
              return handle(entry.catchLoc, true);
            if (this.prev < entry.finallyLoc)
              return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc)
              return handle(entry.catchLoc, true);
          } else {
            if (!hasFinally)
              throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc)
              return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function(record, afterLoc) {
      if ("throw" === record.type)
        throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc)
          return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName,
        nextLoc
      }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
var getHandlebars = function getHandlebars2() {
  var instance = create();
  instance.registerHelper("ifeq", function(a, b, options) {
    if (a === b) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  instance.registerHelper("ifNotEmptyObj", function(obj, options) {
    if (_typeof(obj) === "object" && Object.keys(obj).length > 0) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  return instance;
};
function maybePretty(input, options) {
  try {
    return prettier.format(input.trim(), _objectSpread2({
      parser: "typescript",
      plugins: [parserTypescript]
    }, options));
  } catch (_unused) {
    return input;
  }
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function() {
      };
      return {
        s: F,
        n: function() {
          if (i >= o.length)
            return {
              done: true
            };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function(e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function() {
      it = it.call(o);
    },
    n: function() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function(e) {
      didErr = true;
      err = e;
    },
    f: function() {
      try {
        if (!normalCompletion && it.return != null)
          it.return();
      } finally {
        if (didErr)
          throw err;
      }
    }
  };
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function isReferenceObject(obj) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, "$ref");
}
var getOpenApiDependencyGraph = function getOpenApiDependencyGraph2(schemaRef, getSchemaByRef) {
  var visitedsRefs = {};
  var refsDependencyGraph = {};
  var visit = function visit2(schema, fromRef) {
    if (!schema)
      return;
    if (isReferenceObject(schema)) {
      if (!refsDependencyGraph[fromRef]) {
        refsDependencyGraph[fromRef] = /* @__PURE__ */ new Set();
      }
      refsDependencyGraph[fromRef].add(schema.$ref);
      if (visitedsRefs[schema.$ref])
        return;
      visitedsRefs[fromRef] = true;
      visit2(getSchemaByRef(schema.$ref), schema.$ref);
      return;
    }
    if (schema.allOf) {
      var _iterator = _createForOfIteratorHelper(schema.allOf), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var allOf = _step.value;
          visit2(allOf, fromRef);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return;
    }
    if (schema.oneOf) {
      var _iterator2 = _createForOfIteratorHelper(schema.oneOf), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var oneOf = _step2.value;
          visit2(oneOf, fromRef);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return;
    }
    if (schema.anyOf) {
      var _iterator3 = _createForOfIteratorHelper(schema.anyOf), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var anyOf = _step3.value;
          visit2(anyOf, fromRef);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return;
    }
    if (schema.type === "array") {
      if (!schema.items)
        return;
      return void visit2(schema.items, fromRef);
    }
    if (schema.type === "object" || schema.properties || schema.additionalProperties) {
      if (schema.properties) {
        for (var property in schema.properties) {
          visit2(schema.properties[property], fromRef);
        }
      }
      if (schema.additionalProperties && _typeof(schema.additionalProperties) === "object") {
        visit2(schema.additionalProperties, fromRef);
      }
    }
  };
  schemaRef.forEach(function(ref) {
    return visit(getSchemaByRef(ref), ref);
  });
  var deepDependencyGraph = {};
  var visitedsDeepRefs = {};
  schemaRef.forEach(function(ref) {
    var deps = refsDependencyGraph[ref];
    if (!deps)
      return;
    if (!deepDependencyGraph[ref]) {
      deepDependencyGraph[ref] = /* @__PURE__ */ new Set();
    }
    var visit2 = function visit3(dep) {
      deepDependencyGraph[ref].add(dep);
      if (refsDependencyGraph[dep] && ref !== dep) {
        refsDependencyGraph[dep].forEach(function(transitive) {
          if (visitedsDeepRefs[ref + "__" + transitive])
            return;
          visitedsDeepRefs[ref + "__" + transitive] = true;
          visit3(transitive);
        });
      }
    };
    deps.forEach(function(dep) {
      return visit2(dep);
    });
  });
  return {
    refsDependencyGraph,
    deepDependencyGraph
  };
};
var asComponentSchema = function asComponentSchema2(name) {
  return "#/components/schemas/".concat(name);
};
function normalizeString(text) {
  var prefixed = prefixStringStartingWithNumberIfNeeded(text);
  return prefixed.normalize("NFKD").trim().replace(/\s+/g, "_").replace(/-+/g, "_").replace(/[^\w\-]+/g, "_").replace(/--+/g, "-");
}
var wrapWithQuotesIfNeeded = function wrapWithQuotesIfNeeded2(str) {
  if (/^\w+$/.test(str)) {
    return str;
  }
  return '"'.concat(str, '"');
};
var prefixStringStartingWithNumberIfNeeded = function prefixStringStartingWithNumberIfNeeded2(str) {
  var firstAsNumber = Number(str[0]);
  if (typeof firstAsNumber === "number" && !Number.isNaN(firstAsNumber)) {
    return "_" + str;
  }
  return str;
};
var pathParamWithBracketsRegex = /({\w+})/g;
var wordPrecededByNonWordCharacter = /[^\w\-]+/g;
var pathParamToVariableName = function pathParamToVariableName2(name) {
  var preserveUnderscore = name.replaceAll("_", "#");
  return snakeToCamel(preserveUnderscore.replaceAll("-", "_")).replaceAll("#", "_");
};
var matcherRegex = /{(\b\w+(?:-\w+)*\b)}/g;
var replaceHyphenatedPath = function replaceHyphenatedPath2(path2) {
  var matches = path2.match(matcherRegex);
  if (matches === null) {
    return path2.replaceAll(matcherRegex, ":$1");
  }
  matches.forEach(function(match2) {
    var replacement = pathParamToVariableName(match2.replaceAll(matcherRegex, ":$1"));
    path2 = path2.replaceAll(match2, replacement);
  });
  return path2;
};
var pathToVariableName = function pathToVariableName2(path2) {
  return capitalize(kebabToCamel(path2).replaceAll("/", "")).replace(pathParamWithBracketsRegex, function(group) {
    return capitalize(group.slice(1, -1));
  }).replace(wordPrecededByNonWordCharacter, "_");
};
var isPrimitiveType$1 = function isPrimitiveType(type) {
  return primitiveTypeList$1.includes(type);
};
var primitiveTypeList$1 = ["string", "number", "integer", "boolean", "null"];
var escapeControlCharacters = function escapeControlCharacters2(str) {
  return str.replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/([\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\uFFFE\uFFFF])/g, function(_m, p1) {
    var dec = p1.codePointAt();
    var hex = dec.toString(16);
    if (dec <= 255)
      return "\\x".concat("00".concat(hex).slice(-2));
    return "\\u".concat("0000".concat(hex).slice(-4));
  }).replace(/\//g, "\\/");
};
var autocorrectRef = function autocorrectRef2(ref) {
  return ref[1] === "/" ? ref : "#/" + ref.slice(1);
};
var makeSchemaResolver = function makeSchemaResolver2(doc) {
  var nameByRef = /* @__PURE__ */ new Map();
  var refByName = /* @__PURE__ */ new Map();
  var byRef = /* @__PURE__ */ new Map();
  var byNormalized = /* @__PURE__ */ new Map();
  var getSchemaByRef = function getSchemaByRef2(ref) {
    var _get;
    var correctRef = autocorrectRef(ref);
    var split = correctRef.split("/");
    var path2 = split.slice(1, -1).join("/");
    var map = (_get = get(doc, path2.replace("#/", "").replace("#", "").replaceAll("/", "."))) !== null && _get !== void 0 ? _get : {};
    var name = split[split.length - 1];
    var normalized = normalizeString(name);
    nameByRef.set(correctRef, normalized);
    refByName.set(normalized, correctRef);
    var infos = {
      ref: correctRef,
      name,
      normalized
    };
    byRef.set(infos.ref, infos);
    byNormalized.set(infos.normalized, infos);
    return map[name];
  };
  return {
    getSchemaByRef,
    resolveRef: function resolveRef(ref) {
      return byRef.get(autocorrectRef(ref));
    },
    resolveSchemaName: function resolveSchemaName(normalized) {
      return byNormalized.get(normalized);
    }
  };
};
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
var complexityByType = function complexityByType2(schema) {
  var type = schema.type;
  if (!type)
    return 0;
  return match(type)["with"]("string", function() {
    return 1;
  })["with"]("number", function() {
    return 1;
  })["with"]("integer", function() {
    return 1;
  })["with"]("boolean", function() {
    return 1;
  })["with"]("null", function() {
    return 1;
  }).otherwise(function() {
    return 0;
  });
};
var complexityByComposite = function complexityByComposite2(from) {
  if (!from)
    return 0;
  return match(from)["with"]("oneOf", function() {
    return 2;
  })["with"]("anyOf", function() {
    return 3;
  })["with"]("allOf", function() {
    return 2;
  })["with"]("enum", function() {
    return 1;
  })["with"]("array", function() {
    return 1;
  })["with"]("record", function() {
    return 1;
  })["with"]("empty-object", function() {
    return 1;
  })["with"]("object", function() {
    return 2;
  }).otherwise(function() {
    return 0;
  });
};
function getSchemaComplexity(_ref) {
  var current = _ref.current, schema = _ref.schema;
  if (!schema)
    return current;
  if (isReferenceObject(schema))
    return current + 2;
  if (Array.isArray(schema.type)) {
    if (schema.type.length === 1) {
      return complexityByComposite("oneOf") + getSchemaComplexity({
        current,
        schema: _objectSpread2(_objectSpread2({}, schema), {}, {
          type: schema.type[0]
        })
      });
    }
    return current + complexityByComposite("oneOf") + getSum(schema.type.map(function(prop) {
      return getSchemaComplexity({
        current: 0,
        schema: _objectSpread2(_objectSpread2({}, schema), {}, {
          type: prop
        })
      });
    }));
  }
  if (schema.type === "null") {
    return current + complexityByType(_objectSpread2(_objectSpread2({}, schema), {}, {
      type: "null"
    }));
  }
  if (schema.oneOf) {
    if (schema.oneOf.length === 1) {
      return complexityByComposite("oneOf") + getSchemaComplexity({
        current,
        schema: schema.oneOf[0]
      });
    }
    return current + complexityByComposite("oneOf") + getSum(schema.oneOf.map(function(prop) {
      return getSchemaComplexity({
        current: 0,
        schema: prop
      });
    }));
  }
  if (schema.anyOf) {
    if (schema.anyOf.length === 1) {
      return complexityByComposite("anyOf") + getSchemaComplexity({
        current,
        schema: schema.anyOf[0]
      });
    }
    return current + complexityByComposite("anyOf") + getSum(schema.anyOf.map(function(prop) {
      return getSchemaComplexity({
        current: 0,
        schema: prop
      });
    }));
  }
  if (schema.allOf) {
    if (schema.allOf.length === 1) {
      return complexityByComposite("allOf") + getSchemaComplexity({
        current,
        schema: schema.allOf[0]
      });
    }
    return current + complexityByComposite("allOf") + getSum(schema.allOf.map(function(prop) {
      return getSchemaComplexity({
        current: 0,
        schema: prop
      });
    }));
  }
  if (!schema.type)
    return current;
  if (isPrimitiveType$1(schema.type)) {
    if (schema["enum"]) {
      return current + complexityByType(schema) + complexityByComposite("enum") + getSum(schema["enum"].map(function(prop) {
        return getSchemaComplexity({
          current: 0,
          schema: prop
        });
      }));
    }
    return current + complexityByType(schema);
  }
  if (schema.type === "array") {
    if (schema.items) {
      return complexityByComposite("array") + getSchemaComplexity({
        current,
        schema: schema.items
      });
    }
    return complexityByComposite("array") + getSchemaComplexity({
      current,
      schema: void 0
    });
  }
  if (schema.type === "object" || schema.properties || schema.additionalProperties) {
    if (schema.additionalProperties) {
      if (schema.additionalProperties === true) {
        return complexityByComposite("record") + getSchemaComplexity({
          current,
          schema: void 0
        });
      }
      return complexityByComposite("record") + getSchemaComplexity({
        current,
        schema: schema.additionalProperties
      });
    }
    if (schema.properties) {
      var props = Object.values(schema.properties);
      return current + complexityByComposite("object") + getSum(props.map(function(prop) {
        return getSchemaComplexity({
          current: 0,
          schema: prop
        });
      }));
    }
    return complexityByComposite("empty-object") + getSchemaComplexity({
      current,
      schema: void 0
    });
  }
  return current;
}
var CodeMeta = /* @__PURE__ */ function() {
  function CodeMeta2(schema, ctx) {
    var _meta$referencedBy;
    var meta = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    _classCallCheck(this, CodeMeta2);
    _defineProperty(this, "children", []);
    this.schema = schema;
    this.ctx = ctx;
    if (isReferenceObject(schema)) {
      this.ref = schema.$ref;
    }
    this.meta = _objectSpread2({}, meta);
    this.meta.referencedBy = _toConsumableArray((_meta$referencedBy = meta === null || meta === void 0 ? void 0 : meta.referencedBy) !== null && _meta$referencedBy !== void 0 ? _meta$referencedBy : []);
    if (this.ref) {
      this.meta.referencedBy.push(this);
    }
  }
  _createClass(CodeMeta2, [{
    key: "codeString",
    get: function get2() {
      if (this.code)
        return this.code;
      return this.ctx ? this.ctx.resolver.resolveRef(this.ref).normalized : this.ref;
    }
  }, {
    key: "complexity",
    get: function get2() {
      return getSchemaComplexity({
        current: 0,
        schema: this.schema
      });
    }
  }, {
    key: "assign",
    value: function assign(code) {
      this.code = code;
      return this;
    }
  }, {
    key: "inherit",
    value: function inherit(parent) {
      if (parent) {
        parent.children.push(this);
      }
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.codeString;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.codeString;
    }
  }]);
  return CodeMeta2;
}();
function getZodSchema(_ref) {
  var schema = _ref.schema, ctx = _ref.ctx, inheritedMeta = _ref.meta, options = _ref.options;
  if (!schema) {
    throw new Error("Schema is required");
  }
  var code = new CodeMeta(schema, ctx, inheritedMeta);
  var meta = {
    parent: code.inherit(inheritedMeta === null || inheritedMeta === void 0 ? void 0 : inheritedMeta.parent),
    referencedBy: _toConsumableArray(code.meta.referencedBy)
  };
  var refsPath = code.meta.referencedBy.slice(0, -1).map(function(prev) {
    return ctx ? ctx.resolver.resolveRef(prev.ref).normalized : prev.ref;
  });
  if (isReferenceObject(schema)) {
    var _ctx$resolver$resolve;
    if (!ctx)
      throw new Error("Context is required");
    var schemaName = (_ctx$resolver$resolve = ctx.resolver.resolveRef(schema.$ref)) === null || _ctx$resolver$resolve === void 0 ? void 0 : _ctx$resolver$resolve.normalized;
    if (refsPath.length > 1 && refsPath.includes(schemaName)) {
      return code.assign(ctx.zodSchemaByName[code.ref]);
    }
    var result = ctx.zodSchemaByName[schema.$ref];
    if (!result) {
      var actualSchema = ctx.resolver.getSchemaByRef(schema.$ref);
      if (!actualSchema) {
        throw new Error("Schema ".concat(schema.$ref, " not found"));
      }
      result = getZodSchema({
        schema: actualSchema,
        ctx,
        meta,
        options
      }).toString();
    }
    if (ctx.zodSchemaByName[schemaName]) {
      return code;
    }
    ctx.zodSchemaByName[schemaName] = result;
    return code;
  }
  if (Array.isArray(schema.type)) {
    if (schema.type.length === 1) {
      return getZodSchema({
        schema: _objectSpread2(_objectSpread2({}, schema), {}, {
          type: schema.type[0]
        }),
        ctx,
        meta,
        options
      });
    }
    return code.assign("z.union([".concat(schema.type.map(function(prop) {
      return getZodSchema({
        schema: _objectSpread2(_objectSpread2({}, schema), {}, {
          type: prop
        }),
        ctx,
        meta,
        options
      });
    }).join(", "), "])"));
  }
  if (schema.type === "null") {
    return code.assign("z.null()");
  }
  if (schema.oneOf) {
    if (schema.oneOf.length === 1) {
      var _type = getZodSchema({
        schema: schema.oneOf[0],
        ctx,
        meta,
        options
      });
      return code.assign(_type.toString());
    }
    if (schema.discriminator) {
      var propertyName = schema.discriminator.propertyName;
      return code.assign('\n                z.discriminatedUnion("'.concat(propertyName, '", [').concat(schema.oneOf.map(function(prop) {
        return getZodSchema({
          schema: prop,
          ctx,
          meta,
          options
        });
      }).join(", "), "])\n            "));
    }
    return code.assign("z.union([".concat(schema.oneOf.map(function(prop) {
      return getZodSchema({
        schema: prop,
        ctx,
        meta,
        options
      });
    }).join(", "), "])"));
  }
  if (schema.anyOf) {
    if (schema.anyOf.length === 1) {
      var _type2 = getZodSchema({
        schema: schema.anyOf[0],
        ctx,
        meta,
        options
      });
      return code.assign(_type2.toString());
    }
    var types = schema.anyOf.map(function(prop) {
      return getZodSchema({
        schema: prop,
        ctx,
        meta,
        options
      });
    }).map(function(type) {
      var isObject = true;
      if ("type" in type.schema) {
        if (Array.isArray(type.schema.type)) {
          isObject = false;
        } else {
          var _schemaType = type.schema.type.toLowerCase();
          isObject = !isPrimitiveType$1(_schemaType);
        }
      }
      return isObject ? "".concat(type.toString(), ".passthrough()") : type.toString();
    }).join(", ");
    return code.assign("z.union([".concat(types, "])"));
  }
  if (schema.allOf) {
    if (schema.allOf.length === 1) {
      var _type3 = getZodSchema({
        schema: schema.allOf[0],
        ctx,
        meta,
        options
      });
      return code.assign(_type3.toString());
    }
    var _types = schema.allOf.map(function(prop) {
      return getZodSchema({
        schema: prop,
        ctx,
        meta,
        options
      });
    });
    var first = _types.at(0);
    var rest = _types.slice(1).map(function(type) {
      return "and(".concat(type.toString(), ")");
    }).join(".");
    return code.assign("".concat(first.toString(), ".").concat(rest));
  }
  var schemaType = schema.type ? schema.type.toLowerCase() : void 0;
  if (schemaType && isPrimitiveType$1(schemaType)) {
    if (schema["enum"]) {
      if (schemaType === "string") {
        if (schema["enum"].length === 1) {
          var value = schema["enum"][0];
          var valueString = value === null ? "null" : '"'.concat(value, '"');
          return code.assign("z.literal(".concat(valueString, ")"));
        }
        return code.assign("z.enum([".concat(schema["enum"].map(function(value2) {
          return '"'.concat(value2, '"');
        }).join(", "), "])"));
      }
      if (schema["enum"].some(function(e) {
        return typeof e === "string";
      })) {
        return code.assign("z.never()");
      }
      if (schema["enum"].length === 1) {
        var _value = schema["enum"][0];
        return code.assign("z.literal(".concat(_value === null ? "null" : _value, ")"));
      }
      return code.assign(
        // eslint-disable-next-line sonarjs/no-nested-template-literals
        "z.union([".concat(schema["enum"].map(function(value2) {
          return "z.literal(".concat(value2 === null ? "null" : value2, ")");
        }).join(", "), "])")
      );
    }
    return code.assign(match(schemaType)["with"]("integer", function() {
      return "z.number()";
    })["with"]("string", function() {
      return match(schema.format)["with"]("binary", function() {
        return "z.instanceof(File)";
      }).otherwise(function() {
        return "z.string()";
      });
    }).otherwise(function(type) {
      return "z.".concat(type, "()");
    }));
  }
  if (schemaType === "array") {
    if (schema.items) {
      return code.assign("z.array(".concat(getZodSchema({
        schema: schema.items,
        ctx,
        meta,
        options
      }).toString(), ")"));
    }
    return code.assign("z.array(z.any())");
  }
  if (schemaType === "object" || schema.properties || schema.additionalProperties) {
    var _schema$required;
    var additionalProps = "";
    if (typeof schema.additionalProperties === "boolean" && schema.additionalProperties || _typeof(schema.additionalProperties) === "object" && Object.keys(schema.additionalProperties).length === 0) {
      additionalProps = ".passthrough()";
    } else if (_typeof(schema.additionalProperties) === "object") {
      return code.assign("z.record(".concat(getZodSchema({
        schema: schema.additionalProperties,
        ctx,
        meta,
        options
      }).toString(), ")"));
    }
    var hasRequiredArray = schema.required && schema.required.length > 0;
    var isPartial = options !== null && options !== void 0 && options.withImplicitRequiredProps ? false : !((_schema$required = schema.required) !== null && _schema$required !== void 0 && _schema$required.length);
    var properties = "{}";
    if (schema.properties) {
      var propsMap = Object.entries(schema.properties).map(function(_ref2) {
        var _schema$required2;
        var _ref3 = _slicedToArray(_ref2, 2), prop = _ref3[0], propSchema = _ref3[1];
        var propMetadata = _objectSpread2(_objectSpread2({}, meta), {}, {
          isRequired: isPartial ? true : hasRequiredArray ? (_schema$required2 = schema.required) === null || _schema$required2 === void 0 ? void 0 : _schema$required2.includes(prop) : options === null || options === void 0 ? void 0 : options.withImplicitRequiredProps,
          name: prop
        });
        var propActualSchema = propSchema;
        if (isReferenceObject(propSchema) && ctx !== null && ctx !== void 0 && ctx.resolver) {
          propActualSchema = ctx.resolver.getSchemaByRef(propSchema.$ref);
          if (!propActualSchema) {
            throw new Error("Schema ".concat(propSchema.$ref, " not found"));
          }
        }
        var propCode = getZodSchema({
          schema: propSchema,
          ctx,
          meta: propMetadata,
          options
        }) + getZodChain({
          schema: propActualSchema,
          meta: propMetadata,
          options
        });
        return [prop, propCode.toString()];
      });
      properties = "{ " + propsMap.map(function(_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2), prop = _ref5[0], propSchema = _ref5[1];
        return "".concat(wrapWithQuotesIfNeeded(prop), ": ").concat(propSchema);
      }).join(", ") + " }";
    }
    return code.assign("z.object(".concat(properties, ")").concat(isPartial ? ".partial()" : "").concat(additionalProps));
  }
  if (!schemaType)
    return code.assign("z.unknown()");
  throw new Error("Unsupported schema type: ".concat(schemaType));
}
var getZodChain = function getZodChain2(_ref6) {
  var schema = _ref6.schema, meta = _ref6.meta, options = _ref6.options;
  var chains = [];
  match(schema.type)["with"]("string", function() {
    return chains.push(getZodChainableStringValidations(schema));
  })["with"]("number", "integer", function() {
    return chains.push(getZodChainableNumberValidations(schema));
  })["with"]("array", function() {
    return chains.push(getZodChainableArrayValidations(schema));
  }).otherwise(function() {
    return void 0;
  });
  if (typeof schema.description === "string" && schema.description !== "" && options !== null && options !== void 0 && options.withDescription) {
    chains.push('describe("'.concat(schema.description, '")'));
  }
  var output = chains.concat(getZodChainablePresence(schema, meta), (options === null || options === void 0 ? void 0 : options.withDefaultValues) !== false ? getZodChainableDefault(schema) : []).filter(Boolean).join(".");
  return output ? ".".concat(output) : "";
};
var getZodChainablePresence = function getZodChainablePresence2(schema, meta) {
  if (schema.nullable && !(meta !== null && meta !== void 0 && meta.isRequired)) {
    return "nullish()";
  }
  if (schema.nullable) {
    return "nullable()";
  }
  if (!(meta !== null && meta !== void 0 && meta.isRequired)) {
    return "optional()";
  }
  return "";
};
var unwrapQuotesIfNeeded = function unwrapQuotesIfNeeded2(value) {
  if (typeof value === "string" && value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }
  return value;
};
var getZodChainableDefault = function getZodChainableDefault2(schema) {
  if (schema["default"]) {
    var value = match(schema.type)["with"]("number", "integer", function() {
      return unwrapQuotesIfNeeded(schema["default"]);
    }).otherwise(function() {
      return JSON.stringify(schema["default"]);
    });
    return "default(".concat(value, ")");
  }
  return "";
};
var formatPatternIfNeeded = function formatPatternIfNeeded2(pattern) {
  if (pattern.startsWith("/") && pattern.endsWith("/")) {
    pattern = pattern.slice(1, -1);
  }
  pattern = escapeControlCharacters(pattern);
  return "/".concat(pattern, "/");
};
var getZodChainableStringValidations = function getZodChainableStringValidations2(schema) {
  var validations = [];
  if (!schema["enum"]) {
    if (schema.minLength !== void 0) {
      validations.push("min(".concat(schema.minLength, ")"));
    }
    if (schema.maxLength !== void 0) {
      validations.push("max(".concat(schema.maxLength, ")"));
    }
  }
  if (schema.pattern) {
    validations.push("regex(".concat(formatPatternIfNeeded(schema.pattern), ")"));
  }
  if (schema.format) {
    var chain = match(schema.format)["with"]("email", function() {
      return "email()";
    })["with"]("hostname", function() {
      return "url()";
    })["with"]("uri", function() {
      return "url()";
    })["with"]("uuid", function() {
      return "uuid()";
    })["with"]("date-time", function() {
      return "datetime({ offset: true })";
    }).otherwise(function() {
      return "";
    });
    if (chain) {
      validations.push(chain);
    }
  }
  return validations.join(".");
};
var getZodChainableNumberValidations = function getZodChainableNumberValidations2(schema) {
  var validations = [];
  if (schema.type === "integer" && !schema["enum"]) {
    validations.push("int()");
  }
  if (schema.minimum !== void 0) {
    if (schema.exclusiveMinimum === true) {
      validations.push("gt(".concat(schema.minimum, ")"));
    } else {
      validations.push("gte(".concat(schema.minimum, ")"));
    }
  } else if (typeof schema.exclusiveMinimum === "number") {
    validations.push("gt(".concat(schema.exclusiveMinimum, ")"));
  }
  if (schema.maximum !== void 0) {
    if (schema.exclusiveMaximum === true) {
      validations.push("lt(".concat(schema.maximum, ")"));
    } else {
      validations.push("lte(".concat(schema.maximum, ")"));
    }
  } else if (typeof schema.exclusiveMaximum === "number") {
    validations.push("lt(".concat(schema.exclusiveMaximum, ")"));
  }
  if (schema.multipleOf) {
    validations.push("multipleOf(".concat(schema.multipleOf, ")"));
  }
  return validations.join(".");
};
var getZodChainableArrayValidations = function getZodChainableArrayValidations2(schema) {
  var validations = [];
  if (schema.minItems) {
    validations.push("min(".concat(schema.minItems, ")"));
  }
  if (schema.maxItems) {
    validations.push("max(".concat(schema.maxItems, ")"));
  }
  return validations.join(".");
};
var voidSchema = "z.void()";
var getZodiosEndpointDefinitionList = function getZodiosEndpointDefinitionList2(doc, options) {
  var _doc$components$schem, _doc$components, _options$complexityTh, _options$defaultStatu;
  var resolver = makeSchemaResolver(doc);
  var graphs = getOpenApiDependencyGraph(Object.keys((_doc$components$schem = (_doc$components = doc.components) === null || _doc$components === void 0 ? void 0 : _doc$components.schemas) !== null && _doc$components$schem !== void 0 ? _doc$components$schem : {}).map(function(name) {
    return asComponentSchema(name);
  }), resolver.getSchemaByRef);
  var endpoints = [];
  var isMainResponseStatus = function isMainResponseStatus2(status) {
    return status >= 200 && status < 300;
  };
  if (options !== null && options !== void 0 && options.isMainResponseStatus) {
    isMainResponseStatus = typeof options.isMainResponseStatus === "string" ? function(status) {
      return sync(options.isMainResponseStatus, {
        status
      }, {
        functions: true
      });
    } : options.isMainResponseStatus;
  }
  var isErrorStatus = function isErrorStatus2(status) {
    return !(status >= 200 && status < 300);
  };
  if (options !== null && options !== void 0 && options.isErrorStatus) {
    isErrorStatus = typeof options.isErrorStatus === "string" ? function(status) {
      return sync(options.isErrorStatus, {
        status
      }, {
        functions: true
      });
    } : options.isErrorStatus;
  }
  var isMediaTypeAllowed = function isMediaTypeAllowed2(mediaType) {
    return mediaType === "application/json";
  };
  if (options !== null && options !== void 0 && options.isMediaTypeAllowed) {
    isMediaTypeAllowed = typeof options.isMediaTypeAllowed === "string" ? function(mediaType) {
      return sync(options.isMediaTypeAllowed, {
        mediaType
      }, {
        functions: true
      });
    } : options.isMediaTypeAllowed;
  }
  var getOperationAlias = function getOperationAlias2(path3, method2, operation) {
    var _operation$operationI;
    return (_operation$operationI = operation.operationId) !== null && _operation$operationI !== void 0 ? _operation$operationI : method2 + pathToVariableName(path3);
  };
  if (options !== null && options !== void 0 && options.withAlias && typeof options.withAlias === "function") {
    getOperationAlias = options.withAlias;
  }
  var ctx = {
    resolver,
    zodSchemaByName: {},
    schemaByName: {}
  };
  var complexityThreshold = (_options$complexityTh = options === null || options === void 0 ? void 0 : options.complexityThreshold) !== null && _options$complexityTh !== void 0 ? _options$complexityTh : 4;
  var getZodVarName = function getZodVarName2(input, fallbackName) {
    var result = input.toString();
    if (complexityThreshold === -1) {
      return input.ref ? ctx.zodSchemaByName[result] : result;
    }
    if ((result.startsWith("z.") || input.ref === void 0) && fallbackName) {
      if (input.complexity < complexityThreshold) {
        return result;
      }
      var safeName = normalizeString(fallbackName);
      if (ctx.schemaByName[result]) {
        return ctx.schemaByName[result];
      }
      var formatedName = safeName;
      var reuseCount = 1;
      var isVarNameAlreadyUsed = false;
      while (isVarNameAlreadyUsed = Boolean(ctx.zodSchemaByName[formatedName])) {
        if (isVarNameAlreadyUsed) {
          if (ctx.zodSchemaByName[formatedName] === safeName) {
            return formatedName;
          } else {
            reuseCount += 1;
            formatedName = "".concat(safeName, "__").concat(reuseCount);
          }
        }
      }
      ctx.zodSchemaByName[formatedName] = result;
      ctx.schemaByName[result] = formatedName;
      return formatedName;
    }
    var schema = ctx.zodSchemaByName[result];
    if (!schema && input.ref) {
      var refInfo = ctx.resolver.resolveRef(input.ref);
      schema = ctx.zodSchemaByName[refInfo.name];
    }
    if (input.ref && schema) {
      var complexity = getSchemaComplexity({
        current: 0,
        schema: ctx.resolver.getSchemaByRef(input.ref)
      });
      if (complexity < complexityThreshold) {
        return ctx.zodSchemaByName[result];
      }
      return result;
    }
    console.log({
      ref: input.ref,
      fallbackName,
      result
    });
    throw new Error("Invalid ref: " + input.ref);
  };
  var defaultStatusBehavior = (_options$defaultStatu = options === null || options === void 0 ? void 0 : options.defaultStatusBehavior) !== null && _options$defaultStatu !== void 0 ? _options$defaultStatu : "spec-compliant";
  var ignoredFallbackResponse = [];
  var ignoredGenericError = [];
  for (var path2 in doc.paths) {
    var _pathItemObj$paramete;
    var pathItemObj = doc.paths[path2];
    var pathItem = pick(pathItemObj, ["get", "put", "post", "delete", "options", "head", "patch", "trace"]);
    var parametersMap = getParametersMap((_pathItemObj$paramete = pathItemObj.parameters) !== null && _pathItemObj$paramete !== void 0 ? _pathItemObj$paramete : []);
    var _loop = function _loop2(method2) {
      var _operation$parameters, _operation$responses;
      var operation = pathItem[method2];
      if (!operation)
        return "continue";
      if (options !== null && options !== void 0 && options.withDeprecatedEndpoints ? false : operation.deprecated)
        return "continue";
      var parameters = Object.entries(_objectSpread2(_objectSpread2({}, parametersMap), getParametersMap((_operation$parameters = operation.parameters) !== null && _operation$parameters !== void 0 ? _operation$parameters : []))).map(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 2);
        _ref2[0];
        var param = _ref2[1];
        return param;
      });
      var operationName = getOperationAlias(path2, method2, operation);
      var endpointDefinition = {
        method: method2,
        path: replaceHyphenatedPath(path2),
        alias: operationName,
        description: operation.description,
        operationId: operation.operationId,
        security: JSON.stringify(operation.security),
        requestFormat: "json",
        parameters: [],
        errors: [],
        response: ""
      };
      if (operation.requestBody) {
        var _requestBody$content, _requestBody$content2, _requestBody$content3;
        var requestBody = isReferenceObject(operation.requestBody) ? ctx.resolver.getSchemaByRef(operation.requestBody.$ref) : operation.requestBody;
        var mediaTypes = Object.keys((_requestBody$content = requestBody.content) !== null && _requestBody$content !== void 0 ? _requestBody$content : {});
        var matchingMediaType = mediaTypes.find(isAllowedParamMediaTypes);
        var bodySchema = matchingMediaType && ((_requestBody$content2 = requestBody.content) === null || _requestBody$content2 === void 0 ? void 0 : (_requestBody$content3 = _requestBody$content2[matchingMediaType]) === null || _requestBody$content3 === void 0 ? void 0 : _requestBody$content3.schema);
        if (bodySchema) {
          var _requestBody$required;
          match(matchingMediaType)["with"]("application/octet-stream", function() {
            endpointDefinition.requestFormat = "binary";
          })["with"]("application/x-www-form-urlencoded", function() {
            endpointDefinition.requestFormat = "form-url";
          })["with"]("multipart/form-data", function() {
            endpointDefinition.requestFormat = "form-data";
          }).otherwise(function(value) {
            if (value.includes("json")) {
              endpointDefinition.requestFormat = "json";
              return;
            }
            endpointDefinition.requestFormat = "text";
          });
          var bodyCode = getZodSchema({
            schema: bodySchema,
            ctx,
            meta: {
              isRequired: (_requestBody$required = requestBody.required) !== null && _requestBody$required !== void 0 ? _requestBody$required : true
            },
            options
          });
          endpointDefinition.parameters.push({
            name: "body",
            type: "Body",
            description: requestBody.description,
            schema: getZodVarName(bodyCode, operationName + "_Body") + getZodChain({
              schema: isReferenceObject(bodySchema) ? ctx.resolver.getSchemaByRef(bodySchema.$ref) : bodySchema,
              meta: bodyCode.meta
            })
          });
        }
      }
      var _iterator = _createForOfIteratorHelper(parameters), _step;
      try {
        var _loop22 = function _loop23() {
          var param = _step.value;
          var paramItem = isReferenceObject(param) ? ctx.resolver.getSchemaByRef(param.$ref) : param;
          if (allowedPathInValues.includes(paramItem["in"])) {
            var _paramSchema, _paramItem$required;
            var paramSchema;
            if (paramItem.content) {
              var _paramItem$content;
              var _mediaTypes3 = Object.keys((_paramItem$content = paramItem.content) !== null && _paramItem$content !== void 0 ? _paramItem$content : {});
              var _matchingMediaType3 = _mediaTypes3.find(isAllowedParamMediaTypes);
              if (!_matchingMediaType3) {
                throw new Error("Unsupported media type for param ".concat(paramItem.name, ": ") + _mediaTypes3.join(", "));
              }
              var mediaTypeObject = paramItem.content[_matchingMediaType3];
              if (!mediaTypeObject) {
                throw new Error("No content with media type for param ".concat(paramItem.name, ": ") + _matchingMediaType3);
              }
              paramSchema = mediaTypeObject === null || mediaTypeObject === void 0 ? void 0 : mediaTypeObject.schema;
              if (!paramSchema) {
                paramSchema = mediaTypeObject;
              }
            } else {
              paramSchema = isReferenceObject(paramItem.schema) ? ctx.resolver.getSchemaByRef(paramItem.schema.$ref) : paramItem.schema;
            }
            if (options !== null && options !== void 0 && options.withDescription && paramSchema) {
              var _ref3, _paramItem$descriptio;
              paramSchema.description = (_ref3 = (_paramItem$descriptio = paramItem.description) !== null && _paramItem$descriptio !== void 0 ? _paramItem$descriptio : "") === null || _ref3 === void 0 ? void 0 : _ref3.replace("\n", "");
            }
            paramSchema = paramSchema ? isReferenceObject(paramSchema) ? ctx.resolver.getSchemaByRef(paramSchema.$ref) : paramSchema : {};
            var paramCode = getZodSchema({
              schema: (_paramSchema = paramSchema) !== null && _paramSchema !== void 0 ? _paramSchema : {},
              ctx,
              meta: {
                isRequired: paramItem["in"] === "path" ? true : (_paramItem$required = paramItem.required) !== null && _paramItem$required !== void 0 ? _paramItem$required : false
              }
            });
            endpointDefinition.parameters.push({
              name: match(paramItem["in"])["with"]("path", function() {
                return pathParamToVariableName(paramItem.name);
              }).otherwise(function() {
                return paramItem.name;
              }),
              type: match(paramItem["in"])["with"]("header", function() {
                return "Header";
              })["with"]("query", function() {
                return "Query";
              })["with"]("path", function() {
                return "Path";
              }).run(),
              schema: getZodVarName(paramCode.assign(paramCode.toString() + getZodChain({
                schema: paramSchema,
                meta: paramCode.meta,
                options
              })), paramItem.name)
            });
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          _loop22();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      for (var statusCode in operation.responses) {
        var _responseItem$content, _responseItem$content2, _responseItem$content3;
        var responseItem = operation.responses[statusCode];
        var _mediaTypes = Object.keys((_responseItem$content = responseItem.content) !== null && _responseItem$content !== void 0 ? _responseItem$content : {});
        var _matchingMediaType = _mediaTypes.find(isMediaTypeAllowed);
        var maybeSchema = _matchingMediaType ? (_responseItem$content2 = responseItem.content) === null || _responseItem$content2 === void 0 ? void 0 : (_responseItem$content3 = _responseItem$content2[_matchingMediaType]) === null || _responseItem$content3 === void 0 ? void 0 : _responseItem$content3.schema : null;
        var schemaString = _matchingMediaType ? void 0 : voidSchema;
        var schema = void 0;
        if (maybeSchema) {
          schema = getZodSchema({
            schema: maybeSchema,
            ctx,
            meta: {
              isRequired: true
            },
            options
          });
          schemaString = (schema.ref ? getZodVarName(schema) : schema.toString()) + getZodChain({
            schema: isReferenceObject(maybeSchema) ? ctx.resolver.getSchemaByRef(maybeSchema.$ref) : maybeSchema,
            meta: schema.meta
          });
        }
        if (schemaString) {
          var status = Number(statusCode);
          if (isMainResponseStatus(status) && !endpointDefinition.response) {
            endpointDefinition.response = schemaString;
            if (!endpointDefinition.description && responseItem.description && options !== null && options !== void 0 && options.useMainResponseDescriptionAsEndpointDefinitionFallback) {
              endpointDefinition.description = responseItem.description;
            }
          } else if (statusCode !== "default" && isErrorStatus(status)) {
            endpointDefinition.errors.push({
              schema: schemaString,
              status,
              description: responseItem.description
            });
          }
        }
      }
      if ((_operation$responses = operation.responses) !== null && _operation$responses !== void 0 && _operation$responses["default"]) {
        var _responseItem$content4, _responseItem$content5, _responseItem$content6;
        var _responseItem = operation.responses["default"];
        var _mediaTypes2 = Object.keys((_responseItem$content4 = _responseItem.content) !== null && _responseItem$content4 !== void 0 ? _responseItem$content4 : {});
        var _matchingMediaType2 = _mediaTypes2.find(isMediaTypeAllowed);
        var _maybeSchema = _matchingMediaType2 && ((_responseItem$content5 = _responseItem.content) === null || _responseItem$content5 === void 0 ? void 0 : (_responseItem$content6 = _responseItem$content5[_matchingMediaType2]) === null || _responseItem$content6 === void 0 ? void 0 : _responseItem$content6.schema);
        var _schemaString = _matchingMediaType2 ? void 0 : voidSchema;
        var _schema;
        if (_maybeSchema) {
          _schema = getZodSchema({
            schema: _maybeSchema,
            ctx,
            meta: {
              isRequired: true
            },
            options
          });
          _schemaString = (_schema.ref ? getZodVarName(_schema) : _schema.toString()) + getZodChain({
            schema: isReferenceObject(_maybeSchema) ? ctx.resolver.getSchemaByRef(_maybeSchema.$ref) : _maybeSchema,
            meta: _schema.meta
          });
        }
        if (_schemaString) {
          if (defaultStatusBehavior === "auto-correct") {
            if (endpointDefinition.response) {
              endpointDefinition.errors.push({
                schema: _schemaString,
                status: "default",
                description: _responseItem.description
              });
            } else {
              endpointDefinition.response = _schemaString;
            }
          } else {
            if (endpointDefinition.response) {
              ignoredFallbackResponse.push(operationName);
            } else {
              ignoredGenericError.push(operationName);
            }
          }
        }
      }
      if (!endpointDefinition.response) {
        endpointDefinition.response = voidSchema;
      }
      endpoints.push(endpointDefinition);
    };
    for (var method in pathItem) {
      var _ret = _loop(method);
      if (_ret === "continue")
        continue;
    }
  }
  if ((options === null || options === void 0 ? void 0 : options.willSuppressWarnings) !== true) {
    if (ignoredFallbackResponse.length > 0) {
      console.warn("The following endpoints have no status code other than `default` and were ignored as the OpenAPI spec recommends. However they could be added by setting `defaultStatusBehavior` to `auto-correct`: ".concat(ignoredGenericError.join(", ")));
    }
    if (ignoredGenericError.length > 0) {
      console.warn("The following endpoints could have had a generic error response added by setting `defaultStatusBehavior` to `auto-correct` ".concat(ignoredGenericError.join(", ")));
    }
  }
  return _objectSpread2(_objectSpread2(_objectSpread2({}, ctx), graphs), {}, {
    endpoints,
    issues: {
      ignoredFallbackResponse,
      ignoredGenericError
    }
  });
};
var getParametersMap = function getParametersMap2(parameters) {
  return Object.fromEntries((parameters !== null && parameters !== void 0 ? parameters : []).map(function(param) {
    return [isReferenceObject(param) ? param.$ref : param.name, param];
  }));
};
var allowedPathInValues = ["query", "header", "path"];
var allowedParamMediaTypes = ["application/octet-stream", "multipart/form-data", "application/x-www-form-urlencoded", "*/*"];
var isAllowedParamMediaTypes = function isAllowedParamMediaTypes2(mediaType) {
  return mediaType.includes("application/") && mediaType.includes("json") || allowedParamMediaTypes.includes(mediaType) || mediaType.includes("text/");
};
function pick(obj, paths) {
  var result = {};
  Object.keys(obj).forEach(function(key) {
    if (!paths.includes(key))
      return;
    result[key] = obj[key];
  });
  return result;
}
var getTypescriptFromOpenApi = function getTypescriptFromOpenApi2(_ref) {
  var schema = _ref.schema, inheritedMeta = _ref.meta, ctx = _ref.ctx;
  var meta = {};
  var isInline = !(inheritedMeta !== null && inheritedMeta !== void 0 && inheritedMeta.name);
  if (ctx !== null && ctx !== void 0 && ctx.visitedsRefs && inheritedMeta !== null && inheritedMeta !== void 0 && inheritedMeta.$ref) {
    ctx.rootRef = inheritedMeta.$ref;
    ctx.visitedsRefs[inheritedMeta.$ref] = true;
  }
  if (!schema) {
    throw new Error("Schema is required");
  }
  var canBeWrapped = !isInline;
  var getTs = function getTs2() {
    if (isReferenceObject(schema)) {
      var _ctx$resolver$resolve;
      if (!(ctx !== null && ctx !== void 0 && ctx.visitedsRefs) || !(ctx !== null && ctx !== void 0 && ctx.resolver))
        throw new Error("Context is required for OpenAPI $ref");
      var result = ctx.nodeByRef[schema.$ref];
      var schemaName = (_ctx$resolver$resolve = ctx.resolver.resolveRef(schema.$ref)) === null || _ctx$resolver$resolve === void 0 ? void 0 : _ctx$resolver$resolve.normalized;
      if (ctx.visitedsRefs[schema.$ref]) {
        return t.reference(schemaName);
      }
      if (!result) {
        var actualSchema = ctx.resolver.getSchemaByRef(schema.$ref);
        if (!actualSchema) {
          throw new Error("Schema ".concat(schema.$ref, " not found"));
        }
        ctx.visitedsRefs[schema.$ref] = true;
        result = getTypescriptFromOpenApi2({
          schema: actualSchema,
          meta,
          ctx
        });
      }
      return t.reference(schemaName);
    }
    if (Array.isArray(schema.type)) {
      if (schema.type.length === 1) {
        return getTypescriptFromOpenApi2({
          schema: _objectSpread2(_objectSpread2({}, schema), {}, {
            type: schema.type[0]
          }),
          ctx,
          meta
        });
      }
      return t.union(schema.type.map(function(prop) {
        return getTypescriptFromOpenApi2({
          schema: _objectSpread2(_objectSpread2({}, schema), {}, {
            type: prop
          }),
          ctx,
          meta
        });
      }));
    }
    if (schema.type === "null") {
      return t.reference("null");
    }
    if (schema.oneOf) {
      if (schema.oneOf.length === 1) {
        return getTypescriptFromOpenApi2({
          schema: schema.oneOf[0],
          ctx,
          meta
        });
      }
      return t.union(schema.oneOf.map(function(prop) {
        return getTypescriptFromOpenApi2({
          schema: prop,
          ctx,
          meta
        });
      }));
    }
    if (schema.anyOf) {
      if (schema.anyOf.length === 1) {
        return getTypescriptFromOpenApi2({
          schema: schema.anyOf[0],
          ctx,
          meta
        });
      }
      var oneOf = t.union(schema.anyOf.map(function(prop) {
        return getTypescriptFromOpenApi2({
          schema: prop,
          ctx,
          meta
        });
      }));
      return t.union([oneOf, t.array(oneOf)]);
    }
    if (schema.allOf) {
      if (schema.allOf.length === 1) {
        return getTypescriptFromOpenApi2({
          schema: schema.allOf[0],
          ctx,
          meta
        });
      }
      var types = schema.allOf.map(function(prop) {
        return getTypescriptFromOpenApi2({
          schema: prop,
          ctx,
          meta
        });
      });
      return t.intersection(types);
    }
    var schemaType = schema.type ? schema.type.toLowerCase() : void 0;
    if (schemaType && isPrimitiveType2(schemaType)) {
      if (schema["enum"]) {
        if (schemaType !== "string" && schema["enum"].some(function(e) {
          return typeof e === "string";
        })) {
          return t.never();
        }
        return t.union(schema["enum"]);
      }
      if (schemaType === "string")
        return t.string();
      if (schemaType === "boolean")
        return t["boolean"]();
      if (schemaType === "number" || schemaType === "integer")
        return t.number();
      if (schemaType === "null")
        return t.reference("null");
    }
    if (schemaType === "array") {
      if (schema.items) {
        var arrayOfType = getTypescriptFromOpenApi2({
          schema: schema.items,
          ctx,
          meta
        });
        if (typeof arrayOfType === "string") {
          if (!ctx)
            throw new Error("Context is required for circular $ref (recursive schemas)");
          arrayOfType = t.reference(arrayOfType);
        }
        return t.array(arrayOfType);
      }
      return t.array(t.any());
    }
    if (schemaType === "object" || schema.properties || schema.additionalProperties) {
      var _schema$required;
      if (!schema.properties) {
        return {};
      }
      canBeWrapped = false;
      var isPartial = !((_schema$required = schema.required) !== null && _schema$required !== void 0 && _schema$required.length);
      var additionalProperties;
      if (schema.additionalProperties) {
        var additionalPropertiesType;
        if (typeof schema.additionalProperties === "boolean" && schema.additionalProperties || _typeof(schema.additionalProperties) === "object" && Object.keys(schema.additionalProperties).length === 0) {
          additionalPropertiesType = t.any();
        } else if (_typeof(schema.additionalProperties) === "object") {
          additionalPropertiesType = getTypescriptFromOpenApi2({
            schema: schema.additionalProperties,
            ctx,
            meta
          });
        }
        additionalProperties = ts.factory.createTypeLiteralNode([ts.factory.createIndexSignature(void 0, [ts.factory.createParameterDeclaration(void 0, void 0, ts.factory.createIdentifier("key"), void 0, ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword))], additionalPropertiesType)]);
      }
      var props = Object.fromEntries(Object.entries(schema.properties).map(function(_ref2) {
        var _schema$required2;
        var _ref3 = _slicedToArray(_ref2, 2), prop = _ref3[0], propSchema = _ref3[1];
        var propType = getTypescriptFromOpenApi2({
          schema: propSchema,
          ctx,
          meta
        });
        if (typeof propType === "string") {
          if (!ctx)
            throw new Error("Context is required for circular $ref (recursive schemas)");
          propType = t.reference(propType);
        }
        var isRequired = Boolean(isPartial ? true : (_schema$required2 = schema.required) === null || _schema$required2 === void 0 ? void 0 : _schema$required2.includes(prop));
        return ["".concat(wrapWithQuotesIfNeeded(prop)), isRequired ? propType : t.optional(propType)];
      }));
      var objectType = additionalProperties ? t.intersection([props, additionalProperties]) : props;
      if (isInline) {
        return isPartial ? t.reference("Partial", [objectType]) : objectType;
      }
      if (!(inheritedMeta !== null && inheritedMeta !== void 0 && inheritedMeta.name)) {
        throw new Error("Name is required to convert an object schema to a type reference");
      }
      var base = t.type(inheritedMeta.name, objectType);
      if (!isPartial)
        return base;
      return t.type(inheritedMeta.name, t.reference("Partial", [objectType]));
    }
    if (!schemaType)
      return t.unknown();
    throw new Error("Unsupported schema type: ".concat(schemaType));
  };
  var tsResult = getTs();
  return canBeWrapped ? wrapTypeIfInline({
    isInline,
    name: inheritedMeta === null || inheritedMeta === void 0 ? void 0 : inheritedMeta.name,
    typeDef: tsResult
  }) : tsResult;
};
var isPrimitiveType2 = function isPrimitiveType3(type) {
  return primitiveTypeList.includes(type);
};
var primitiveTypeList = ["string", "number", "integer", "boolean", "null"];
var wrapTypeIfInline = function wrapTypeIfInline2(_ref4) {
  var isInline = _ref4.isInline, name = _ref4.name, typeDef = _ref4.typeDef;
  if (!isInline) {
    if (!name) {
      throw new Error("Name is required to convert a schema to a type reference");
    }
    return t.type(name, typeDef);
  }
  return typeDef;
};
function topologicalSort(graph) {
  var sorted = [], visited = {};
  function visit(name, ancestors) {
    if (!Array.isArray(ancestors))
      ancestors = [];
    ancestors.push(name);
    visited[name] = true;
    if (graph[name]) {
      graph[name].forEach(function(dep) {
        if (ancestors.includes(dep)) {
          return;
        }
        if (visited[dep])
          return;
        visit(dep, ancestors.slice(0));
      });
    }
    if (!sorted.includes(name))
      sorted.push(name);
  }
  Object.keys(graph).forEach(function(name) {
    return visit(name, []);
  });
  return sorted;
}
var file = ts.createSourceFile("", "", ts.ScriptTarget.ESNext, true);
var printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed
});
var printTs = function printTs2(node) {
  return printer.printNode(ts.EmitHint.Unspecified, node, file);
};
var getZodClientTemplateContext = function getZodClientTemplateContext2(openApiDoc, options) {
  var _openApiDoc$component, _openApiDoc$component2, _options$groupStrateg;
  var result = getZodiosEndpointDefinitionList(openApiDoc, options);
  var data = makeTemplateContext();
  var docSchemas = (_openApiDoc$component = (_openApiDoc$component2 = openApiDoc.components) === null || _openApiDoc$component2 === void 0 ? void 0 : _openApiDoc$component2.schemas) !== null && _openApiDoc$component !== void 0 ? _openApiDoc$component : {};
  var depsGraphs = getOpenApiDependencyGraph(Object.keys(docSchemas).map(function(name2) {
    return asComponentSchema(name2);
  }), result.resolver.getSchemaByRef);
  if (options !== null && options !== void 0 && options.shouldExportAllSchemas) {
    Object.entries(docSchemas).forEach(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2), name2 = _ref2[0], schema = _ref2[1];
      if (!result.zodSchemaByName[name2]) {
        result.zodSchemaByName[name2] = getZodSchema({
          schema,
          ctx: result
        }).toString();
      }
    });
  }
  var wrapWithLazyIfNeeded = function wrapWithLazyIfNeeded2(schemaName2) {
    var _result$resolver$reso, _depsGraphs$deepDepen;
    var code = result.zodSchemaByName[schemaName2], ref2 = (_result$resolver$reso = result.resolver.resolveSchemaName(schemaName2)) === null || _result$resolver$reso === void 0 ? void 0 : _result$resolver$reso.ref;
    var isCircular2 = ref2 && ((_depsGraphs$deepDepen = depsGraphs.deepDependencyGraph[ref2]) === null || _depsGraphs$deepDepen === void 0 ? void 0 : _depsGraphs$deepDepen.has(ref2));
    if (isCircular2) {
      data.circularTypeByName[schemaName2] = true;
    }
    return isCircular2 ? "z.lazy(() => ".concat(code, ")") : code;
  };
  for (var name in result.zodSchemaByName) {
    data.schemas[normalizeString(name)] = wrapWithLazyIfNeeded(name);
  }
  for (var ref in depsGraphs.deepDependencyGraph) {
    var _depsGraphs$deepDepen2;
    var isCircular = ref && ((_depsGraphs$deepDepen2 = depsGraphs.deepDependencyGraph[ref]) === null || _depsGraphs$deepDepen2 === void 0 ? void 0 : _depsGraphs$deepDepen2.has(ref));
    var ctx = {
      nodeByRef: {},
      resolver: result.resolver,
      visitedsRefs: {}
    };
    var schemaName = isCircular ? result.resolver.resolveRef(ref).normalized : void 0;
    if (isCircular && schemaName && !data.types[schemaName]) {
      var _depsGraphs$deepDepen3;
      var node = getTypescriptFromOpenApi({
        schema: result.resolver.getSchemaByRef(ref),
        ctx,
        meta: {
          name: schemaName
        }
      });
      data.types[schemaName] = printTs(node).replace("export ", "");
      var _iterator = _createForOfIteratorHelper((_depsGraphs$deepDepen3 = depsGraphs.deepDependencyGraph[ref]) !== null && _depsGraphs$deepDepen3 !== void 0 ? _depsGraphs$deepDepen3 : []), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _depsGraphs$deepDepen4;
          var depRef = _step.value;
          var depSchemaName = result.resolver.resolveRef(depRef).normalized;
          var isDepCircular = (_depsGraphs$deepDepen4 = depsGraphs.deepDependencyGraph[depRef]) === null || _depsGraphs$deepDepen4 === void 0 ? void 0 : _depsGraphs$deepDepen4.has(depRef);
          if (!isDepCircular && !data.types[depSchemaName]) {
            var _node = getTypescriptFromOpenApi({
              schema: result.resolver.getSchemaByRef(depRef),
              ctx,
              meta: {
                name: depSchemaName
              }
            });
            data.types[depSchemaName] = printTs(_node).replace("export ", "");
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
  var schemaOrderedByDependencies = topologicalSort(depsGraphs.deepDependencyGraph).map(function(ref2) {
    return result.resolver.resolveRef(ref2).ref;
  });
  data.schemas = sortObjKeysFromArray(data.schemas, schemaOrderedByDependencies);
  var groupStrategy = (_options$groupStrateg = options === null || options === void 0 ? void 0 : options.groupStrategy) !== null && _options$groupStrateg !== void 0 ? _options$groupStrateg : "none";
  var dependenciesByGroupName = /* @__PURE__ */ new Map();
  result.endpoints.forEach(function(endpoint) {
    if (!endpoint.response)
      return;
    data.endpoints.push(endpoint);
    if (groupStrategy !== "none") {
      var _openApiDoc$paths$end;
      var operationPath = getOriginalPathWithBrackets(endpoint.path);
      var pathItemObject = (_openApiDoc$paths$end = openApiDoc.paths[endpoint.path]) !== null && _openApiDoc$paths$end !== void 0 ? _openApiDoc$paths$end : openApiDoc.paths[operationPath];
      if (!pathItemObject) {
        console.warn("Missing path", endpoint.path);
        return;
      }
      var _operation = pathItemObject[endpoint.method];
      var baseName = match(groupStrategy)["with"]("tag", "tag-file", function() {
        var _operation$tags$, _operation$tags;
        return (_operation$tags$ = (_operation$tags = _operation.tags) === null || _operation$tags === void 0 ? void 0 : _operation$tags[0]) !== null && _operation$tags$ !== void 0 ? _operation$tags$ : "Default";
      })["with"]("method", "method-file", function() {
        return endpoint.method;
      }).exhaustive();
      var groupName = normalizeString(baseName);
      if (!data.endpointsGroups[groupName]) {
        data.endpointsGroups[groupName] = makeEndpointTemplateContext();
      }
      var group = data.endpointsGroups[groupName];
      group.endpoints.push(endpoint);
      if (!dependenciesByGroupName.has(groupName)) {
        dependenciesByGroupName.set(groupName, /* @__PURE__ */ new Set());
      }
      var dependencies = dependenciesByGroupName.get(groupName);
      var addDependencyIfNeeded = function addDependencyIfNeeded2(schemaName2) {
        if (!schemaName2)
          return;
        if (schemaName2.startsWith("z."))
          return;
        dependencies.add(schemaName2);
      };
      addDependencyIfNeeded(endpoint.response);
      endpoint.parameters.forEach(function(param) {
        return addDependencyIfNeeded(param.schema);
      });
      endpoint.errors.forEach(function(param) {
        return addDependencyIfNeeded(param.schema);
      });
      dependencies.forEach(function(schemaName2) {
        return group.schemas[schemaName2] = data.schemas[schemaName2];
      });
      if (groupStrategy.includes("file")) {
        _toConsumableArray(dependencies).forEach(function(schemaName2) {
          var _depsGraphs$deepDepen5;
          if (data.types[schemaName2]) {
            group.types[schemaName2] = data.types[schemaName2];
          }
          group.schemas[schemaName2] = data.schemas[schemaName2];
          (_depsGraphs$deepDepen5 = depsGraphs.deepDependencyGraph[result.resolver.resolveSchemaName(schemaName2).ref]) === null || _depsGraphs$deepDepen5 === void 0 ? void 0 : _depsGraphs$deepDepen5.forEach(function(transitiveRef) {
            var transitiveSchemaName = result.resolver.resolveRef(transitiveRef).normalized;
            addDependencyIfNeeded(transitiveSchemaName);
            group.types[transitiveSchemaName] = data.types[transitiveSchemaName];
            group.schemas[transitiveSchemaName] = data.schemas[transitiveSchemaName];
          });
        });
      }
    }
  });
  data.endpoints = sortBy(data.endpoints, "path");
  if (groupStrategy.includes("file")) {
    var dependenciesCount = /* @__PURE__ */ new Map();
    dependenciesByGroupName.forEach(function(deps) {
      deps.forEach(function(dep) {
        var _dependenciesCount$ge;
        dependenciesCount.set(dep, ((_dependenciesCount$ge = dependenciesCount.get(dep)) !== null && _dependenciesCount$ge !== void 0 ? _dependenciesCount$ge : -1) + 1);
      });
    });
    var commonSchemaNames = /* @__PURE__ */ new Set();
    Object.keys(data.endpointsGroups).forEach(function(groupName) {
      var group = data.endpointsGroups[groupName];
      group.imports = {};
      var groupSchemas = {};
      var groupTypes = {};
      Object.entries(group.schemas).forEach(function(_ref3) {
        var _dependenciesCount$ge2;
        var _ref4 = _slicedToArray(_ref3, 2), name2 = _ref4[0], schema = _ref4[1];
        var count = (_dependenciesCount$ge2 = dependenciesCount.get(name2)) !== null && _dependenciesCount$ge2 !== void 0 ? _dependenciesCount$ge2 : 0;
        if (count > 1) {
          group.imports[name2] = "common";
          commonSchemaNames.add(name2);
        } else {
          groupSchemas[name2] = schema;
          if (group.types[name2]) {
            groupTypes[name2] = group.types[name2];
          }
        }
      });
      group.schemas = sortObjKeysFromArray(groupSchemas, schemaOrderedByDependencies);
      group.types = groupTypes;
    });
    data.commonSchemaNames = new Set(sortListFromRefArray(Array.from(commonSchemaNames), schemaOrderedByDependencies));
  }
  return data;
};
var makeEndpointTemplateContext = function makeEndpointTemplateContext2() {
  return {
    schemas: {},
    endpoints: [],
    types: {}
  };
};
var makeTemplateContext = function makeTemplateContext2() {
  return _objectSpread2(_objectSpread2({}, makeEndpointTemplateContext()), {}, {
    circularTypeByName: {},
    endpointsGroups: {},
    options: {
      withAlias: false,
      baseUrl: ""
    }
  });
};
var originalPathParam = /:(\w+)/g;
var getOriginalPathWithBrackets = function getOriginalPathWithBrackets2(path2) {
  return path2.replaceAll(originalPathParam, "{$1}");
};
var generateZodClientFromOpenAPI = /* @__PURE__ */ function() {
  var _ref2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(_ref) {
    var _options$groupStrateg, _options$apiClientNam;
    var openApiDoc, distPath, templatePath, prettierConfig, options, disableWriteToFile, handlebars, data, groupStrategy, fs, source, hbs, template, willWriteToFile, _data$commonSchemaNam, outputByGroupName, groupNames, indexSource, indexTemplate, indexOutput, commonSource, commonTemplate, commonSchemaNames, commonOutput, groupName, groupOutput, prettyGroupOutput, output, prettyOutput;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            openApiDoc = _ref.openApiDoc, distPath = _ref.distPath, templatePath = _ref.templatePath, prettierConfig = _ref.prettierConfig, options = _ref.options, disableWriteToFile = _ref.disableWriteToFile, handlebars = _ref.handlebars;
            data = getZodClientTemplateContext(openApiDoc, options);
            groupStrategy = (_options$groupStrateg = options === null || options === void 0 ? void 0 : options.groupStrategy) !== null && _options$groupStrateg !== void 0 ? _options$groupStrateg : "none";
            if (!templatePath) {
              templatePath = match(groupStrategy)["with"]("none", "tag-file", "method-file", function() {
                return path.join(__dirname, "../src/templates/default.hbs");
              })["with"]("tag", "method", function() {
                return path.join(__dirname, "../src/templates/grouped.hbs");
              }).exhaustive();
            }
            _context.next = 6;
            return import("@liuli-util/fs-extra");
          case 6:
            fs = _context.sent;
            _context.next = 9;
            return fs.readFile(templatePath, "utf8");
          case 9:
            source = _context.sent;
            hbs = handlebars !== null && handlebars !== void 0 ? handlebars : getHandlebars();
            template = hbs.compile(source);
            willWriteToFile = !disableWriteToFile && distPath;
            if (!groupStrategy.includes("file")) {
              _context.next = 52;
              break;
            }
            outputByGroupName = {};
            if (!willWriteToFile) {
              _context.next = 18;
              break;
            }
            _context.next = 18;
            return fs.ensureDir(distPath);
          case 18:
            groupNames = Object.fromEntries(Object.keys(data.endpointsGroups).map(function(groupName2) {
              return ["".concat(capitalize(groupName2), "Api"), groupName2];
            }));
            _context.next = 21;
            return fs.readFile(path.join(__dirname, "../src/templates/grouped-index.hbs"), "utf8");
          case 21:
            indexSource = _context.sent;
            indexTemplate = hbs.compile(indexSource);
            indexOutput = maybePretty(indexTemplate({
              groupNames
            }), prettierConfig);
            outputByGroupName["__index"] = indexOutput;
            if (!willWriteToFile) {
              _context.next = 28;
              break;
            }
            _context.next = 28;
            return fs.writeFile(path.join(distPath, "index.ts"), indexOutput);
          case 28:
            _context.next = 30;
            return fs.readFile(path.join(__dirname, "../src/templates/grouped-common.hbs"), "utf8");
          case 30:
            commonSource = _context.sent;
            commonTemplate = hbs.compile(commonSource);
            commonSchemaNames = _toConsumableArray((_data$commonSchemaNam = data.commonSchemaNames) !== null && _data$commonSchemaNam !== void 0 ? _data$commonSchemaNam : []);
            if (!(commonSchemaNames.length > 0)) {
              _context.next = 39;
              break;
            }
            commonOutput = maybePretty(commonTemplate({
              schemas: pick$1(data.schemas, commonSchemaNames),
              types: pick$1(data.types, commonSchemaNames)
            }), prettierConfig);
            outputByGroupName["__common"] = commonOutput;
            if (!willWriteToFile) {
              _context.next = 39;
              break;
            }
            _context.next = 39;
            return fs.writeFile(path.join(distPath, "common.ts"), commonOutput);
          case 39:
            _context.t0 = _regeneratorRuntime().keys(data.endpointsGroups);
          case 40:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 51;
              break;
            }
            groupName = _context.t1.value;
            groupOutput = template(_objectSpread2(_objectSpread2(_objectSpread2({}, data), data.endpointsGroups[groupName]), {}, {
              options: _objectSpread2(_objectSpread2({}, options), {}, {
                groupStrategy: "none",
                apiClientName: "".concat(capitalize(groupName), "Api")
              })
            }));
            prettyGroupOutput = maybePretty(groupOutput, prettierConfig);
            outputByGroupName[groupName] = prettyGroupOutput;
            if (!willWriteToFile) {
              _context.next = 49;
              break;
            }
            console.log("Writing to", path.join(distPath, "".concat(groupName, ".ts")));
            _context.next = 49;
            return fs.writeFile(path.join(distPath, "".concat(groupName, ".ts")), prettyGroupOutput);
          case 49:
            _context.next = 40;
            break;
          case 51:
            return _context.abrupt("return", outputByGroupName);
          case 52:
            output = template(_objectSpread2(_objectSpread2({}, data), {}, {
              options: _objectSpread2(_objectSpread2({}, options), {}, {
                apiClientName: (_options$apiClientNam = options === null || options === void 0 ? void 0 : options.apiClientName) !== null && _options$apiClientNam !== void 0 ? _options$apiClientNam : "api"
              })
            }));
            prettyOutput = maybePretty(output, prettierConfig);
            if (!willWriteToFile) {
              _context.next = 57;
              break;
            }
            _context.next = 57;
            return fs.writeFile(distPath, prettyOutput);
          case 57:
            return _context.abrupt("return", prettyOutput);
          case 58:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function generateZodClientFromOpenAPI2(_x) {
    return _ref2.apply(this, arguments);
  };
}();

// ../../node_modules/openapi-zod-client/dist/openapi-zod-client.esm.js
import "pastable/server";
import "ts-pattern";
import "handlebars";
import "prettier";
import "prettier/parser-typescript";
import "tanu";
import "whence";
export {
  generateZodClientFromOpenAPI,
  getHandlebars
};
