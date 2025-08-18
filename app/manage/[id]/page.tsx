import { ProductDetailView } from "@/components/ProductDetailView";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <ProductDetailView productId={id} />;
};

export default Page;
