
import { Link } from 'react-router-dom';
import { barbers } from '../context/AppointmentContext';

const HomePage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-barber-dark text-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Estilo e <span className="text-barber-blue">precisão</span> em cada corte
              </h1>
              <p className="text-lg mb-8 text-gray-300 max-w-lg">
                Na Corte Fino, oferecemos mais que um corte de cabelo, 
                criamos uma experiência premium para quem busca excelência.
              </p>
              <div className="space-x-4">
                <Link to="/agendar" className="btn-primary">
                  Agende Agora
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800" 
                  alt="Corte Fino Barbearia Interior" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Equipe</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça os profissionais que fazem da Corte Fino uma referência em excelência.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {barbers.map((barber) => (
              <div key={barber.id} className="card overflow-hidden flex flex-col">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={barber.image} 
                    alt={barber.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2">{barber.name}</h3>
                  <p className="text-gray-600 mb-4">{barber.specialty}</p>
                  <Link to="/agendar" className="text-barber-blue font-medium hover:underline">
                    Agendar com {barber.name.split(" ")[0]} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-barber-dark rounded-lg text-white p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Horário de Funcionamento</h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex justify-between">
                    <span>Segunda a Sexta</span>
                    <span>9h - 20h</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sábados</span>
                    <span>9h - 18h</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Domingos</span>
                    <span>Fechado</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link to="/agendar" className="btn-primary bg-barber-blue">
                    Marque seu horário
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=600" 
                    alt="Barbearia interior" 
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-barber-dark/80 to-transparent rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-barber-blue text-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para renovar seu visual?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Agende seu horário online e garanta um atendimento de excelência.
          </p>
          <Link to="/agendar" className="btn-primary bg-white text-barber-blue hover:bg-white/90">
            Agendar Agora
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
