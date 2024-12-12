import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../features/cart/cartSlice";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { showSuccessToast } from "@/utils/toast";
import { Button } from "./Button";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState([]);
  const [sorting, setSorting] = useState([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(cart.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRemoveSelected = () => {
    selectedItems.forEach((id) => dispatch(removeFromCart(id)));
    setSelectedItems([]);
    showSuccessToast("Selected product(s) removed from cart!");
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={selectedItems.length === cart.length}
          onCheckedChange={handleSelectAll}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedItems.includes(row.original.id)}
          onCheckedChange={() => handleSelectItem(row.original.id)}
        />
      ),
    },
    {
      accessorKey: "product",
      header: "Products",
      cell: ({ row }) => (
        <div className="flex items-center">
          <div className="mr-2">
            <img
              className="w-12 h-12 object-contain"
              src={row.original.image}
              alt={row.original.title}
            />
          </div>
          <span>{row.original.title}</span>
        </div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => dispatch(decrementQuantity(row.original.id))}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="mx-2">{row.original.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => dispatch(incrementQuantity(row.original.id))}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="text-right">
          ${(row.original.price * row.original.quantity).toFixed(2)}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: cart,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="max-w-6xl mx-auto bg-zinc-50 shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-black text-white">
        <h2 className="text-3xl text-center font-bold">Your Cart</h2>
      </div>
      {cart.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-black text-xl">Your cart is empty.</p>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <Checkbox
                checked={selectedItems.length === cart.length}
                onCheckedChange={handleSelectAll}
                id="select-all"
              />
              <label
                htmlFor="select-all"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Select All
              </label>
            </div>
            <Button
              onClick={handleRemoveSelected}
              disabled={selectedItems.length === 0}
              variant="destructive"
            >
              <TrashIcon className="h-5 w-5" />
              Remove Selected
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="py-3 px-6 cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === "asc" && " ↑"}
                      {header.column.getIsSorted() === "desc" && " ↓"}
                    </TableHead>
                  ))
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 px-6">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {cart.length > 0 && (
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center text-gray-600">
            <span>Items in cart:</span>
            <span>{cart.length}</span>
          </div>
          <div className="flex justify-between items-center text-gray-600 mt-2">
            <span>Total items:</span>
            <span>{totalCartItems}</span>
          </div>
          <div className="flex justify-between items-center text-xl font-bold text-gray-800 mt-4">
            <span>Total amount:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout">
            <Button
              variant="default"
              className="bg-black text-white w-full mt-6"
              size="lg"
            >
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
