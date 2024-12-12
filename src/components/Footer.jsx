import { FaShopify } from "react-icons/fa";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import { Button } from "./Button";

export default function Footer() {
  return (
    <footer className="  bg-gray-100 pt-16 pb-8 rounded-t-[100px] shadow-inner shadow-zinc-200">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="flex items-center space-x-2">
                <div className="flex items-center gap-x-0">
                  <FaShopify className="w-10 h-10" />
                </div>
                <span className="text-2xl font-bold">Shopie</span>
              </div>
            </Link>
            <div className="text-gray-600 space-y-2">
              <p>Rotonda Giuliani 3 Bianco</p>
              <p>veneto, 62383 Bergamo (VS)</p>
              <p>info@ater.com</p>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu</h3>
            <ul className=" space-y-4 ">
              {routes.map((value, index) => {
                return (
                  <li
                    className="group relative text-sm  tracking-tight"
                    key={index}
                  >
                    <Link to={value.path}>{value.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Operational */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Operational</h3>
            <div className="space-y-2 text-gray-600">
              <p>Every day: 9:00 – 22:00</p>
              <p>Sat – Sun: 8:00 – 21:00</p>
              <div className="mt-6">
                <h4 className="text-black font-semibold mb-2">
                  You need a consult?
                </h4>
                <p>+ (123) 1800-567-8990</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-3xl font-semibold tracking-tighter mb-4">
              Subscribe to our newsletter
            </h3>
            <form className="space-y-4">
              <div className="relative flex items-center flex-wrap gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-gray-500"
                />
                <Button
                  type="submit"
                  size="sm"
                  className=" absolute right-1 !bg-black text-white"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-gray-500 tracking-tight">
                Subscribe to our newsletter to be the first to know about news
                and offers
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500">
            Copyright © SNEAHSHIS. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
