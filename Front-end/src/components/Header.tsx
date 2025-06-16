
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">CF</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Corte Fino</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Início
            </Link>
            <Link
              to="/agendar"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Agendar
            </Link>
            <Link
              to="/meus-agendamentos"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Meus Agendamentos
            </Link>
            <Link
              to="/admin"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Admin
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link to="/agendar">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Fazer Agendamento
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <span className="sr-only">Abrir menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                >
                  Início
                </Link>
                <Link
                  to="/agendar"
                  className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                >
                  Agendar
                </Link>
                <Link
                  to="/meus-agendamentos"
                  className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                >
                  Meus Agendamentos
                </Link>
                <Link
                  to="/admin"
                  className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                >
                  Admin
                </Link>
                <Link to="/agendar" className="pt-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Fazer Agendamento
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
