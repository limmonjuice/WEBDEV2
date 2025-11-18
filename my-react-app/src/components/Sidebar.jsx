function Sidebar({ isOpen }) {
  const menuItems = [
    { label: "Home", link: "#home" },
    { label: "Profiles", link: "#profiles" },
    { label: "Products", link: "#products" },
    { label: "About", link: "#about" }
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h3>Menu</h3>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
