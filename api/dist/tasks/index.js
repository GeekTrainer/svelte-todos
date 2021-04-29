"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// const { PrismaClientKnownRequestError } = require('@prisma/client')
// const prisma = require('../lib/prisma');
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === 'GET') {
            const tasks = yield prisma.task.findMany();
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: tasks,
                header: {
                    'Content-Type': 'application/json'
                }
            };
        }
        else if (req.method === 'POST' && req.body) {
            const newTask = req.body;
            const savedTask = yield prisma.task.create({
                data: newTask
            });
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: savedTask,
                header: {
                    'Content-Type': 'application/json'
                }
            };
        }
        else if (req.method === 'PUT' && req.body) {
            console.log(req.body);
            const task = req.body;
            const id = task.id;
            const updateTask = Object.assign({}, task);
            delete updateTask.id;
            const savedTask = yield prisma.task.update({
                where: {
                    id: task.id
                },
                data: updateTask
            });
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: savedTask,
                header: {
                    'Content-Type': 'application/json'
                }
            };
        }
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map