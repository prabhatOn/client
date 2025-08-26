import { ReactNode } from "react";
import Footer from "@/components/common/Footer";
import Navbar from "../common/Navbar";
import QuickLinks from "@/components/common/QuickLinks";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div className="">
        <Navbar />
        <div className="">
          {children} 
        </div>
      </div>
      <Footer />
      <QuickLinks />
    </>
  );
};

export default MainLayout;
