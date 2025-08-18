import { ProductDetails } from "@/components/ProductDetails";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <ProductDetails productId={id} />;
};

export default Page;
