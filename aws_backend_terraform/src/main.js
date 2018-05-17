'use strict';

exports.handler = function (event, context, callback) {
        var response = {
            statusCode: 200,
            headers: {
                            'Content-Type': 'text/json; charset=utf-8',
                      },
            body: JSON.stringify([{'name' : 'test' }]),
        };
        callback(null, response);
};

