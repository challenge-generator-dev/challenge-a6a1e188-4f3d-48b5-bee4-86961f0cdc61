import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useProductService } from './main';
import ProductList from '@/pages/ProductList';
import { ProductForm } from '@/components/ProductForm';

// Componente raíz con manejo de rutas y estado global
const App: React.FC = () => {
  const productService = useProductService();
  const [products, setProducts] = React.useState<ProductEntity[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  // Cargar productos al montar el componente
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.listProducts();
        setProducts(data);
      } catch (err) {
        setError('Error al cargar productos. Intente nuevamente.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [productService]);

  // Manejo de operaciones CRUD
  const handleCreate = async (product: CreateProductDto): Promise<void> => {
    try {
      const newProduct = await productService.createProduct(product);
      setProducts([...products, newProduct]);
    } catch (err) {
      setError('Error al crear producto. Verifique los datos.');
      console.error('Error creating product:', err);
    }
  };

  const handleUpdate = async (id: string, updates: UpdateProductDto): Promise<void> => {
    try {
      const updatedProduct = await productService.updateProduct(id, updates);
      setProducts(products.map(p => (p.id === id ? updatedProduct : p)));
    } catch (err) {
      setError('Error al actualizar producto.');
      console.error('Error updating product:', err);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await productService.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError('Error al eliminar producto.');
      console.error('Error deleting product:', err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
      <Routes>
        <Route
          path="/"
          element={<ProductList products={products} onDelete={handleDelete} />}
        />
        <Route
          path="/new"
          element={<ProductForm onSubmit={handleCreate} />}
        />
        <Route
          path="/edit/:id"
          element={<ProductForm products={products} onSubmit={handleUpdate} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;