import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

const handleSearch = async () => {
  if (!query.trim()) {
    alert("Enter something");
    return;
  }

  try {
    const res = await fetch(
      `/api/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page_size=20`
    );

    const data = await res.json();

    setFoods(data.products || []);
  } catch (error) {
    console.error(error);
    alert("Search failed");
  }
};
  return (
    <div>
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />

      <button onClick={handleSearch}>Search</button>

      {/* 📊 Count */}
      <p>Total items: {foods.length}</p>

      {/* 🍔 Food List */}
      {foods.map((item) => (
        <div
          key={item.code}
          className="food-card"
          onClick={() =>
            item.code && navigate(`/product/${item.code}`)
          }
        >
          <img
            src={
              item.image_front_thumb_url ||
              "https://via.placeholder.com/100"
            }
            alt={item.product_name}
            width="80"
          />

          <p>{item.product_name || "No Name"}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;