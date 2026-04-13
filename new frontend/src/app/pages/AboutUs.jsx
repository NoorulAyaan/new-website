export function AboutUs() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Sabir Autos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for quality automobile spare parts and expert workshop services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2001, Sabir Autos has been serving the automotive business with dedication and excellence. We started as a small workshop and grew into a comprehensive platform that connects customers with the best spare parts and services.
            </p>
            <p className="text-gray-600 mb-4">
              Our mission is to make vehicle maintenance and repair accessible, affordable, and reliable for everyone. We believe that every driver deserves access to quality parts and professional service.
            </p>
            <p className="text-gray-600">
              With years of experience and a team of certified mechanics, we ensure that your vehicle gets the care it deserves.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-gray-600">Genuine OEM and aftermarket parts</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-gray-600">Expert technicians with years of experience</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-gray-600">Competitive pricing and warranties</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-gray-600">Fast and reliable delivery</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-gray-600">Genuine parts at affordable prices</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-gray-600">Client satisfactions with quality services</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">We never compromise on the quality of parts and services we provide.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-600">Building lasting relationships through transparency and reliability.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">Staying ahead with the latest technology and industry many trends.</p>
            </div>
          </div>
        </div>

        {/* Meet Our Team - increases page length with profiles */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-28 h-28 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">AH</div>
              <h3 className="text-lg font-semibold text-gray-900">Noor ul Amin</h3>
              <p className="text-sm text-gray-600">Founder & CEO</p>
              <p className="text-gray-600 mt-3">Leads product direction and partnerships with over 20 years in the auto industry.</p>
            </div>
            <div className="text-center">
              <div className="w-28 h-28 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">AB</div>
              <h3 className="text-lg font-semibold text-gray-900">Noor Ul Ayan</h3>
              <p className="text-sm text-gray-600">Head of Operations</p>
              <p className="text-gray-600 mt-3">Oversees workshops and logistics to ensure timely parts delivery and service quality.</p>
            </div>
            <div className="text-center">
              <div className="w-28 h-28 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">PB</div>
              <h3 className="text-lg font-semibold text-gray-900">Atif Ali</h3>
              <p className="text-sm text-gray-600">Junior Mechanic</p>
              <p className="text-gray-600 mt-3">Certified technician with extensive experience in diagnostics and complex repairs.</p>
            </div>
          </div>
        </div>

        {/* Careers / CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="text-gray-600 mb-6">We are always looking for passionate mechanics, support staff, and salespeople. Send your CV to careers@sabirautos.com or visit our contact page to apply.</p>
          <a href="/contact" className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold">Apply Now</a>
        </div>
      </div>
    </div>
  );
}