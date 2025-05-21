
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-barber-dark text-white py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Corte<span className="text-barber-blue">Fino</span></h3>
            <p className="text-gray-300">
              Barbearia moderna com profissionais qualificados para deixar seu visual impecável.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Horário de Funcionamento</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Segunda a Sexta: 9h às 20h</li>
              <li>Sábados: 9h às 18h</li>
              <li>Domingos: Fechado</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-barber-blue transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/agendar" className="text-gray-300 hover:text-barber-blue transition-colors">
                  Agendar
                </Link>
              </li>
              <li>
                <Link to="/meus-agendamentos" className="text-gray-300 hover:text-barber-blue transition-colors">
                  Meus Agendamentos
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CorteFino. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
