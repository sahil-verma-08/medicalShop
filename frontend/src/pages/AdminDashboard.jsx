import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminProducts from '../components/admin/AdminProducts';
import AdminCategories from '../components/admin/AdminCategories';
import AdminOrders from '../components/admin/AdminOrders';

const AdminDashboard = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-lg shadow-md p-4 h-fit sticky top-20">
          <nav className="space-y-2">
            <Link
              to="/admin"
              className={`block px-4 py-2 rounded transition ${
                isActive('/admin') && !location.pathname.includes('/products') && !location.pathname.includes('/categories') && !location.pathname.includes('/orders')
                  ? 'bg-medical-blue text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Overview
            </Link>
            <Link
              to="/admin/products"
              className={`block px-4 py-2 rounded transition ${
                isActive('/admin/products')
                  ? 'bg-medical-blue text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Products
            </Link>
            <Link
              to="/admin/categories"
              className={`block px-4 py-2 rounded transition ${
                isActive('/admin/categories')
                  ? 'bg-medical-blue text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Categories
            </Link>
            <Link
              to="/admin/orders"
              className={`block px-4 py-2 rounded transition ${
                isActive('/admin/orders')
                  ? 'bg-medical-blue text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Orders
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
                  <p className="text-gray-600">
                    Welcome to the admin dashboard. Use the sidebar to manage products, categories,
                    and orders.
                  </p>
                </div>
              }
            />
            <Route path="/products/*" element={<AdminProducts />} />
            <Route path="/categories" element={<AdminCategories />} />
            <Route path="/orders" element={<AdminOrders />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;







