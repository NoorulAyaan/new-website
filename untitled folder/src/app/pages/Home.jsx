import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Wrench, Search, ShieldCheck, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import sideIMG from "../images/abcd.jpeg"

export function Home() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1619642737579-a7474bee1044?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pYyUyMHJlcGFpcmluZyUyMGNhciUyMHdvcmtzaG9wfGVufDF8fHx8MTc3NTQ1Mzg0OHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Mechanic repairing car in workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Quality Spare Parts for Your Vehicle
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Find the exact parts you need for any vehicle make and model
            </p>
            <div className="flex space-x-4">
              {user ? (
                isAdmin ? (
                  <Link
                    to="/admin"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                  >
                    Go to Admin Panel
                  </Link>
                ) : (
                  <Link
                    to="/shop"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                  >
                    Shop Now
                  </Link>
                )
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ImageWithFallback
              src={sideIMG}
              alt="Our workshop team"
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Sabir Autos</h2>
            <p className="text-gray-600 mb-4">
              At Sabir Autos, we are passionate about keeping vehicles on the road. With over a decade of experience in the automotive industry, our team of certified mechanics and parts specialists work tirelessly to provide you with the highest quality spare parts and services.
            </p>
            <p className="text-gray-600 mb-4">
              We understand that every vehicle is unique, and that's why we offer a comprehensive selection of parts for all makes and models. Whether you're a professional mechanic or a DIY enthusiast, we have the parts you need to get the job done right.
            </p>
            <p className="text-gray-600 mb-4">
              Our commitment to excellence extends beyond just providing parts. We offer expert advice, fast shipping, and unparalleled customer support to ensure your satisfaction with every purchase.
            </p>
            <p className="text-gray-600">
              Choose Sabir Autos for reliable, high-quality automotive solutions that you can trust.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Why Choose Sabir Autos?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Search className="h-12 w-12 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Advanced Search
            </h3>
            <p className="text-gray-600">
              Search by vehicle name, model, and engine details to find the exact part you need
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <ShieldCheck className="h-12 w-12 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Quality Guaranteed
            </h3>
            <p className="text-gray-600">
              All parts are tested and come with warranty for your peace of mind
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Clock className="h-12 w-12 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Quick shipping to get your vehicle back on the road as soon as possible
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">10,000+</div>
              <div className="text-gray-300">Parts Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">10+</div>
              <div className="text-gray-300">Car Brands</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">5,000+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-orange-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Search Your Parts
            </h3>
            <p className="text-gray-600">
              Enter your vehicle details and find the exact spare parts you need from our extensive catalog.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-orange-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Place Your Order
            </h3>
            <p className="text-gray-600">
              Add parts to your cart, review your order, and complete your purchase securely online.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-orange-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Receive your parts quickly and get back on the road with minimal downtime.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Rahmet Karim</h4>
                  <p className="text-gray-600 text-sm">Toyota Fielder Owner</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Sabir Autos made finding the right brake pads for my Camry so easy. The search feature is fantastic and delivery was super fast!"
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Zahoor Baig</h4>
                  <p className="text-gray-600 text-sm">Premeo Owner</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I was impressed by the quality of parts and the customer service. They helped me identify the exact oil filter I needed."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  MR
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Zia Uddin</h4>
                  <p className="text-gray-600 text-sm">Toyota Corolla Owner</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a mechanic, I rely on Sabir Autos for all my parts needs. Their inventory is extensive and prices are competitive."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Ready to Find Your Parts?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of customers who trust Sabir Autos
        </p>
        {!user && (
          <Link
            to="/signup"
            className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            <Wrench className="h-6 w-6" />
            <span>Create Account</span>
          </Link>
        )}
      </div>
    </div>
  );
}
