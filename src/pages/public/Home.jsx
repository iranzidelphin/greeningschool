import React from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const Home = () => {
  const services = [
    {
      icon: "♻️",
      title: "Carbon Offsetting",
      description: "Climate-focused actions that reduce emissions and improve air quality."
    },
    {
      icon: "⚡",
      title: "Energy Consulting",
      description: "Guidance for cleaner energy transitions and long-term sustainability."
    },
    {
      icon: "🌎",
      title: "Climate Adaptation",
      description: "Resilience planning to help communities adapt to climate impacts."
    }
  ];

  const featuredPrograms = [
    {
      title: "Dirty Recycling",
      image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&h=400&fit=crop",
      description: "Community-level recycling programs to reduce landfill waste."
    },
    {
      title: "Safe Environment",
      image: "https://images.unsplash.com/photo-1492496913980-501348b61469?w=600&h=400&fit=crop",
      description: "Awareness and education campaigns for greener neighborhoods."
    },
    {
      title: "Cleaning Ocean",
      image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=600&h=400&fit=crop",
      description: "Volunteer action projects to clean shores and protect ecosystems."
    }
  ];

  const upcomingActivities = [
    {
      title: "Kigali Green Walk",
      date: "April 12, 2026",
      place: "Nyarutarama, Kigali",
      type: "Community Event"
    },
    {
      title: "School Tree Planting Day",
      date: "April 20, 2026",
      place: "Gasabo District",
      type: "Tree Planting"
    },
    {
      title: "Plastic-Free Challenge",
      date: "May 02, 2026",
      place: "Kicukiro District",
      type: "Awareness Campaign"
    }
  ];

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-[#04231c]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1920&h=1080&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#031710] via-[#04231c]/95 to-[#04231c]/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <p className="text-emerald-300 tracking-[0.2em] uppercase text-xs font-semibold mb-6">
                Natural Environment
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Leading the way to a greener future
              </h1>
              <p className="text-emerald-100/90 max-w-xl mb-8">
                Ecology is the scientific study of the relationships between
                organisms and their environments, including their physical and
                chemical systems.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-white font-semibold hover:bg-emerald-600 transition-colors"
                >
                  Join Us Now
                </Link>
                <Link
                  to="/public/impact"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
                >
                  Get Started
                </Link>
              </div>
              <div className="mt-14 flex items-center gap-6 text-xs uppercase tracking-[0.15em] text-emerald-200/90">
                <span>Facebook</span>
                <span>Instagram</span>
                <span>Twitter</span>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <div className="h-80 w-80 rounded-full border border-emerald-300/20 bg-emerald-500/10 backdrop-blur-sm" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=900&fit=crop"
              alt="Plant growing in hands"
              className="w-full max-w-md rounded-2xl shadow-lg object-cover h-[460px]"
            />
            <div className="absolute -right-4 top-8 w-2 h-48 bg-emerald-500 rounded-full hidden md:block" />
          </div>
          <div>
            <p className="uppercase tracking-[0.22em] text-xs text-emerald-700 font-semibold mb-4">
              About with us
            </p>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Building a greener future together forever
            </h2>
            <p className="text-slate-600 mb-6">
              Ecology is the scientific study of relationships between living
              organisms and environmental systems.
            </p>
            <ul className="space-y-3 text-slate-700 mb-8">
              <li className="flex items-center gap-2">✅ Know what your target market wants and needs</li>
              <li className="flex items-center gap-2">✅ A whole lot of digital love for less</li>
            </ul>
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Problem Solving</span>
              <span>80%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-emerald-100 mb-8">
              <div className="h-full w-4/5 rounded-full bg-emerald-500" />
            </div>
            <Link
              to="/public/impact"
              className="inline-flex items-center rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600 transition-colors"
            >
              Explore More
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#eff3ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.2em] text-xs text-emerald-700 font-semibold mb-4">Our Services</p>
            <h2 className="text-4xl font-bold text-slate-900">Preserving The Earth For Future Generations</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="rounded-2xl bg-white p-8 text-center shadow-sm border border-emerald-50">
                <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center text-2xl mx-auto mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {featuredPrograms.map((program) => (
              <div key={`${program.title}-thumb`} className="rounded-2xl overflow-hidden h-36">
                <img src={program.image} alt={program.title} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="uppercase tracking-[0.2em] text-xs text-emerald-700 font-semibold mb-4">Our Result</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Getting A Greener Future Safe Environment
              </h2>
              <p className="text-slate-600 mb-6">
                Support ecosystems through practical sustainability work and
                measurable outcomes for clean and safe communities.
              </p>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm text-slate-700">
                    <span>Safe Environment</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 rounded-full bg-emerald-100">
                    <div className="h-full w-[90%] rounded-full bg-emerald-500" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm text-slate-700">
                    <span>Dirty Recycling</span>
                    <span>80%</span>
                  </div>
                  <div className="h-2 rounded-full bg-emerald-100">
                    <div className="h-full w-[80%] rounded-full bg-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPrograms.map((program) => (
                <div key={program.title} className="rounded-2xl border border-emerald-100 overflow-hidden bg-white shadow-sm">
                  <img src={program.image} alt={program.title} className="h-36 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">{program.title}</h3>
                    <p className="text-sm text-slate-600">{program.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#eff3ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="uppercase tracking-[0.2em] text-xs text-emerald-700 font-semibold mb-3">
                Events
              </p>
              <h2 className="text-4xl font-bold text-slate-900">Upcoming Activities</h2>
            </div>
            <Link
              to="/public/activities"
              className="inline-flex items-center rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingActivities.map((activity) => (
              <div
                key={activity.title}
                className="rounded-2xl bg-white border border-emerald-100 p-6 shadow-sm"
              >
                <p className="text-xs font-semibold tracking-wide uppercase text-emerald-700 mb-3">
                  {activity.type}
                </p>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{activity.title}</h3>
                <p className="text-slate-600 text-sm mb-1">Date: {activity.date}</p>
                <p className="text-slate-600 text-sm">Location: {activity.place}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;