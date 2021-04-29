import { AzureFunction, Context, HttpRequest } from "@azure/functions"
// const { PrismaClientKnownRequestError } = require('@prisma/client')
// const prisma = require('../lib/prisma');

import { PrismaClient, Task } from '@prisma/client'

const prisma = new PrismaClient()

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if (req.method === 'GET') {
        const tasks = await prisma.task.findMany();

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: tasks,
            header: {
                'Content-Type': 'application/json'
            }
        };
    } else if (req.method === 'POST' && req.body) {
        const newTask = req.body;
        const savedTask = await prisma.task.create({
            data: newTask
        });
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: savedTask,
            header: {
                'Content-Type': 'application/json'
            }
        };
    } else if (req.method === 'PUT' && req.body) {
        console.log(req.body);
        const task = req.body as Task;
        const id = task.id;
        const updateTask: any = {...task};
        delete updateTask.id;
        const savedTask = await prisma.task.update({
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
    
};

export default httpTrigger;