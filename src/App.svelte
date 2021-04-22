<!-- App.svelte -->
<script lang="ts">
    import type { Todo } from "./types";
    import TodoButton from "./Todo.svelte";
    let todos = new Array<Todo>();
    let newTodo: Todo = {
        text: "",
        completed: false,
    };

    todos.push({ text: "Sample 1", completed: true });
    todos.push({ text: "Sample 2", completed: false });

    function addTodo(event: KeyboardEvent) {
        if (event.key === "Enter") {
            todos = [...todos, { ...newTodo }];
            newTodo.text = "";
            (event.target as HTMLElement).focus();
        }
    }

    function toggleCompleted(todo: Todo) {
        todos = [
            ...todos.slice(0, todos.indexOf(todo)),
            { ...todo, completed: !todo.completed },
            ...todos.slice(todos.indexOf(todo) + 1)
        ];
    }
</script>

<article class="container mx-auto px-3">
    <h1 class="text-xl">Todo manager</h1>

    <div class="grid grid-flow-col">
        <div>
            <h2>Active</h2>
            {#each todos.filter(t => !t.completed) as todo}
                <TodoButton todo={todo} toggleCompleted={toggleCompleted} />
            {/each}
        </div>
        <div>
            <h2>Completed</h2>
            {#each todos.filter(t => t.completed) as todo}
                <TodoButton todo={todo} toggleCompleted={toggleCompleted} />
            {/each}
        </div>
    </div>
    <label
        >Add todo:
        <input
            class="border-solid border-black border p-1 text-gray-800"
            type="text"
            placeholder="Add text and press enter"
            on:keypress={addTodo}
            bind:value={newTodo.text}
        />
    </label>
</article>
