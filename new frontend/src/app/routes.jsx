import { createBrowserRouter, Navigate } from "react-router";
import { useAuth } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { Services } from "./pages/Services";
import { ContactUs } from "./pages/ContactUs";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { CustomerDashboard } from "./pages/CustomerDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow page">
        {children}
      </div>
      <Footer />
    </div>
  );
}

function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/shop" replace />;
  }

  return <>{children}</>;
}

function AuthRoute({ children }) {
  const { user, isAdmin } = useAuth();

  if (user) {
    return <Navigate to={isAdmin ? "/admin" : "/shop"} replace />;
  }

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <AuthRoute>
          <Login />
        </AuthRoute>
      </Layout>
    ),
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <AuthRoute>
          <Signup />
        </AuthRoute>
      </Layout>
    ),
  },
  {
    path: "/shop",
    element: (
      <Layout>
        <ProtectedRoute>
          <CustomerDashboard />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/admin",
    element: (
      <Layout>
        <ProtectedRoute requireAdmin={true}>
          <AdminDashboard />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <AboutUs />
      </Layout>
    ),
  },
  {
    path: "/services",
    element: (
      <Layout>
        <Services />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <ContactUs />
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-gray-600 mb-4">Page not found</p>
            <a href="/" className="text-orange-600 hover:text-orange-700">
              Go back home
            </a>
          </div>
        </div>
      </Layout>
    ),
  },
]);
