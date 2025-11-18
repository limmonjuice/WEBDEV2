function Header({ toggleSidebar }) {
  return (
    <header className="header">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <h1>☕ Matcharap Charap</h1>
    </header>
  );
}

export default Header;