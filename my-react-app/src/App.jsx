import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ProfileList from "./components/ProfileList";
import StepCounter from "./components/StepCounter";
import ProductInfo from "./components/ProductInfo";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-wrapper">
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      ></div>
      
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="content-wrapper">
        <Header toggleSidebar={toggleSidebar} />

        <div className="grid-container">
          <div className="grid-left">
            <ProfileList />
          </div>

          <div className="grid-right">
            <div className="grid-section">
              <StepCounter />
            </div>

            <div className="grid-section flex-grow">
              <h2>Our Best Sellers</h2>
              <ProductInfo 
                name="Matcha Milk Tea" 
                price={120}
                details="Rich Milk Tea topped with matcha-flavored syrup, steamed milk, and matcha drizzle. A sweet and smooth matcha experience."
              />
              <ProductInfo 
                name="Matcha Latte" 
                price={150}
                details="Premium Japanese matcha powder blended with creamy steamed milk. Earthy, smooth, and full of antioxidants."
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;