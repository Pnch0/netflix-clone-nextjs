import Navbar from '@/Components/Layouts/Navbar/Navbar.jsx';
import '@/Components/Layouts/MainLayout/MainLayout.css';

export default function MainLayout({ children }) {
  return (
    <div className="Main-Layout">
      <Navbar />
      <main className="Content">
        {children}
      </main>
    </div>
  );
}

