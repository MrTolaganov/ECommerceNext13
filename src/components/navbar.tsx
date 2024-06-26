import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full z-50 shadow bg-white">
      <Link href={"/"}>
        <Image src={"/logo.png"} alt="Logo" width={100} height={40} />
      </Link>
      <div className="flex items-center space-x-2.5 text-sm">
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href={"/"} className="mr-5 text-black hover:text-gray-900">
            Home
          </Link>
          <Link
            href={"/products"}
            className="mr-5 text-black hover:text-gray-900"
          >
            Products
          </Link>
          <Link
						href={'/contacts'}
						className='mr-5 hover:text-gray-900 '
					>
						Contacts
					</Link>
        </nav>
        <Link href={"/shopping-cart"}>
          <button className="button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
            My Bag
          </button>
        </Link>
      </div>
    </header>
  );
}
