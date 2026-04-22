import { Link } from "react-router";
import { Wrench, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[linear-gradient(90deg,#081733_0%,#1a2f78_100%)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Wrench className="h-8 w-8 text-cyan-400" />
              <span className="font-bold text-xl">Sabir Autos</span>
            </div>

            <p className="text-blue-100/80 text-sm leading-relaxed">
              Your trusted partner for quality automobile spare parts and expert workshop services. We provide genuine parts and professional repairs for all vehicle makes and models.
            </p>

            <div className="flex space-x-4">
              <a href="#" className="text-blue-200/60 hover:text-cyan-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200/60 hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200/60 hover:text-cyan-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200/60 hover:text-cyan-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>

            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100/80 hover:text-cyan-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100/80 hover:text-cyan-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-blue-100/80 hover:text-cyan-400 transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100/80 hover:text-cyan-400 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>

            <ul className="space-y-2">
              <li className="text-blue-100/80 text-sm">Engine Repair</li>
              <li className="text-blue-100/80 text-sm">Brake Service</li>
              <li className="text-blue-100/80 text-sm">Transmission Service</li>
              <li className="text-blue-100/80 text-sm">Oil Change</li>
              <li className="text-blue-100/80 text-sm">Safety Inspection</li>
              <li className="text-blue-100/80 text-sm">Parts Replacement</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>

            <div className="space-y-3">
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div className="text-blue-100/80 text-sm">
                  <p>Near Allied Bank</p>
                  <p>Aliabad Hunza, Gilgit Baltistan,</p>
                  <p>Pakistan</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <div className="text-blue-100/80 text-sm">
                  <p>+9234-23432443</p>
                  <p>+9234-55148528</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <div className="text-blue-100/80 text-sm">
                  <p>info@sabirautos.com</p>
                  <p>support@sabirautos.com</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            <div className="text-blue-200/60 text-sm mb-4 md:mb-0">
              © 2026 Sabir Autos. All rights reserved.
            </div>

            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-blue-200/60 hover:text-cyan-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-blue-200/60 hover:text-cyan-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-blue-200/60 hover:text-cyan-400 transition-colors">
                Cookie Policy
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}