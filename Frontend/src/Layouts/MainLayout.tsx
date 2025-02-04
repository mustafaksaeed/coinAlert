import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header>
        <h1 style={{ paddingLeft: "3rem", paddingTop: "2rem" }}>CoinAlert</h1>
        <nav>
          <ul>
            <li style={{ listStyleType: "none" }}>
              <Link to="/"></Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet /> {/* Form or Dashboard will be rendered based on URL */}
      </main>
    </div>
  );
}
