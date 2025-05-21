
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto py-4 px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-poppins font-bold text-barber-dark">
              Corte<span className="text-barber-blue">Fino</span>
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-barber-dark focus:outline-none"
            aria-label={isMenuOpen ? "Fechar Menu" : "Abrir Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                isActive 
                  ? "font-medium text-barber-blue" 
                  : "font-medium text-barber-dark hover:text-barber-blue transition-colors"
              }
            >
              Início
            </NavLink>
            <NavLink 
              to="/agendar"
              className={({ isActive }) => 
                isActive 
                  ? "font-medium text-barber-blue" 
                  : "font-medium text-barber-dark hover:text-barber-blue transition-colors"
              }
            >
              Agendar
            </NavLink>
            <NavLink 
              to="/meus-agendamentos"
              className={({ isActive }) => 
                isActive 
                  ? "font-medium text-barber-blue" 
                  : "font-medium text-barber-dark hover:text-barber-blue transition-colors"
              }
            >
              Meus Agendamentos
            </NavLink>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <NavLink 
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  isActive 
                    ? "font-medium text-barber-blue py-2" 
                    : "font-medium text-barber-dark hover:text-barber-blue transition-colors py-2"
                }
              >
                Início
              </NavLink>
              <NavLink 
                to="/agendar"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  isActive 
                    ? "font-medium text-barber-blue py-2" 
                    : "font-medium text-barber-dark hover:text-barber-blue transition-colors py-2"
                }
              >
                Agendar
              </NavLink>
              <NavLink 
                to="/meus-agendamentos"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  isActive 
                    ? "font-medium text-barber-blue py-2" 
                    : "font-medium text-barber-dark hover:text-barber-blue transition-colors py-2"
                }
              >
                Meus Agendamentos
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
