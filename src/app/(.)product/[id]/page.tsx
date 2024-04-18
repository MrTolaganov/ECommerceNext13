"use client";
import CustomImage from "@/components/image";
import { ProductType } from "@/interfaces";
import { Dialog } from "@headlessui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import ReactStars from "react-stars";
import { toast } from "react-toastify";

export default function ProductDetailedPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductType>();
  const { id } = useParams();
  const router = useRouter();

  const handleClick = () => {
    const products: ProductType[] =
      JSON.parse(localStorage.getItem("carts") as string) || [];
    console.log(products);

    const isExistProduct = products.find(item => item.id === product?.id);
    if (isExistProduct) {
      const updatedData = products.map(item => {
        if (item.id === product?.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem("carts", JSON.stringify(updatedData));
    } else {
      const updatedProducts = [...products, { ...product, quantity: 1 }];
      localStorage.setItem("carts", JSON.stringify(updatedProducts));
    }
    toast("Product added successfully");
  };

  useEffect(() => {
    async function getProduct() {
      setIsLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();
      setProduct(product);
      setIsLoading(false);
    }
    getProduct();
  }, [id]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className={"relative z-50"}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden={"true"} />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className={"mx-auto max-w-3xl rounded bg-white p-10"}>
            {isLoading ? (
              <div className="w-8 h-8 rounded-full border-2 border-dotted border-blue-600 animate-spin" />
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full hidden md:inline">
                    <CustomImage product={product} fill />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <h4 className="font-semibold">{product?.title}</h4>
                    <p className="font-medium text-sm">${product?.price}</p>
                    <div className="flex items-center text-sm my-4">
                      <p>{product?.rating.rate}</p>
                      {product?.rating.rate && (
                        <div className="flex items-center ml-2 mr-6">
                          {/* {Array.from(
                            { length: Math.round(product.rating.rate) },
                            (_, idx) => (
                              <StarIcon
                                key={idx}
                                className="w-4 h-4 text-yellow-400"
                              />
                            )
                          )}
                          {Array.from(
                            { length: 5 - Math.round(product.rating.rate) },
                            (_, idx) => (
                              <StarIconOutline
                                key={idx}
                                className="w-4 h-4 text-yellow-400"
                              />
                            )
                          )} */}
                          <ReactStars
                            value={product.rating.rate}
                            edit={false}
                          />
                        </div>
                      )}
                      <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                        See all {product?.rating.count} reviews
                      </p>
                    </div>
                    <p className="line-clamp-5 text-sm">
                      {product?.description}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <button
                      className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black"
                      onClick={handleClick}
                    >
                      Add to bag
                    </button>
                    <button
                      className="button w-full bg-transparent border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent"
                      onClick={() => window.location.reload()}
                    >
                      View full details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
