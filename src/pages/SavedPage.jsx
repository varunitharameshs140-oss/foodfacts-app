import { useSelector } from "react-redux";

function SavedPage() {
  const savedItems = useSelector((state) => state.saved.items);

  return (
    <div>
      <h2>Saved Items</h2>

      {savedItems.length === 0 ? (
        <p>No saved items yet</p>
      ) : (
        savedItems.map((item) => (
          <div
            key={item.code}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
              borderRadius: "10px",
              background: "white",
            }}
          >
            <img
              src={
                item.image_front_thumb_url ||
                "https://via.placeholder.com/100"
              }
              alt={item.product_name}
              width="100"
            />

            <p>{item.product_name}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default SavedPage;