import { MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <MapPin className="h-6 w-6 text-primary-500" />
            <span className="text-lg font-bold text-gray-900">ProfileMap</span>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-8 items-center">
            <div className="text-sm text-gray-500 mb-2 md:mb-0">
              © {currentYear} ProfileMap. All rights reserved.
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-primary-500 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary-500 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary-500 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
