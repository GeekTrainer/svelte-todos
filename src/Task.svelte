<script lang="ts">
    import type { Task } from "./types";
    export let task: Task;
    export let toggleCompleted: (task: Task) => void;
</script>

<button
    class="flex shadow-md text-sm focus:outline-none bg-indigo-900 text-white p-1 m-2 rounded-lg hover:bg-indigo-700"
    on:click={() => toggleCompleted(task)}
    class:line-through={task.completed}
>
    {task.text}
</button>
