import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartCard = ({
  image,
  checked,
  title,
  variant,
  originalPrice,
  price,
  discount,
}: {
  image: string;
  checked: boolean;
  title: string;
  variant: string;
  originalPrice: number;
  price: number;
  discount: number;
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-start gap-3">
        <RadioGroup className="my-auto" defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              checked={checked}
              value="option-one"
              id="option-one"
            />
          </div>
        </RadioGroup>
        <div className="relative w-28 h-28">
          <Image
            src={image}
            alt={title}
            fill
            className="w-full h-full rounded-md"
          />
        </div>
        <div className="flex flex-col max-w-[700px]">
          <div>
            <p className="text-base line-clamp-1">{title}</p>
            <p className="text-sm text-muted-foreground">Variant: {variant}</p>
          </div>
          <div className="flex mt-12 items-center gap-2 text-sm">
            <p className="text-black font-semibold">₱{price}</p>
            <p className="text-muted-foreground line-through">
              ₱{originalPrice}
            </p>
            <div className="border border-orange-600 px-1.5 py-0.5 rounded-md text-orange-600 text-xs">
              -{discount}%
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <Button size="sm" variant="ghost">
          <Trash2 className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold text-muted-foreground">Qty</p>
          <div className="border flex justify-center items-center gap-3 py-2 w-24">
            <Minus className="w-4 h-4" />
            <input
              type="text"
              className="w-5 text-sm text-center bg-white border-0 outline-none"
              placeholder='1'
            />
            <Plus className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
