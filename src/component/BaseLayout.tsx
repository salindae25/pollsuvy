import { ReactNode } from "react";

const BaseLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 lg:flex-row pt-4">
      <div className="min-w-[400px] flex mx-auto justify-center">
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
