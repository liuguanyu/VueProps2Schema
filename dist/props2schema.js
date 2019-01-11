var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var BASE_TYPE = ["string", "number", "boolean", "date", "symbol"];

var toStr = function toStr(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
};

var getType = function getType(value) {
    var str = typeof value === "undefined" ? "undefined" : _typeof(value);

    if (str === 'object') {
        return value === null ? null : toStr(value).toLowerCase();
    }

    return str;
};

var dealWithNode = function dealWithNode(node) {
    var type = getType(node);

    switch (type) {
        case "boolean":
        case "number":
        case "date":
        case "symbol":
        case "string":
            return {
                "type": type
            };
            break;
        case "object":
            if (node.type) {
                return {
                    type: getType(node.type) === "array" ? node.type.map(function (el) {
                        return el.name.toLowerCase();
                    }) : node.type.name.toLowerCase()
                };
            } else {
                return _extends({}, props2schema(node));
            }
            break;
        case "array":
            return node.map(function (el) {
                return el.name.toLowerCase();
            });
            break;
        case "function":
            return {
                type: node.name.toLowerCase()
            };
            break;
    }
};

var props2schema = function props2schema(props) {
    var ret = {};
    var required = [];

    var keys = Object.keys(props);

    keys.forEach(function (el) {
        ret[el] = dealWithNode(props[el]);
        if (props[el] && props[el]["required"] && props[el]["required"] === true) {
            required.push(el);
        }
        if (props[el] && props[el]["default"] !== undefined) {
            ret[el]["default"] = props[el]["default"];
        }
    });

    return {
        "type": "object",
        properties: _extends({}, ret),
        required: required
    };
};

export default props2schema;