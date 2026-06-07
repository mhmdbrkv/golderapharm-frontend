import ProductsHeader from "@/features/products/components/ProductsHeader";
import ProductsList from "@/features/products/components/ProductsList";
import { getProductsAction } from "@/features/products/api";
import { extractProducts } from "@/features/products/lib/utils";

export const dynamic = "force-dynamic";

export default async function Page() {
  const result = await getProductsAction();

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to fetch products");
  }

  const products = extractProducts(result.data);

  return (
    <main className="bg-secondary-very-light min-h-[calc(100vh-80px)] p-5 *:min-[1440px]:w-270.75! lg:w-5xl">
      <ProductsHeader products={products} />
      <ProductsList products={products} />
    </main>
  );
}
