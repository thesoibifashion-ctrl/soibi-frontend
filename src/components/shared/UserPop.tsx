import { useGetAuth } from "@/api/features/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { isAuthenticated } from "@/lib/auth-finder";
import { CircleUser, LogIn, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import LoginModal from "./modals/LoginModal";

interface isScrolled {
  scrolled: boolean;
}

const UserPop = ({ scrolled }: isScrolled) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  const { data, isLoading } = useGetAuth();

  //   const handleLogin = async () => {
  //     authenticated
  //       ? (window.location.href = window.location.pathname)
  //       : setOpenCheckoutModal(true);
  //   };
  return (
    <>
      <Popover>
        <PopoverTrigger className="cursor-pointer">
          <CircleUser size={20} color={scrolled ? "black" : "white"} />
        </PopoverTrigger>

        <PopoverContent
          align="end"
          sideOffset={12}
          className="w-[280px] rounded-2xl border border-black/10 bg-white p-0 shadow-xl"
        >
          {authenticated ? (
            <div>
              {/* User */}
              <div className="border-b px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                    <User size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-black">
                      {isLoading ? "Loading..." : data?.fullName}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {data?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-2">
                <button
                  onClick={() => (window.location.href = "/checkout")}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-100"
                >
                  <ShoppingBag size={18} />
                  Checkout
                </button>

                <button 
                  onClick={() => (window.location.href = "/history")}
                
                className="flex w-full items-center gap-3 rounded-xl px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-100">
                  <User size={18} />
               History
                </button>

                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-1.5 text-sm text-red-500 transition hover:bg-red-50">
                  <LogIn size={18} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5">
              <div className="mb-5">
                <h3 className="text-base font-semibold text-black">
                  Welcome back
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Sign in to access your account and continue shopping.
                </p>
              </div>

              <button
                onClick={() => setOpenCheckoutModal(true)}
                className="w-full rounded-full bg-black py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Login
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>

      <LoginModal
        open={openCheckoutModal}
        onOpenChange={setOpenCheckoutModal}
      />
    </>
  );
};

export default UserPop;
