"use strict";

module.exports = {
  type: 'object',
  properties: {
    userId: { type: "string", minLength: 1, required: true },
    content: { type: "string", minLength: 1, required: true },
  }
}