import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactUs() {
  return (
    <div className="bg-[#eef3fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get in touch with our team for all your automotive needs. We're here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Left */}
          <div>
            <h2 className="text-3xl font-bold text-[#0f172a] mb-8">Get In Touch</h2>

            <div className="space-y-6">

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0f172a] mb-2">Address</h3>
                  <p className="text-slate-600">
                    Near Allied Bank<br />
                    Aliabad Hunza, Gilgit Baltistan,<br />
                    Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0f172a] mb-2">Phone</h3>
                  <p className="text-slate-600">
                    +9234-23432443<br />
                    +9234-55148528
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0f172a] mb-2">Email</h3>
                  <p className="text-slate-600">
                    info@sabirautos.com<br />
                    support@sabirautos.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_10px_25px_rgba(37,117,255,0.25)]">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0f172a] mb-2">Business Hours</h3>
                  <p className="text-slate-600">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 8:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-8">
            <h2 className="text-2xl font-bold text-[#0f172a] mb-6">Send Us a Message</h2>

            <form className="space-y-6">

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-600 mb-2">
                    First Name
                  </label>
                  <input type="text" id="firstName" name="firstName"
                    placeholder="First Name"
                    className="w-full px-4 py-2 border border-[#d9e5f6] rounded-lg focus:ring-2 focus:ring-[#2678ff] focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-600 mb-2">
                    Last Name
                  </label>
                  <input type="text" id="lastName" name="lastName"
                    placeholder="Last Name"
                    className="w-full px-4 py-2 border border-[#d9e5f6] rounded-lg focus:ring-2 focus:ring-[#2678ff] focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-2">
                  Email
                </label>
                <input type="email" id="email" name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-[#d9e5f6] rounded-lg focus:ring-2 focus:ring-[#2678ff] focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-600 mb-2">
                  Phone
                </label>
                <input type="tel" id="phone" name="phone"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border border-[#d9e5f6] rounded-lg focus:ring-2 focus:ring-[#2678ff] focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-600 mb-2">
                  Subject
                </label>
                <input type="text" id="subject" name="subject"
                  placeholder="Subject"
                  className="w-full px-4 py-2 border border-[#d9e5f6] rounded-lg focus:ring-2 focus:ring-[#2678ff] focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-600 mb-2">
                  Message
                </label>
                <textarea id="message" name="message" rows={4}
                  placeholder="Your message..."
                  className="w-full px-4 py-2 border border-[#d9e5f6] rounded-lg focus:ring-2 focus:ring-[#2678ff] focus:border-transparent outline-none transition"
                  required
                ></textarea>
              </div>

              <button type="submit"
                className="w-full bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:from-[#11baf7] hover:to-[#1f6ef2] text-white px-6 py-3 rounded-full font-semibold shadow-[0_12px_30px_rgba(37,117,255,0.35)] transition-all duration-200"
              >
                Send Message
              </button>

            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-8">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-8 text-center">Visit Our Workshop</h2>
          <div className="aspect-w-16 aspect-h-9 bg-[#e6eefb] rounded-lg flex items-center justify-center">
            <div className="text-center text-slate-500">
              <MapPin className="h-16 w-16 mx-auto mb-4" />
              <p>Interactive Map Coming Soon</p>
              <p className="text-sm">Near Allied Bank, Aliabad Hunza, Gilgit Baltistan, Pakistan</p>
            </div>
          </div>
        </div>

        {/* FAQ - adds extra vertical space and helpful info */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#0f172a]">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <details className="bg-[#f5f9ff] p-4 rounded-lg">
              <summary className="font-semibold">Do you ship internationally?</summary>
              <p className="mt-2 text-slate-600">Yes — we ship to select countries. Contact support for availability and pricing.</p>
            </details>

            <details className="bg-[#f5f9ff] p-4 rounded-lg">
              <summary className="font-semibold">Can I return parts if they are incorrect?</summary>
              <p className="mt-2 text-slate-600">We accept returns within 14 days for unused parts — see our return policy for details.</p>
            </details>

            <details className="bg-[#f5f9ff] p-4 rounded-lg">
              <summary className="font-semibold">Do you offer installation services?</summary>
              <p className="mt-2 text-slate-600">Yes. Our workshops provide installation and repair services at competitive rates.</p>
            </details>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] rounded-[22px] p-8 text-center text-white shadow-[0_20px_40px_rgba(37,117,255,0.35)]">
          <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
          <p className="mb-4">Subscribe to our newsletter for parts deals, service tips, and special offers.</p>

          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-full bg-white text-[#0f172a] placeholder:text-slate-400 border border-white/40 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:from-[#11baf7] hover:to-[#1f6ef2] text-white px-6 py-2 rounded-full font-semibold shadow-[0_12px_30px_rgba(37,117,255,0.35)] transition-all duration-200">
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}