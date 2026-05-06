import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function DetailPage() {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await res.json();
      setProduct(data.product);
    };

    fetchProduct();
  }, [barcode]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.product_name}</h2>
      <p>Brand: {product.brands}</p>
      <p>Category: {product.categories}</p>

      <button onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}

export default DetailPage;