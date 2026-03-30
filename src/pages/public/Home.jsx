import React from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ActivityCard from "../../components/ActivityCard";

const Home = () => {
  const features = [
    {
      icon: "🌳",
      title: "Impact Dashboard",
      description: "Track trees, waste, energy and measure your school's environmental footprint"
    },
    {
      icon: "📸",
      title: "Eco-Log Activities",
      description: "Share projects and photos to showcase your environmental initiatives"
    },
    {
      icon: "🏆",
      title: "Badges & Rankings",
      description: "Earn recognition from Bronze to Gold for your environmental achievements"
    },
    {
      icon: "👥",
      title: "Community & Collaboration",
      description: "Connect with other schools and share best practices"
    },
    {
      icon: "🎯",
      title: "Challenges & Leaderboards",
      description: "Compete and stay motivated with friendly competitions"
    }
  ];

  const sampleActivities = [
    {
      schoolName: "Kigali International Academy",
      date: "August 18, 2023",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
      description: "Planting trees, waste, energy in the wanting trees, environmental neededs.",
      likes: 142,
      comments: 28,
      category: "Tree Planting"
    },
    {
      schoolName: "Eco Warriors HS",
      date: "April 21, 2022",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop",
      description: "Recycling drive to recycle it into environmental sinner and rute that schools.",
      likes: 96,
      comments: 0,
      category: "Recycling"
    },
    {
      schoolName: "Green Sprouts Primary",
      date: "June 12, 2022",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
      description: "Garden project to cultivate and project to boast environ gnixise needed.",
      likes: 120,
      comments: 0,
      category: "Gardening"
    }
  ];

  const impactStats = [
    { value: "10,000+", label: "Trees Planted", icon: "🌳" },
    { value: "5,000kg", label: "Waste Recycled", icon: "♻️" },
    { value: "200+", label: "Schools Participating", icon: "🏫" }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-emerald-800">ARCOS Environmental Club</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Empowering Schools to{" "}
                <span className="text-emerald-600">Protect the Environment</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Join ARCOS and showcase your school's environmental impact. Together, we can make Rwanda greener!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button variant="primary" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/public/impact">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl transform rotate-3 opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop" 
                alt="Students planting trees" 
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Features Section</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything your school needs to track, share, and celebrate environmental achievements
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <Card key={index} hover className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Activity Preview</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what schools across Rwanda are doing to protect our environment
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleActivities.map((activity, index) => (
              <ActivityCard key={index} activity={activity} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/public/activities">
              <Button variant="outline" size="lg">
                View All Activities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Impact Stats</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              Together, we're making a measurable difference for our planet
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-emerald-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Join the Green Movement Today!
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Be part of Rwanda's leading environmental initiative for schools. 
            Start tracking your impact and inspiring others.
          </p>
          <Link to="/register">
            <Button variant="white" size="lg">
              Create School Account
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;