import Navbar from '@/Components/Layouts/Navbar/Navbar.jsx';
import { ProtectedRoute } from '@/Components/Auth/ProtectedRoute';
import '@/Components/Layouts/MainLayout/MainLayout.css';

export default function MainLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="Main-Layout">
        <Navbar />
        <main className="Content">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
