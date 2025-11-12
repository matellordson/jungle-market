import { ProductCard } from "@repo/ui/product-card";

interface DataType {
  id: string;
  brand?: string;
  image_url?: string;
  name?: string;
  category?: string;
  price?: number;
}

export default async function Products() {
  const res = await fetch("http://localhost:8080/products", {
    cache: "no-cache",
  });
  const data: DataType[] = await res.json();
  return (
    <div>
      {data.map((product) => (
        <ProductCard
          key={product.id}
          brand={product.brand!}
          image_url={product.image_url!}
          name={product.name!}
          category={product.category!}
          price={product.price!}
        />
      ))}
    </div>
  );
}
