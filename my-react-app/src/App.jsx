import "./App.css";
import ProfileList from "./components/ProfileList";
import StepCounter from "./components/StepCounter";
import ProductInfo from "./components/ProductInfo";

function App() {
  return (
    <div className="app-container">
      <h1>Matcharap Charap</h1>

      <ProfileList />

      <StepCounter />

      <h2>Our Best Sellers</h2>
      <ProductInfo 
        name="Matcha Milk Tea"
        price={120}
        details="A refreshing and creamy drink with pearls."
        className="product-card"
      />

      <ProductInfo 
        name="Matcha Latte"
        price={150}
        details="Rich matcha with steamed milk and foam."
        className="product-card"
      />
    </div>
  );
}

export default App;
