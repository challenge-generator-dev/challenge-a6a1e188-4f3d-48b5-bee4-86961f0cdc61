import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductForm } from '../components/ProductForm';

interface ProductEntity {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default function ProductList() {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<ProductEntity | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<ProductEntity[]>(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      const message = axios.isAxiosError(err) 
        ? err.response?.data?.message || 'Error al cargar productos'
        : 'Error desconocido al cargar productos';
      setError(message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (data: CreateProductDto): Promise<void> => {
    try {
      setError(null);
      const response = await axios.post<ProductEntity>(`${API_BASE_URL}/products`, data);
      setProducts(prev => [...prev, response.data]);
      setShowForm(false);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Error al crear producto'
        : 'Error desconocido al crear producto';
      setError(message);
      throw err;
    }
  };

  const handleUpdate = async (id: string, data: UpdateProductDto): Promise<void> => {
    try {
      setError(null);
      const response = await axios.put<ProductEntity>(`${API_BASE_URL}/products/${id}`, data);
      setProducts(prev => prev.map(p => p.id === id ? response.data : p));
      setEditingProduct(null);
      setShowForm(false);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Error al actualizar producto'
        : 'Error desconocido al actualizar producto';
      setError(message);
      throw err;
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      setError(null);
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Error al eliminar producto'
        : 'Error desconocido al eliminar producto';
      setError(message);
      console.error('Error deleting product:', err);
    }
  };

  const handleEdit = (product: ProductEntity): void => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancelForm = (): void => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSubmitForm = async (data: CreateProductDto | UpdateProductDto): Promise<void> => {
    if (editingProduct) {
      await handleUpdate(editingProduct.id, data as UpdateProductDto);
    } else {
      await handleCreate(data as CreateProductDto);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Inventario</h1>
        <p className="text-gray-600">Administra los productos de tu tienda en línea</p>
      </header>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Nuevo Producto
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Editar Producto' : 'Crear Producto'}
          </h2>
          <ProductForm
            initialData={editingProduct || undefined}
            onSubmit={handleSubmitForm}
            onCancel={handleCancelForm}
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No hay productos registrados. ¡Crea el primero!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${product.stock < 10 ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                      {product.stock} unidades
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                    >
                      Editar
                    </button>
                    {deleteConfirm === product.id ? (
                      <span className="inline-flex items-center">
                        <span className="text-red-600 mr-2">¿Confirmar?</span>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800 mr-2 font-semibold"
                        >
                          Sí
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          No
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Total de productos: {products.length}
      </div>
    </div>
  );
}