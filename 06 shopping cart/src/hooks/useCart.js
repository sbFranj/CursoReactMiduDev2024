import { useContext } from "react";
import { CartContext } from "../context/cart";

export function useCart(){
  const constext = useContext(CartContext)

  if(constext === undefined){
    throw new Error("useCart must be used within a CartProvider")
  }

  return constext
}