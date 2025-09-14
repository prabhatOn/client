import Footer from "@/components/common/Footer";
import Navbar from "../common/Navbar";
import QuickLinks from "@/components/common/QuickLinks";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div className="">
        <Navbar />
        <div>
          {children} 
        </div>
      </div>
      <Footer />
      <QuickLinks />
    </>
  );
};

export default MainLayout;
