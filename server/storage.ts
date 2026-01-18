import mongoose from 'mongoose';
import { 
  type User, 
  type Product, 
  type Category, 
  type Order, 
  type InsertUser, 
  type InsertProduct,
  type InsertCategory,
  type InsertOrder
} from '@shared/schema';

// Mongoose Schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: { type: String, required: true },
  lensType: String,
  material: String,
  usage: String,
  color: String,
  brand: String,
  stock: { type: Number, default: 0 },
  images: [String],
  slug: { type: String, required: true },
  isFeatured: { type: Boolean, default: false }
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  slug: { type: String, required: true, unique: true },
  imageUrl: String
});

const orderSchema = new mongoose.Schema({
  userId: String,
  guestEmail: String,
  guestName: String,
  items: [{
    productId: String,
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  deliveryAddress: String,
  trackingNumber: String,
  createdAt: { type: Date, default: Date.now }
});

export const UserModel = mongoose.model('User', userSchema);
export const ProductModel = mongoose.model('Product', productSchema);
export const CategoryModel = mongoose.model('Category', categorySchema);
export const OrderModel = mongoose.model('Order', orderSchema);

export interface IStorage {
  // User
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product
  getProducts(filter?: any): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<void>;
  
  // Category
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Order
  createOrder(order: InsertOrder): Promise<Order>;
  getOrders(userId?: string): Promise<Order[]>;
  updateOrderStatus(id: string, status: string, trackingNumber?: string): Promise<Order | undefined>;
}

export class MongoStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const doc = await UserModel.findById(id);
    return doc ? this.mapDoc(doc) : undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const doc = await UserModel.findOne({ email });
    return doc ? this.mapDoc(doc) : undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const doc = await UserModel.create(user);
    return this.mapDoc(doc);
  }

  async getProducts(filter: any = {}): Promise<Product[]> {
    const query: any = {};
    if (filter.category) query.categoryId = filter.category;
    if (filter.brand) query.brand = filter.brand;
    if (filter.search) {
      query.$or = [
        { name: { $regex: filter.search, $options: 'i' } },
        { description: { $regex: filter.search, $options: 'i' } }
      ];
    }
    const docs = await ProductModel.find(query);
    return docs.map(this.mapDoc);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    if (!mongoose.Types.ObjectId.isValid(id)) return undefined;
    const doc = await ProductModel.findById(id);
    return doc ? this.mapDoc(doc) : undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const doc = await ProductModel.create(product);
    return this.mapDoc(doc);
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    if (!mongoose.Types.ObjectId.isValid(id)) return undefined;
    const doc = await ProductModel.findByIdAndUpdate(id, updates, { new: true });
    return doc ? this.mapDoc(doc) : undefined;
  }

  async deleteProduct(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) return;
    await ProductModel.findByIdAndDelete(id);
  }

  async getCategories(): Promise<Category[]> {
    const docs = await CategoryModel.find();
    return docs.map(this.mapDoc);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const doc = await CategoryModel.create(category);
    return this.mapDoc(doc);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const doc = await OrderModel.create(order);
    return this.mapDoc(doc);
  }

  async getOrders(userId?: string): Promise<Order[]> {
    const query = userId ? { userId } : {};
    const docs = await OrderModel.find(query).sort({ createdAt: -1 });
    return docs.map(this.mapDoc);
  }

  async updateOrderStatus(id: string, status: string, trackingNumber?: string): Promise<Order | undefined> {
    if (!mongoose.Types.ObjectId.isValid(id)) return undefined;
    const updates: any = { status };
    if (trackingNumber) updates.trackingNumber = trackingNumber;
    const doc = await OrderModel.findByIdAndUpdate(id, updates, { new: true });
    return doc ? this.mapDoc(doc) : undefined;
  }

  private mapDoc(doc: any): any {
    const obj = doc.toObject();
    obj._id = obj._id.toString();
    if (obj.createdAt) obj.createdAt = obj.createdAt.toISOString();
    return obj;
  }
}

export const storage = new MongoStorage();
