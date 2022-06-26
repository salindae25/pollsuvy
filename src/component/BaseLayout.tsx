import Link from "next/link";
import { ReactNode } from "react";
import { useAuth } from "./AuthContext";

const BaseLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 lg:flex-row pt-4">
      {isLoggedIn && (
        <Link href="/">
          <a className="flex gap-2 items-center btn-sm w-56 ">
            <i className="ri-arrow-left-s-line"></i>
            <span>Go to dashboard</span>
          </a>
        </Link>
      )}
      <div className="min-w-[400px] flex mx-auto justify-center">
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
