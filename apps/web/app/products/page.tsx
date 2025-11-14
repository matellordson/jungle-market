import { ProductCard } from "@repo/ui/product-card";

interface DataType {
  id: string;
  brand?: string;
  image_url?: string;
  brand_image_url: string;
  name?: string;
  category?: string;
  price?: number;
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
        gap: "5px",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
        maxWidth: "200rem",
        margin: "auto",
        padding: "5px",
      }}
    >
      {data.map((product) => (
        <ProductCard
          key={product.id}
          brand={product.brand!}
          image_url={product.image_url!}
          brand_image_url={product.brand_image_url}
          name={product.name!}
          category={product.category!}
          price={product.price!}
        />
      ))}
    </div>
  );
}
