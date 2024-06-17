'use client';

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Collapse, IconButton, Navbar, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavList({ onNavigated }: { onNavigated: () => void }) {
  const pathName = usePathname()

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={ `py-1 font-bold ${pathName === '/' ? 'text-blue-500' : ''}` }
      >
        <Link href="/" onClick={onNavigated} className="flex items-center hover:text-blue-500 transition-colors">
          Mon frigo
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={ `py-1 font-bold ${pathName.startsWith('/ingredients') ? 'text-blue-500' : ''}` }
      >
        <Link href="/ingredients" onClick={onNavigated}  className="flex items-center hover:text-blue-500 transition-colors">
          Ingrédients
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={ `py-1 font-bold ${pathName.startsWith('/recipes') ? 'text-blue-500' : ''}` }
      >
        <Link href="/recipes" onClick={onNavigated}  className="flex items-center hover:text-blue-500 transition-colors">
          Recettes
        </Link>
      </Typography>
    </ul>
  );
}

export default function IngreedyNav() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false);
 
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => { window.removeEventListener("resize", handleWindowResize); };
  }, []);

  return (
    <Navbar className="mx-auto !max-w-full px-6 py-3 rounded-none">
      <div className="max-w-full flex justify-center">
        <div className="max-w-[768px] w-[768px] flex items-center justify-between text-blue-gray-900">
          <Typography as="a" href="#" variant="h6" className="mr-4 cursor-pointer py-1.5">
            Ingreedy
          </Typography>
          <div className="grow"></div>
          <div className="hidden lg:block">
          <NavList onNavigated={() => { setOpenNav(false) }} />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6  hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
      </div>

      <Collapse open={openNav}>
        <div className="max-w-full flex justify-center">
          <div className="max-w-[768px] w-[768px] flex items-center justify-between text-blue-gray-900">
            <NavList onNavigated={() => { setOpenNav(false) }} />
          </div>
        </div>
      </Collapse>
    </Navbar>
  )
}