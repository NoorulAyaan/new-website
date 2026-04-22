export function AboutUs() {
  return (
    <div className="bg-[#eef3fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4 tracking-tight">
            About Sabir Autos
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Your trusted partner for quality automobile spare parts and expert workshop services.
          </p>
        </div>

        {/* Story + Why Choose */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Left */}
          <div>
            <h2 className="text-3xl font-bold text-[#0f172a] mb-6">Our Story</h2>
            <p className="text-slate-600 mb-4 leading-8">
              Founded in 2001, Sabir Autos has been serving the automotive business with dedication and excellence. We started as a small workshop and grew into a comprehensive platform that connects customers with the best spare parts and services.
            </p>
            <p className="text-slate-600 mb-4 leading-8">
              Our mission is to make vehicle maintenance and repair accessible, affordable, and reliable for everyone. We believe that every driver deserves access to quality parts and professional service.
            </p>
            <p className="text-slate-600 leading-8">
              With years of experience and a team of certified mechanics, we ensure that your vehicle gets the care it deserves.
            </p>
          </div>

          {/* Right Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-8">
            <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Why Choose Us?</h3>
            <ul className="space-y-4">
              
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#2678ff] rounded-full mt-2"></div>
                <span className="text-slate-600">Genuine OEM and aftermarket parts</span>
              </li>

              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#2678ff] rounded-full mt-2"></div>
                <span className="text-slate-600">Expert technicians with years of experience</span>
              </li>

              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#2678ff] rounded-full mt-2"></div>
                <span className="text-slate-600">Competitive pricing and warranties</span>
              </li>

              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#2678ff] rounded-full mt-2"></div>
                <span className="text-slate-600">Fast and reliable delivery</span>
              </li>

              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#2678ff] rounded-full mt-2"></div>
                <span className="text-slate-600">Genuine parts at affordable prices</span>
              </li>

              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#2678ff] rounded-full mt-2"></div>
                <span className="text-slate-600">Client satisfactions with quality services</span>
              </li>

            </ul>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-8">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-8 text-center">Our Values</h2>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
                <span className="text-2xl text-white">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-2">Quality</h3>
              <p className="text-slate-600">We never compromise on the quality of parts and services we provide.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
                <span className="text-2xl text-white">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-2">Trust</h3>
              <p className="text-slate-600">Building lasting relationships through transparency and reliability.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
                <span className="text-2xl text-white">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-2">Innovation</h3>
              <p className="text-slate-600">Staying ahead with the latest technology and industry many trends.</p>
            </div>

          </div>
        </div>

        {/* Meet Our Team - increases page length with profiles */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#0f172a]">Meet Our Team</h2>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="text-center">
              <div className="w-28 h-28 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] text-white rounded-full mx-auto mb-4 flex items-center justify-center text-3xl shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
                AH
              </div>
              <h3 className="text-lg font-semibold text-[#0f172a]">Noor ul Amin</h3>
              <p className="text-sm text-slate-500">Founder & CEO</p>
              <p className="text-slate-600 mt-3">Leads product direction and partnerships with over 20 years in the auto industry.</p>
            </div>

            <div className="text-center">
              <div className="w-28 h-28 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] text-white rounded-full mx-auto mb-4 flex items-center justify-center text-3xl shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
                AB
              </div>
              <h3 className="text-lg font-semibold text-[#0f172a]">Noor Ul Ayan</h3>
              <p className="text-sm text-slate-500">Head of Operations</p>
              <p className="text-slate-600 mt-3">Oversees workshops and logistics to ensure timely parts delivery and service quality.</p>
            </div>

            <div className="text-center">
              <div className="w-28 h-28 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] text-white rounded-full mx-auto mb-4 flex items-center justify-center text-3xl shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
                PB
              </div>
              <h3 className="text-lg font-semibold text-[#0f172a]">Atif Ali</h3>
              <p className="text-sm text-slate-500">Junior Mechanic</p>
              <p className="text-slate-600 mt-3">Certified technician with extensive experience in diagnostics and complex repairs.</p>
            </div>

          </div>
        </div>

        {/* Careers / CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#0f172a]">Join Our Team</h2>
          <p className="text-slate-600 mb-6">
            We are always looking for passionate mechanics, support staff, and salespeople. Send your CV to careers@sabirautos.com or visit our contact page to apply.
          </p>
          <a href="/contact" className="inline-block bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:from-[#11baf7] hover:to-[#1f6ef2] text-white px-6 py-3 rounded-full font-semibold shadow-[0_12px_30px_rgba(37,117,255,0.35)] transition-all duration-200">
            Apply Now
          </a>
        </div>

      </div>
    </div>
  );
}