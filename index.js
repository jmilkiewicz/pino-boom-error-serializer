var pino = require("pino");

var boomFriendlyErrorSerializer = function (errorPropertyName, errorSerializer) {
  return function (boomError) {
    var errorObj = errorSerializer(boomError);
    if (boomError.data) {
      errorObj[errorPropertyName] = boomError.data;
    }
    return errorObj;
  }
};

module.exports = boomFriendlyErrorSerializer("errorCause", pino.stdSerializers.err);
module.exports.with = boomFriendlyErrorSerializer;

