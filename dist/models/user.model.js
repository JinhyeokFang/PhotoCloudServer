"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault"),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));Object.defineProperty(exports,"__esModule",{value:!0});var mongoose_1=require("mongoose"),crypto_1=require("../utils/crypto"),User=function(){function e(){(0,_classCallCheck2.default)(this,e),this.userSchema=new mongoose_1.Schema({username:String,password:String,photos:Array}),this.userModelInstance=mongoose_1.model("user",this.userSchema)}return(0,_createClass2.default)(e,[{key:"login",value:function(r,t){var o=this;return new Promise(function(n,e){o.userModelInstance.findOne({username:crypto_1.encrypt(r),password:crypto_1.encrypt(t)},function(e,r){n(e?{err:e}:null==r?{err:"the user not found"}:{})})})}},{key:"register",value:function(t,o){var s=this;return new Promise(function(n,e){s.userModelInstance.findOne({username:crypto_1.encrypt(t)},function(e,r){e?n({err:e}):null==r?new s.userModelInstance({username:crypto_1.encrypt(t),password:crypto_1.encrypt(o)}).save(function(e){n(e?{err:e}:{})}):n({err:"the user already exist."})})})}},{key:"uploadPhoto",value:function(o,s,u){var a=this;return new Promise(function(t,e){a.userModelInstance.findOne({username:crypto_1.encrypt(o)},function(e,r){if(e)t({err:e});else if(null==r)t({err:"the user not found"});else{var n=r.photos;null==n.find(function(e){return e.date==u})?(n.push({url:s,date:u}),a.userModelInstance.updateOne({username:crypto_1.encrypt(o)},{photos:n},function(e){t(e?{err:e}:{})})):t({err:"the image is already exist"})}})})}},{key:"showPhotos",value:function(r){var t=this;return new Promise(function(n,e){t.userModelInstance.findOne({username:crypto_1.encrypt(r)},function(e,r){n(e?{err:e}:null==r?{err:"the user not found"}:{data:r.photos})})})}},{key:"removeImage",value:function(o,s){var u=this;return new Promise(function(t,e){u.userModelInstance.findOne({username:crypto_1.encrypt(o)},function(e,r){if(e)t({err:e});else if(null==r)t({err:"the user not found"});else{var n=r.photos.findIndex(function(e){return e.date==s});-1==n?t({err:"the image not found"}):(r.photos.splice(n,1),u.userModelInstance.updateOne({username:crypto_1.encrypt(o)},{photos:r.photos},function(e){t(e?{err:e}:{})}))}})})}}]),e}();exports.default=new User;