import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface ProductEntity {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
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

interface ProductFormProps {
  product?: ProductEntity;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const API_BASE_URL = 'http://localhost:3000';

export function ProductForm({ product, onSuccess, onError }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!product;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProductDto>({
    defaultValues: product ? {
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
    } : undefined,
  });

  const validateForm = (data: CreateProductDto): string | null => {
    if (!data.name || data.name.trim().length === 0) {
      return 'El nombre es obligatorio';
    }
    if (data.name.length > 100) {
      return 'El nombre no puede exceder 100 caracteres';
    }
    if (data.price === undefined || data.price === null) {
      return 'El precio es obligatorio';
    }
    if (data.price < 0) {
      return 'El precio no puede ser negativo';
    }
    if (data.stock === undefined || data.stock === null) {
      return 'El stock es obligatorio';
    }
    if (data.stock < 0) {
      return 'El stock no puede ser negativo';
    }
    if (!data.category || data.category.trim().length === 0) {
      return 'La categoría es obligatoria';
    }
    return null;
  };

  const onSubmit: SubmitHandler<CreateProductDto> = async (data) => {
    const validationError = validateForm(data);
    if (validationError) {
      onError?.(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditMode && product) {
        await axios.put<UpdateProductDto, { data: ProductEntity }>(
          `${API_BASE_URL}/products/${product.id}`,
          data
        );
      } else {
        await axios.post<CreateProductDto, { data: ProductEntity }>(
          `${API_BASE_URL}/products`,
          data
        );
      }
      reset();
      onSuccess?.();
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Error al guardar el producto'
        : 'Error al guardar el producto';
      onError?.(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditMode ? 'Editar Producto' : 'Crear Producto'}
      </h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          {...register('name', {
            required: 'El nombre es obligatorio',
            maxLength: { value: 100, message: 'Máximo 100 caracteres' },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
          Precio
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register('price', {
            required: 'El precio es obligatorio',
            min: { value: 0, message: 'El precio no puede ser negativo' },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
          Stock
        </label>
        <input
          id="stock"
          type="number"
          {...register('stock', {
            required: 'El stock es obligatorio',
            min: { value: 0, message: 'El stock no puede ser negativo' },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.stock && (
          <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Categoría
        </label>
        <input
          id="category"
          type="text"
          {...register('category', {
            required: 'La categoría es obligatoria',
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}