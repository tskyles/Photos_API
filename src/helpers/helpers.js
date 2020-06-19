'use strict';

module.exports = {
  omit: omit,
}

function omit(key, obj){
  const { [key]: omitted, ...rest } = obj;
  return rest;
}

