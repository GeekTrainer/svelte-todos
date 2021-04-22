<script lang="ts">
    import type { Todo } from "./types";
    export let todo: Todo;
    export let toggleCompleted: (todo: Todo) => void;
</script>

<button
    class="flex shadow-md text-sm focus:outline-none bg-indigo-900 text-white p-1 m-2 rounded-lg hover:bg-indigo-700"
    on:click={() => toggleCompleted(todo)}
    class:line-through={todo.completed}
>
    {todo.text}
</button>
