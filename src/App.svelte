<!-- App.svelte -->
<script lang="ts">
    interface Todo {
        text: string;
        completed: boolean;
    }
    let todos = new Array<Todo>();
    let newTodo: Todo = {
        text: '',
        completed: false
    };

    function addTodo(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            todos = [...todos, {...newTodo}];
            newTodo.text = '';
            (event.target as HTMLElement).focus();
        }
    }
</script>

<div class="App container">
    <h1>Todo manager</h1>
    <h2>Active todos</h2>
    <ul class="list-group">
        {#each todos as todo, index }
            <button
                class="list-group-item"
                on:click={() => todo.completed = !todo.completed}
                value={index}
                class:completed={todo.completed}
            >
                    { todo.text }
            </button>
        {/each}
    </ul>
    <div>Add new todo</div>
    <input type="text"
        class="form-control"
        placeholder="Add text for todo and press enter"
        on:keypress={addTodo}
        bind:value={newTodo.text}
    />
</div>

<style>
    .completed {
        text-decoration: line-through;
    }
</style>
