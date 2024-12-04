import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import FilterAnecdote from "./components/AnecdoteFilter"

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterAnecdote />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App