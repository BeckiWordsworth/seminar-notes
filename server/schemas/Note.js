"use strict";

module.exports = {
  type: "object",
  properties: {
    content: { type: "string", minLength: 1 },
    userName: { type: "string", minLength: 1 },
    userImage: { type: "string", minLength: 1 },

  },
  required: ["content", "user"],
  additionalProperties: false,
};
