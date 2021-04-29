<!-- App.svelte -->
<script lang="ts">
    import type { Task } from "./types";
    import TaskButton from "./Task.svelte";
    let tasks = new Array<Task>();
    let newTask: Task = {
        text: "",
        completed: false,
    };

    async function loadTasks() {
        const result = await fetch('/api/tasks');
        tasks = await result.json();
    }

    loadTasks();

    async function addTask(event: KeyboardEvent) {
        if (event.key === "Enter") {
            const result = await fetch(
                '/api/tasks',
                {
                    method: 'POST',
                    body: JSON.stringify(newTask),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
            )
            const serverTask = await result.json();

            tasks = [...tasks, serverTask];
            newTask.text = "";
            (event.target as HTMLElement).focus();
        }
    }

    async function toggleCompleted(task: Task) {
        const result = await fetch(
            'api/tasks',
            {
                method: 'PUT',
                body: JSON.stringify({
                    ...task,
                    completed: !task.completed
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const updatedTask = await result.json() as Task;

        tasks = [
            ...tasks.slice(0, tasks.indexOf(task)),
            updatedTask,
            ...tasks.slice(tasks.indexOf(task) + 1)
        ];
    }
</script>

<article class="container mx-auto px-3">
    <h1 class="text-xl">Task manager</h1>

    <div class="grid grid-flow-col">
        <div>
            <h2>Active</h2>
            {#each tasks.filter(t => !t.completed) as task}
                <TaskButton task={task} toggleCompleted={toggleCompleted} />
            {/each}
        </div>
        <div>
            <h2>Completed</h2>
            {#each tasks.filter(t => t.completed) as task}
                <TaskButton task={task} toggleCompleted={toggleCompleted} />
            {/each}
        </div>
    </div>
    <label>Add todo:
        <input
            class="border-solid border-black border p-1 text-gray-800"
            type="text"
            placeholder="Add text and press enter"
            on:keypress={addTask}
            bind:value={newTask.text}
        />
    </label>
</article>
