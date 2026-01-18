import { z } from 'zod';
import { 
  insertUserSchema, 
  insertProductSchema, 
  insertCategorySchema, 
  insertOrderSchema, 
  loginSchema,
  type User,
  type Product,
  type Category,
  type Order
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  })
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/auth/login',
      input: loginSchema,
      responses: {
        200: z.custom<User>(),
        401: errorSchemas.unauthorized,
      },
    },
    register: {
      method: 'POST' as const,
      path: '/api/auth/register',
      input: insertUserSchema,
      responses: {
        201: z.custom<User>(),
        400: errorSchemas.validation,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/auth/logout',
      responses: {
        200: z.object({ message: z.string() }),
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/auth/me',
      responses: {
        200: z.custom<User | null>(),
      },
    }
  },
  products: {
    list: {
      method: 'GET' as const,
      path: '/api/products',
      input: z.object({
        category: z.string().optional(),
        search: z.string().optional(),
        brand: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<Product>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/products/:id',
      responses: {
        200: z.custom<Product>(),
        404: errorSchemas.notFound,
      },
    },
    create: { // Admin only
      method: 'POST' as const,
      path: '/api/products',
      input: insertProductSchema,
      responses: {
        201: z.custom<Product>(),
        401: errorSchemas.unauthorized,
      },
    },
    update: { // Admin only
      method: 'PUT' as const,
      path: '/api/products/:id',
      input: insertProductSchema.partial(),
      responses: {
        200: z.custom<Product>(),
        404: errorSchemas.notFound,
      },
    },
    delete: { // Admin only
      method: 'DELETE' as const,
      path: '/api/products/:id',
      responses: {
        204: z.void(),
        401: errorSchemas.unauthorized,
      },
    }
  },
  categories: {
    list: {
      method: 'GET' as const,
      path: '/api/categories',
      responses: {
        200: z.array(z.custom<Category>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/categories',
      input: insertCategorySchema,
      responses: {
        201: z.custom<Category>(),
      },
    }
  },
  orders: {
    create: {
      method: 'POST' as const,
      path: '/api/orders',
      input: insertOrderSchema,
      responses: {
        201: z.custom<Order>(),
      },
    },
    list: { // User (own) or Admin (all)
      method: 'GET' as const,
      path: '/api/orders',
      responses: {
        200: z.array(z.custom<Order>()),
      },
    },
    updateStatus: { // Admin only
      method: 'PATCH' as const,
      path: '/api/orders/:id/status',
      input: z.object({ status: z.string(), trackingNumber: z.string().optional() }),
      responses: {
        200: z.custom<Order>(),
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
