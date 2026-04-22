import { Wrench, Car, Settings, Battery, Gauge, Shield } from "lucide-react";

export function Services() {
  return (
    <div className="bg-[#eef3fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4 tracking-tight">
            Our Services
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive automotive services to keep your vehicle running smoothly and safely.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

          <div className="bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-6 transition-all duration-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
            <div className="w-12 h-12 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-xl flex items-center justify-center mb-4 shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Engine Repair</h3>
            <p className="text-slate-600">
              Complete engine diagnostics, repair, and maintenance services for all kinds of vehicles with expert technicians.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-6 transition-all duration-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
            <div className="w-12 h-12 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-xl flex items-center justify-center mb-4 shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
              <Car className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Brake Service</h3>
            <p className="text-slate-600">
              Professional brake inspection, repair, and replacement with premium quality parts and smooth operation.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-6 transition-all duration-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
            <div className="w-12 h-12 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-xl flex items-center justify-center mb-4 shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Transmission Service</h3>
            <p className="text-slate-600">
              Automatic and manual transmission repair, maintenance, and fluid changes with full care and experts.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-6 transition-all duration-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
            <div className="w-12 h-12 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-xl flex items-center justify-center mb-4 shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
              <Battery className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Battery Service</h3>
            <p className="text-slate-600">
              Battery testing, replacement, and electrical system diagnostics including full repair and premium quality parts.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-6 transition-all duration-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
            <div className="w-12 h-12 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-xl flex items-center justify-center mb-4 shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
              <Gauge className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Oil Change</h3>
            <p className="text-slate-600">
              Quick and efficient oil changes with premium synthetic oils and filters and premium engine lubricant oil.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-6 transition-all duration-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
            <div className="w-12 h-12 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-xl flex items-center justify-center mb-4 shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Safety Inspection</h3>
            <p className="text-slate-600">
              Comprehensive vehicle safety inspections and emissions testing with detailed reports and recommendations.
            </p>
          </div>

        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-8">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-8 text-center">Why Choose Our Services?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-4">Certified Technicians</h3>
              <p className="text-slate-600 mb-4">
                Our team consists of certified mechanics with years of experience in automotive repair and maintenance and deliver fully detailed work to our customers.
              </p>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-4">Quality Parts</h3>
              <p className="text-slate-600 mb-4">
                We use only high-quality and aftermarket parts that meet or exceed manufacturer specifications and provide long-lasting performance and reliability.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-4">Warranty Coverage</h3>
              <p className="text-slate-600 mb-4">
                All our services come with comprehensive warranties to give you peace of mind at an affordable prices and make sure that you are satisfied with our products and services.
              </p>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-4">Convenient Scheduling</h3>
              <p className="text-slate-600">
                Easy online booking and flexible scheduling to fit your busy lifestyle and provide a seamless experience.
              </p>
            </div>
          </div>
        </div>

        {/* Service Packages - increases page length */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#0f172a]">Service Packages</h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="p-6 border border-[#d9e5f6] rounded-[18px] bg-[#f8fbff]">
              <h3 className="text-xl font-semibold mb-2">Basic Tune-Up</h3>
              <p className="text-slate-600 mb-4">Oil change, basic inspection, and filter replacement.</p>
              <div className="font-bold text-[#2678ff]">Starting at Rs.300</div>
            </div>

            <div className="p-6 border border-[#d9e5f6] rounded-[18px] bg-[#f8fbff]">
              <h3 className="text-xl font-semibold mb-2">Standard Care</h3>
              <p className="text-slate-600 mb-4">Includes Basic Tune-Up plus brake check and battery test.</p>
              <div className="font-bold text-[#2678ff]">Starting at Rs.500</div>
            </div>

            <div className="p-6 border border-[#d9e5f6] rounded-[18px] bg-[#f8fbff]">
              <h3 className="text-xl font-semibold mb-2">Full Service</h3>
              <p className="text-slate-600 mb-4">Full diagnostics, multi-point inspection, and parts replacement as needed.</p>
              <div className="font-bold text-[#2678ff]">Custom Pricing</div>
            </div>

          </div>
        </div>

        {/* Booking CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-3 text-[#0f172a]">Ready to Book?</h3>
          <p className="text-slate-600 mb-4">Schedule a service appointment online or contact our support team for assistance.</p>
          <a href="/contact" className="inline-block bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:from-[#11baf7] hover:to-[#1f6ef2] text-white px-6 py-3 rounded-full font-semibold shadow-[0_12px_30px_rgba(37,117,255,0.35)]">
            Book Appointment
          </a>
        </div>

      </div>
    </div>
  );
}