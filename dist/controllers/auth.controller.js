"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault"),_regenerator=_interopRequireDefault(require("@babel/runtime/regenerator")),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),_possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn")),_getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf")),_get2=_interopRequireDefault(require("@babel/runtime/helpers/get")),_inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits")),__awaiter=function(e,s,a,l){return new(a=a||Promise)(function(t,r){function n(e){try{u(l.next(e))}catch(e){r(e)}}function o(e){try{u(l.throw(e))}catch(e){r(e)}}function u(e){e.done?t(e.value):function(t){return t instanceof a?t:new a(function(e){e(t)})}(e.value).then(n,o)}u((l=l.apply(e,s||[])).next())})},__importDefault=function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var jwt_1=require("../utils/jwt"),controller_1=__importDefault(require("./controller")),user_model_1=__importDefault(require("../models/user.model")),AuthController=function(e){function t(){return(0,_classCallCheck2.default)(this,t),(0,_possibleConstructorReturn2.default)(this,(0,_getPrototypeOf2.default)(t).apply(this,arguments))}return(0,_inherits2.default)(t,e),(0,_createClass2.default)(t,[{key:"checkToken",value:function(r,n){var e=this,o=Object.create(null,{ResponseSuccess:{get:function(){return(0,_get2.default)((0,_getPrototypeOf2.default)(t.prototype),"ResponseSuccess",e)}},ResponseUnauthorized:{get:function(){return(0,_get2.default)((0,_getPrototypeOf2.default)(t.prototype),"ResponseUnauthorized",e)}}});return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){var t;return _regenerator.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=r.body.token,jwt_1.isVaildToken(t)?o.ResponseSuccess.call(this,n,{}):o.ResponseUnauthorized.call(this,n,{});case 2:case"end":return e.stop()}},e,this)}))}},{key:"login",value:function(u,s){var e=this,a=Object.create(null,{ResponseNotFound:{get:function(){return(0,_get2.default)((0,_getPrototypeOf2.default)(t.prototype),"ResponseNotFound",e)}},ResponseInternalServerError:{get:function(){return(0,_get2.default)((0,_getPrototypeOf2.default)(t.prototype),"ResponseInternalServerError",e)}},ResponseSuccess:{get:function(){return(0,_get2.default)((0,_getPrototypeOf2.default)(t.prototype),"ResponseSuccess",e)}}});return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){var t,r,n,o;return _regenerator.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=u.body,r=t.username,n=t.password,e.next=3,user_model_1.default.login(r,n);case 3:"the user not found"==(o=e.sent).err?a.ResponseNotFound.call(this,s,{}):o.err?a.ResponseInternalServerError.call(this,s,{err:o.err}):a.ResponseSuccess.call(this,s,{token:jwt_1.encodeToken({username:r,time:(new Date).getTime()})});case 5:case"end":return e.stop()}},e,this)}))}},{key:"register",value:function(u,s){var e=this,a=Object.create(null,{ResponseForbidden:{get:function(){return(0,_get2.default)((0,_getPrototypeOf2.default)(t.prototype),"ResponseForbidden",e)}},ResponseInternalServerError:{get:function(){return(0,_get2.default)((0,_getPrototypeOf2.default)(t.prototype),"ResponseInternalServerError",e)}},ResponseSuccess:{get:function(){return(0,_get2.default)((0,_getPrototypeOf2.default)(t.prototype),"ResponseSuccess",e)}}});return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){var t,r,n,o;return _regenerator.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=u.body,r=t.username,n=t.password,e.next=3,user_model_1.default.register(r,n);case 3:"the user already exist."==(o=e.sent).err?a.ResponseForbidden.call(this,s,{err:o.err}):o.err?a.ResponseInternalServerError.call(this,s,{err:o.err}):a.ResponseSuccess.call(this,s,{token:jwt_1.encodeToken({username:r,time:(new Date).getTime()})});case 5:case"end":return e.stop()}},e,this)}))}}]),t}(controller_1.default);exports.default=new AuthController;