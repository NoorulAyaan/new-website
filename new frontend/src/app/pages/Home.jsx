import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Wrench, Search, ShieldCheck, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import sideIMG from "../images/abcd.jpeg"

export function Home() {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    parts: 0,
    brands: 0,
    customers: 0,
    support: 0,
    minutes: 0,
  });

  const brandLogos = [
    {
      name: "Toyota",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1400&q=80",
    },
    {
      name: "Honda",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80",
    },
    {
      name: "Suzuki",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    },
    {
      name: "Nissan",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
    },
    {
      name: "Hyundai",
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80",
    },
    {
      name: "Kia",
      image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1400&q=80",
    },
    {
      name: "Mitsubishi",
      image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1400&q=80",
    },
    {
      name: "Daihatsu",
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80",
    },
  ];

  const [brandIndex, setBrandIndex] = useState(0);

  useEffect(() => {
    const targets = {
      parts: 10000,
      brands: 10,
      customers: 5000,
      support: 24,
      minutes: 7,
    };

    const duration = 5000; // total animation time (ms)
    const intervalTime = 20;
    const steps = duration / intervalTime;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;

      setStats({
        parts: Math.min(Math.floor((targets.parts / steps) * currentStep), targets.parts),
        brands: Math.min(Math.floor((targets.brands / steps) * currentStep), targets.brands),
        customers: Math.min(Math.floor((targets.customers / steps) * currentStep), targets.customers),
        support: Math.min(Math.floor((targets.support / steps) * currentStep), targets.support),
        minutes: Math.min(Math.floor((targets.minutes / steps) * currentStep), targets.minutes),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBrandIndex((prev) => (prev + 1) % brandLogos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [brandLogos.length]);

  const nextBrand = () => {
    setBrandIndex((prev) => (prev + 1) % brandLogos.length);
  };

  const prevBrand = () => {
    setBrandIndex((prev) => (prev - 1 + brandLogos.length) % brandLogos.length);
  };

  return (
    <div className="min-h-screen bg-[#eef3fb]">
      {/* Hero Section */}
      <div className="relative h-[700px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1619642737579-a7474bee1044?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pYyUyMHJlcGFpcmluZyUyMGNhciUyMHdvcmtzaG9wfGVufDF8fHx8MTc3NTQ1Mzg0OHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Mechanic repairing car in workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,15,40,0.88)_0%,rgba(22,54,138,0.72)_45%,rgba(6,18,45,0.88)_100%)] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.18)]">
              Quality Spare Parts for Your Vehicle
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-50/90">
              Find the exact parts you need for any vehicle make and model
            </p>
            <div className="flex space-x-4">
              {user ? (
                isAdmin ? (
                  <Link
                    to="/admin"
                    className="bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:from-[#11baf7] hover:to-[#1f6ef2] text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 shadow-[0_12px_30px_rgba(37,117,255,0.35)]"
                  >
                    Go to Admin Panel
                  </Link>
                ) : (
                  <Link
                    to="/shop"
                    className="bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:from-[#11baf7] hover:to-[#1f6ef2] text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 shadow-[0_12px_30px_rgba(37,117,255,0.35)]"
                  >
                    Shop Now
                  </Link>
                )
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:from-[#11baf7] hover:to-[#1f6ef2] text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 shadow-[0_12px_30px_rgba(37,117,255,0.35)]"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white/10 backdrop-blur-sm border border-white/35 hover:bg-white/16 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
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
              className="w-full h-96 object-cover rounded-[22px] shadow-[0_20px_45px_rgba(15,23,42,0.14)] border border-white/70"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#0f172a] mb-6">About Sabir Autos</h2>
            <p className="text-slate-600 mb-4 leading-8">
              At Sabir Autos, we are passionate about keeping vehicles on the road. With over a decade of experience in the automotive industry, our team of certified mechanics and parts specialists work tirelessly to provide you with the highest quality spare parts and services.
            </p>
            <p className="text-slate-600 mb-4 leading-8">
              We understand that every vehicle is unique, and that's why we offer a comprehensive selection of parts for all makes and models. Whether you're a professional mechanic or a DIY enthusiast, we have the parts you need to get the job done right.
            </p>
            <p className="text-slate-600 mb-4 leading-8">
              Our commitment to excellence extends beyond just providing parts. We offer expert advice, fast shipping, and unparalleled customer support to ensure your satisfaction with every purchase.
            </p>
            <p className="text-slate-600 leading-8">
              Choose Sabir Autos for reliable, high-quality automotive solutions that you can trust.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0f172a]">
          Why Choose Sabir Autos?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] text-center transition-all duration-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
            <div className="flex justify-center mb-4">
              <Search className="h-12 w-12 text-[#16c3ff]" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#0f172a]">
              Advanced Search
            </h3>
            <p className="text-slate-600 leading-7">
              Search by vehicle name, model, and engine details to find the exact part you need
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] text-center transition-all duration-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
            <div className="flex justify-center mb-4">
              <ShieldCheck className="h-12 w-12 text-[#5b6cff]" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#0f172a]">
              Quality Guaranteed
            </h3>
            <p className="text-slate-600 leading-7">
              All parts are tested and come with warranty for your peace of mind
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] text-center transition-all duration-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
            <div className="flex justify-center mb-4">
              <Clock className="h-12 w-12 text-[#ff4fd8]" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#0f172a]">
              Fast Delivery
            </h3>
            <p className="text-slate-600 leading-7">
              Quick shipping to get your vehicle back on the road as soon as possible
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[linear-gradient(90deg,#081733_0%,#1a2f78_100%)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#19d2ff] mb-2">{stats.parts.toLocaleString()}+</div>
              <div className="text-blue-100/80">Parts Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#19d2ff] mb-2">{stats.brands}+</div>
              <div className="text-blue-100/80">Car Brands</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#19d2ff] mb-2">{stats.customers.toLocaleString()}+</div>
              <div className="text-blue-100/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#19d2ff] mb-2">{stats.support}/{stats.minutes}</div>
              <div className="text-blue-100/80">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Carousel Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#0f172a]">
          Brands We Have Parts For
        </h2>
        <p className="text-center text-slate-600 mb-12 text-lg">
          We provide spare parts for trusted vehicle brands
        </p>

        <div className="relative">
          <div className="overflow-hidden rounded-[24px] shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-[#d9e5f6] bg-white">
            <div className="relative h-[460px]">
              <img
                src={brandLogos[brandIndex].image}
                alt={brandLogos[brandIndex].name}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-[#020617]/20 to-transparent flex items-end justify-center pb-10">
                <h3 className="text-3xl font-bold text-white tracking-wide">
                  {brandLogos[brandIndex].name}
                </h3>
              </div>
            </div>
          </div>

          <button
            onClick={prevBrand}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md hover:bg-white rounded-full p-3 shadow-lg border border-[#d9e5f6] transition-all duration-200"
          >
            <ChevronLeft className="h-5 w-5 text-[#2678ff]" />
          </button>

          <button
            onClick={nextBrand}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md hover:bg-white rounded-full p-3 shadow-lg border border-[#d9e5f6] transition-all duration-200"
          >
            <ChevronRight className="h-5 w-5 text-[#2678ff]" />
          </button>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {brandLogos.map((_, index) => (
            <button
              key={index}
              onClick={() => setBrandIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-200 ${
                index === brandIndex
                  ? "w-8 bg-[#2678ff]"
                  : "w-2.5 bg-[#b8cceb]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0f172a]">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#eef7ff] to-[#d7eaff] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_10px_25px_rgba(37,117,255,0.15)] border border-[#d8e7fb]">
              <span className="text-2xl font-bold text-[#2678ff]">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#0f172a]">
              Search Your Parts
            </h3>
            <p className="text-slate-600 leading-7">
              Enter your vehicle details and find the exact spare parts you need from our extensive catalog.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#eef7ff] to-[#d7eaff] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_10px_25px_rgba(37,117,255,0.15)] border border-[#d8e7fb]">
              <span className="text-2xl font-bold text-[#2678ff]">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#0f172a]">
              Place Your Order
            </h3>
            <p className="text-slate-600 leading-7">
              Add parts to your cart, review your order, and complete your purchase securely online.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#eef7ff] to-[#d7eaff] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_10px_25px_rgba(37,117,255,0.15)] border border-[#d8e7fb]">
              <span className="text-2xl font-bold text-[#2678ff]">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#0f172a]">
              Fast Delivery
            </h3>
            <p className="text-slate-600 leading-7">
              Receive your parts quickly and get back on the road with minimal downtime.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-[#eef3fb] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0f172a]">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-full flex items-center justify-center text-white font-bold shadow-[0_10px_24px_rgba(37,117,255,0.22)]">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[#0f172a]">Rahmet Karim</h4>
                  <p className="text-slate-500 text-sm">Toyota Fielder Owner</p>
                </div>
              </div>
              <p className="text-slate-600 italic leading-7">
                "Sabir Autos made finding the right brake pads for my Camry so easy. The search feature is fantastic and delivery was super fast!"
              </p>
            </div>

            <div className="bg-white p-6 rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-full flex items-center justify-center text-white font-bold shadow-[0_10px_24px_rgba(37,117,255,0.22)]">
                  SM
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[#0f172a]">Zahoor Baig</h4>
                  <p className="text-slate-500 text-sm">Premeo Owner</p>
                </div>
              </div>
              <p className="text-slate-600 italic leading-7">
                "I was impressed by the quality of parts and the customer service. They helped me identify the exact oil filter I needed."
              </p>
            </div>

            <div className="bg-white p-6 rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-full flex items-center justify-center text-white font-bold shadow-[0_10px_24px_rgba(37,117,255,0.22)]">
                  MR
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[#0f172a]">Zia Uddin</h4>
                  <p className="text-slate-500 text-sm">Toyota Corolla Owner</p>
                </div>
              </div>
              <p className="text-slate-600 italic leading-7">
                "As a mechanic, I rely on Sabir Autos for all my parts needs. Their inventory is extensive and prices are competitive."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#0f172a]">
          Ready to Find Your Parts?
        </h2>
        <p className="text-xl text-slate-600 mb-8">
          Join thousands of customers who trust Sabir Autos
        </p>
        {!user && (
          <Link
            to="/signup"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:from-[#11baf7] hover:to-[#1f6ef2] text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 shadow-[0_12px_30px_rgba(37,117,255,0.35)]"
          >
            <Wrench className="h-6 w-6" />
            <span>Create Account</span>
          </Link>
        )}
      </div>
    </div>
  );
}
