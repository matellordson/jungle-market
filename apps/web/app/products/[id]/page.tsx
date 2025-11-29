import { ProductDetail } from "@repo/ui/products/product-detail";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const url =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL!
      : "http://localhost:8080";
  const res = await fetch(`${url}/products/${id}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    notFound();
  }

  const [data] = await res.json();

  return (
    <ProductDetail
      name={data.name}
      rating={data.rating}
      category={data.category}
      price={data.price}
    />
  );
}
