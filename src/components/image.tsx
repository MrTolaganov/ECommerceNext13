"use client";
import { ProductType } from "@/interfaces";
import Image from "next/image";
import { useState } from "react";

interface Props {
  product: ProductType;
  fill?: boolean;
}

export default function CustomImage({ product, fill }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {fill ? (
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={`object-contain duration-700 ease-in-out group-hover:opacity-75 
      ${
        isLoading
          ? "scale-110 blur-xl grayscale"
          : "scale-100 blur-0 grayscale-0"
      }
      `}
          onLoadingComplete={() => setIsLoading(false)}
        />
      ) : (
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={100}
          className={`object-contain duration-700 ease-in-out group-hover:opacity-75 
    ${
      isLoading ? "scale-110 blur-xl grayscale" : "scale-100 blur-0 grayscale-0"
    }
    `}
          onLoadingComplete={() => setIsLoading(false)}
        />
      )}
    </>
  );
}
