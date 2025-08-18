import { Profile } from "@/components/Profile";
import React from "react";

const Page = () => {
  const mockUser = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    password: "string",
    isEmailVerified: true,
    verificationToken: "",
    verificationTokenExpiry: new Date(),
    resetToken: "",
    resetTokenExpiry: new Date(),
    addressId: 1,
  };
  return <Profile user={mockUser} />;
};

export default Page;
