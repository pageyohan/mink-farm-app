// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Menu, Home, User } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <header className="bg-stone-800 text-stone-100 border-b border-stone-700">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl flex items-center">
            <span>Élevage M. Jones</span>
          </Link>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-stone-800 px-4 py-2 text-sm font-medium transition-colors hover:bg-stone-700 hover:text-stone-50 focus:bg-stone-700 focus:text-stone-50 focus:outline-none">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Accueil</span>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/animaux" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-stone-800 px-4 py-2 text-sm font-medium transition-colors hover:bg-stone-700 hover:text-stone-50 focus:bg-stone-700 focus:text-stone-50 focus:outline-none">
                  <Building className="mr-2 h-4 w-4" />
                  <span>Nos animaux</span>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/admin/login" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-stone-800 px-4 py-2 text-sm font-medium transition-colors hover:bg-stone-700 hover:text-stone-50 focus:bg-stone-700 focus:text-stone-50 focus:outline-none">
                  <User className="mr-2 h-4 w-4" />
                  <span>Administration</span>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9 border-stone-700">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-stone-800 border-stone-700">
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Accueil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/animaux" className="flex items-center cursor-pointer">
                    <Building className="mr-2 h-4 w-4" />
                    <span>Nos animaux</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/login" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Administration</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;