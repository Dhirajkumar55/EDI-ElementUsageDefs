import mongoose from "mongoose";

var CodeSchema = new mongoose.Schema({
	Agency : { type : String  },
	Version : { type : String },
	ElementID : { type : String },
	Value : { type : String },
	Description : { type : String },
	Release : { type : String },
	CodePart : { type : String } 
},{
	collection : "Code"
});

const Code = mongoose.model('Code',CodeSchema);

export {Code};