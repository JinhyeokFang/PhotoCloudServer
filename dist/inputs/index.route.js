"use strict";var __importDefault=function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var express_1=require("express"),index_controller_1=__importDefault(require("../controllers/index.controller")),router=express_1.Router();router.get("/",index_controller_1.default.index),exports.default=router;