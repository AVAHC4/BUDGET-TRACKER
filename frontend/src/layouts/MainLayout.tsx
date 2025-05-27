import Navbar from "../components/Navbar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
