import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertOrder } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "./use-cart";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const clearCart = useCart((state) => state.clearCart);

  return useMutation({
    mutationFn: async (data: InsertOrder) => {
      const res = await fetch(api.orders.create.path, {
        method: api.orders.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to place order");
      return api.orders.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      clearCart();
      queryClient.invalidateQueries({ queryKey: [api.orders.list.path] });
      toast({ title: "Order Placed!", description: "Thank you for your purchase." });
    },
    onError: (err) => {
      toast({ title: "Order Failed", description: err.message, variant: "destructive" });
    }
  });
}

export function useOrders() {
  return useQuery({
    queryKey: [api.orders.list.path],
    queryFn: async () => {
      const res = await fetch(api.orders.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch orders");
      return api.orders.list.responses[200].parse(await res.json());
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status, trackingNumber }: { id: string, status: string, trackingNumber?: string }) => {
      const url = buildUrl(api.orders.updateStatus.path, { id });
      const res = await fetch(url, {
        method: api.orders.updateStatus.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, trackingNumber }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update status");
      return api.orders.updateStatus.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.orders.list.path] });
      toast({ title: "Status Updated", description: "Order status has been changed." });
    },
  });
}
