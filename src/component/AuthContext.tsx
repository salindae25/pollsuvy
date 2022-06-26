import { InferQueryOutput, trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
export const unProtectedRoutes = ["/poll/[id]", "/login"];
const AuthContext = React.createContext<
  InferQueryOutput<"user.auth"> | { user: undefined } | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error } = trpc.useQuery(["user.auth"]);
  const { pathname, route, push } = useRouter();
  if (isLoading) {
    return <div>Authenticating....</div>;
  }
  if (error) {
    return <>{error.message}</>;
  }

  if (!data && unProtectedRoutes.includes(pathname)) {
    return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
  }
  if (!data) {
    push("/login");
  }
  return (
    <AuthContext.Provider value={{ user: data?.user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  if (!context?.user) {
    return {
      user: null,
      isLoggedIn: false,
    };
  }
  const user = context?.user;
  return {
    user,
    isLoggedIn: Boolean(user),
  };
};
