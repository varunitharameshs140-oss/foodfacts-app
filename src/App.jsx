import { useState } from 'react'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query) => {
  setLoading(true)
  setHasSearched(true)

  // ✅ clear old results immediately
  setResults([])

  try {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=10`

    const res = await fetch(url)
    const data = await res.json()

    const filtered = data.products.filter(
      (p) => p.product_name && p.nutriments
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

      {!loading && results.length > 0 && (
        <FoodList products={results} />
      )}
    </div>
  )
}

export default App