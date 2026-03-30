import React from "react";
import PublicLayout from "../../layouts/PublicLayout";
import Card from "../../components/Card";
import ProgressBar from "../../components/ProgressBar";

const Impact = () => {
  const impactData = [
    {
      category: "Trees Planted",
      current: 10450,
      target: 15000,
      unit: "trees",
      icon: "🌳",
      color: "emerald"
    },
    {
      category: "Waste Recycled",
      current: 5200,
      target: 8000,
      unit: "kg",
      icon: "♻️",
      color: "blue"
    },
    {
      category: "Water Saved",
      current: 25000,
      target: 40000,
      unit: "liters",
      icon: "💧",
      color: "purple"
    },
    {
      category: "Energy Generated",
      current: 150,
      target: 500,
      unit: "kWh",
      icon: "⚡",
      color: "orange"
    }
  ];

  const sdgGoals = [
    {
      number: 4,
      title: "Quality Education",
      description: "Environmental education integrated into school curricula",
      icon: "📚"
    },
    {
      number: 6,
      title: "Clean Water and Sanitation",
      description: "Water conservation and management programs",
      icon: "💧"
    },
    {
      number: 7,
      title: "Affordable and Clean Energy",
      description: "Solar energy installations and awareness",
      icon: "⚡"
    },
    {
      number: 11,
      title: "Sustainable Cities",
      description: "Creating sustainable school environments",
      icon: "🏙️"
    },
    {
      number: 12,
      title: "Responsible Consumption",
      description: "Waste reduction and recycling programs",
      icon: "♻️"
    },
    {
      number: 13,
      title: "Climate Action",
      description: "Carbon footprint reduction initiatives",
      icon: "🌍"
    },
    {
      number: 15,
      title: "Life on Land",
      description: "Tree planting and biodiversity protection",
      icon: "🌳"
    }
  ];

  const milestones = [
    {
      year: "2021",
      title: "Program Launch",
      description: "Greening Schools initiative started with 20 pilot schools"
    },
    {
      year: "2022",
      title: "National Expansion",
      description: "Expanded to all 30 districts of Rwanda"
    },
    {
      year: "2023",
      title: "10,000 Trees Milestone",
      description: "Surpassed 10,000 trees planted across participating schools"
    },
    {
      year: "2024",
      title: "Digital Platform Launch",
      description: "Launched online platform for tracking and sharing activities"
    }
  ];

  return (
    <PublicLayout>
      <div className="bg-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Our Impact
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl">
            Measurable results from schools committed to environmental conservation
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Impact Metrics */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Impact Metrics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {impactData.map((item, index) => {
              const progress = Math.round((item.current / item.target) * 100);
              return (
                <Card key={index}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.category}</h3>
                      <p className="text-2xl font-bold text-emerald-600">
                        {item.current.toLocaleString()} <span className="text-sm text-gray-500">/ {item.target.toLocaleString()} {item.unit}</span>
                      </p>
                    </div>
                  </div>
                  <ProgressBar progress={progress} size="md" color={item.color} />
                </Card>
              );
            })}
          </div>
        </section>

        {/* SDG Alignment */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">UN Sustainable Development Goals</h2>
          <p className="text-gray-600 mb-8">
            Our initiative contributes to the following United Nations SDGs:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sdgGoals.map((goal, index) => (
              <Card key={index} hover className="text-center">
                <div className="text-3xl mb-2">{goal.icon}</div>
                <div className="text-xs font-bold text-emerald-600 mb-1">SDG {goal.number}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{goal.title}</h3>
                <p className="text-xs text-gray-600">{goal.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-200"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative pl-12">
                  <div className="absolute left-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{milestone.year.slice(-2)}</span>
                  </div>
                  <Card>
                    <div className="text-sm font-bold text-emerald-600 mb-1">{milestone.year}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 text-sm">{milestone.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="bg-emerald-50 rounded-2xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl mb-4">💬</div>
            <blockquote className="text-xl text-gray-700 italic mb-6">
              "Greening Schools has transformed how our students think about the environment. 
              They've become true environmental champions in their communities."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center">
                <span className="text-lg">👨‍🏫</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Jean Pierre Habimana</div>
                <div className="text-sm text-gray-600">Headteacher, Kigali International Academy</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Impact;