import { useState } from 'react'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'

function App() {
  const [hasSearched, setHasSearched] = useState(false)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query) => {
    setLoading(true)
    setHasSearched(true)

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=10`

      const res = await fetch(url)
      const data = await res.json()

      const filtered = data.products.filter(
        (p) => p.product_name && p.product_name.trim() !== ''
      )

      setResults(filtered)

    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>🥗 FoodFacts</h1>

      <SearchBar onSearch={handleSearch} />
      

      {loading && <p>Loading...</p>}

      {!loading && !hasSearched && (
        <p>Search for a food to see nutrition info</p>
      )}

      {!loading && hasSearched && results.length === 0 && (
        <p>No results found</p>
      )}

      <FoodList products={results} />
    </div>
  )
}

export default App