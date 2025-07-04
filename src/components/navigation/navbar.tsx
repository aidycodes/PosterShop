import { Menu } from "lucide-react"
import NavSearch from "./buttons/nav-search"
import NavCart from "./buttons/nav-cart"
import NavUser from "./buttons/nav-user"
import NavLinks from "./nav-links"
import ShopName from "./buttons/shop-name"
import type { Category } from "@/components/categorys/categorys"
import type { UserSession } from "@/app/layout"
import { headers } from "next/headers"
import SignOut from "./buttons/sign-out"
import { z } from "zod"
import { CartData } from "./buttons/nav-cart"
import MobileMenu from "./mobileMenu/mobileMenu"


interface NavbarProps {
  categories: Category[];
  session?: UserSession | null; // Make it optional and allow null
}

const userSchema = z.object({
  user: z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string(),
  phone: z.string(),
  city: z.string(),
  country: z.string(),
  postal_code: z.string(),
  address: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  })
})
export type UserDetails = z.infer<typeof userSchema>

const Navbar = async({categories, session}: NavbarProps) => {

  const originalHeaders = await headers();
  const headersList = new Headers(originalHeaders);
const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}api/v1/events/cart`, {
  headers: headersList,
  credentials: 'include'
})
const authRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}api/v1/events/user`, {
  headers: headersList,
  credentials: 'include'
})

const cartData: CartData = await res.json()
const userData: UserDetails = await authRes.json()

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-6 w-6 mr-4 md:hidden">
              <MobileMenu>
              <Menu  />
              </MobileMenu>
              </div>
              <ShopName name="PrintPerfect" direction="forward" />
            </div>    
            <NavLinks categories={categories} />
            <div className="flex items-center space-x-4">
              <NavSearch />
              <NavCart isSignedIn={false} cart={cartData} />
              <NavUser isSignedIn={session ? true : false} userData={userData} session={session}  />
               <SignOut />
            
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar
