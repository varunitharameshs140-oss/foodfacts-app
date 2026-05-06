import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/savedSlice";

function HomePage() {
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Enter something");
      return;
    }

    try {
      const response = await fetch(
        `/api/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page_size=20`
      );

      const data = await response.json();

      setFoods(data.products || []);
    } catch (error) {
      console.error(error);
      alert("Search failed");
    }
  };

  return (
    <div>
      {/* Search */}
      <input
        type="text"
        placeholder="Search food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px",
          marginRight: "10px",
          borderRadius: "8px",
        }}
      />

      <button
        onClick={handleSearch}
        style={{
          padding: "10px 15px",
          borderRadius: "8px",
          border: "none",
          background: "orange",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {/* Count */}
      <p>Total items: {foods.length}</p>

      {/* Food Cards */}
      {foods.map((item) => (
        <div
          key={item.code}
          className="food-card"
          style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "15px",
            margin: "15px",
            background: "white",
          }}
        >
          {/* Clickable area */}
          <div
            onClick={() =>
              item.code && navigate(`/product/${item.code}`)
            }
            style={{ cursor: "pointer" }}
          >
            <img
              src={
                item.image_front_thumb_url ||
                "https://via.placeholder.com/100"
              }
              alt={item.product_name}
              width="100"
            />

            <p>{item.product_name || "No Name"}</p>
          </div>

          {/* Save button */}
          <button
            onClick={() => dispatch(addItem(item))}
            style={{
              padding: "8px 15px",
              background: "orange",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
}

export default HomePage;