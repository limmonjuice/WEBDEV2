import "./App.css";
import ProfileList from "./components/ProfileList";
import StepCounter from "./components/StepCounter";
import ProductInfo from "./components/ProductInfo";

function App() {
  return (
    <div className="app-wrapper">
      <h1>☕ Matcharap Charap</h1>

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
    </div>
  );
}

export default App;
