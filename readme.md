### 这是什么

将vue的prop-types转换为Json schema

### 如何使用

```Javascript
const props2Schema = require("./props2schema");


let input = `{
	a: {
		c: {
			type: [Number, String],
			required: true,
			default: 0
		},
		d: String,
		e: {
			type: Number,
			required: true
		}
	},
	b: {
		type: String,
		required: true
	},
	f: {
		type: String,
		required: true,
		default: '1'
	}
}`;


let schema =  props2Schema(input); 

/***
{
	"type": "object",
	"properties": {
		"a": {
			"type": "object",
			"properties": {
				"c": {
					"type": ["number", "string"],
					"default": 0
				},
				"d": {
					"type": "string"
				},
				"e": {
					"type": "number"
				}
			},
			"required": ["c", "e"]
		},
		"b": {
			"type": "string"
		},
		"f": {
			"type": "string",
			"default": "1"
		}
	},
	"required": ["b", "f"]
}
***/

```