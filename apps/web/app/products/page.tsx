import { ProductCard } from "@repo/ui/product-card";
import Link from "next/link";

interface DataType {
  id: string;
  image_url: string;
  name: string;
  rating: number;
  category: string;
  price: number;
}

export default async function Products() {
  const url =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL!
      : "http://localhost:8080";
  const res = await fetch(`${url}/products`, {
    cache: "no-cache",
  });
  const data: DataType[] = await res.json();
  return (
    <div
      style={{
        display: "grid",
        gap: "1.5rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(18.75em, 1fr))",
        width: "100%",
        maxWidth: "1600px",
        margin: "0 auto",
        padding: "1.5rem 1rem",
      }}
    >
      {data.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          image_url={product.image_url}
          name={product.name}
          rating={product.rating}
          category={product.category}
          price={product.price}
        />
      ))}
    </div>
  );
}
