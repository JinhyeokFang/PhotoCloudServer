"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var mongoose_1=require("mongoose"),userSchema=new mongoose_1.Schema({username:String,password:String,photos:Array});exports.default=mongoose_1.model("user",userSchema);