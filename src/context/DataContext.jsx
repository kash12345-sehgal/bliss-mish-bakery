import { createContext, useContext, useState, useEffect } from 'react';
import {
  loadStoredProducts,
  saveStoredProducts,
  loadStoredFeatured,
  saveStoredFeatured,
  INITIAL_PRODUCTS,
  INITIAL_FEATURED,
} from '../data/initialData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [products, setProducts] = useState(() => loadStoredProducts());
  const [featured, setFeatured] = useState(() => loadStoredFeatured());

  useEffect(() => {
    saveStoredProducts(products);
  }, [products]);

  useEffect(() => {
    saveStoredFeatured(featured);
  }, [featured]);

  // Product actions
  const addProduct = (item) => {
    const newProduct = {
      id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: item.title?.trim() || 'Delicious Cake',
      image: item.image || '/hero-premium.png',
      price: item.price?.trim() || 'Freshly Baked',
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // Featured actions
  const addFeatured = (item) => {
    const newFeatured = {
      id: `feat-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      src: item.src || item.image || '/hero-premium.png',
      alt: item.alt?.trim() || item.title?.trim() || 'Featured Treat',
      isTall: Boolean(item.isTall),
      delay: item.delay || '0',
      fallbackText: item.fallbackText || 'treat.jpg',
      createdAt: new Date().toISOString(),
    };
    setFeatured((prev) => [newFeatured, ...prev]);
    return newFeatured;
  };

  const updateFeatured = (id, updatedFields) => {
    setFeatured((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteFeatured = (id) => {
    setFeatured((prev) => prev.filter((item) => item.id !== id));
  };

  // Reset to default factory initial data
  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setFeatured(INITIAL_FEATURED);
    saveStoredProducts(INITIAL_PRODUCTS);
    saveStoredFeatured(INITIAL_FEATURED);
  };

  // Export JSON backup
  const exportData = () => {
    const data = {
      products,
      featured,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bliss-mish-catalog-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const importData = (jsonData) => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (Array.isArray(data.products)) {
        setProducts(data.products);
      }
      if (Array.isArray(data.featured)) {
        setFeatured(data.featured);
      }
      return { success: true };
    } catch (err) {
      console.error('Import failed:', err);
      return { success: false, error: err.message };
    }
  };

  return (
    <DataContext.Provider
      value={{
        products,
        featured,
        addProduct,
        updateProduct,
        deleteProduct,
        addFeatured,
        updateFeatured,
        deleteFeatured,
        resetToDefaults,
        exportData,
        importData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useBakeryData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useBakeryData must be used within a DataProvider');
  }
  return context;
}
