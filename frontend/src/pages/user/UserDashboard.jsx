import React from 'react';
import { useNavigate } from "react-router-dom";
import { 
  FaFlag, 
  FaSearch, 
  FaHeart, 
  FaShieldAlt, 
  FaGraduationCap, 
  FaHandsHelping,
  FaChartLine,
  FaUsers,
  FaEye,
  FaBook,
  FaChild
} from 'react-icons/fa';

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-10 md:mb-0">
              <div className="flex items-center mb-4">
                <FaChild className="text-3xl mr-3" />
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  Udaan – Eradication of Child Labour
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Together, We Can End Child Labour
              </p>
              <p className="text-lg mb-10 text-blue-100 max-w-2xl">
                Udaan empowers citizens to report child labour cases and help NGOs take action.
                Every report brings us closer to a world where every child can dream.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">

                <button 
                onClick={() => navigate("report")}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <FaFlag className="mr-3" />
                  Report a Case
                </button>
                <button
                onClick={() => navigate("track")} 
                className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center">
                  <FaSearch className="mr-3" />
                  Track Your Case
                </button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <FaHeart className="text-6xl mx-auto mb-4" />
                <p className="text-center text-lg">
                  <span className="block text-3xl font-bold mb-2">1,247+</span>
                  Children Rescued
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Is Needed Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why This Matters
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Child labour robs children of their childhood, their potential, and their dignity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaGraduationCap className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Education Over Exploitation
              </h3>
              <p className="text-gray-600">
                Every child deserves access to education, not forced labour. 
                Early work prevents cognitive development and limits future opportunities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaShieldAlt className="text-3xl text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Lifelong Protection
              </h3>
              <p className="text-gray-600">
                Child labour causes permanent physical and psychological damage. 
                Early intervention prevents lifelong trauma and health issues.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaHandsHelping className="text-3xl text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Collective Action
              </h3>
              <p className="text-gray-600">
                Public reporting enables NGOs to act swiftly. Your vigilance 
                helps authorities rescue children and provide rehabilitation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awareness Image Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              The Reality & The Hope
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Visualizing the problem and the solution we're working towards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                bg: 'bg-red-50',
                icon: FaEye,
                iconColor: 'text-red-600',
                title: 'Unsafe Environments',
                desc: 'Children forced to work in hazardous conditions',
                caption: 'Every report can save a life'
              },
              {
                bg: 'bg-yellow-50',
                icon: FaBook,
                iconColor: 'text-yellow-600',
                title: 'Missing Education',
                desc: 'Childhood lost to labour instead of learning',
                caption: 'Education is every child\'s right'
              },
              {
                bg: 'bg-green-50',
                icon: FaHeart,
                iconColor: 'text-green-600',
                title: 'Rescue & Rehabilitation',
                desc: 'Transforming lives through timely intervention',
                caption: 'Hope restored, futures rebuilt'
              }
            ].map((card, index) => (
              <div key={index} className={`${card.bg} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="mb-6">
                  <card.icon className={`text-5xl ${card.iconColor} mb-4`} />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {card.desc}
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <p className="font-semibold text-gray-700 italic">
                    "{card.caption}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                About Udaan NGO
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <FaChartLine className="text-4xl text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  Udaan is a non-profit initiative focused on identifying, reporting, 
                  and resolving child labour cases through technology-driven solutions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <FaUsers className="text-4xl text-teal-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">Bridging Gaps</h3>
                <p className="text-gray-600">
                  We connect concerned citizens with NGOs and authorities, 
                  enabling faster response times and more effective interventions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <FaShieldAlt className="text-4xl text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">Transparent Process</h3>
                <p className="text-gray-600">
                  Every report gets a tracking ID. Follow the journey from 
                  reporting to resolution with complete transparency and accountability.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
              <p className="text-gray-700 text-center text-lg leading-relaxed">
                <span className="font-bold text-blue-600">Udaan</span> leverages technology to create 
                a collaborative ecosystem where every citizen becomes a protector of childhood. 
                Together, we're building a future where no child has to work for survival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '5,892+', label: 'Cases Reported' },
              { value: '1,247+', label: 'Children Rescued' },
              { value: '89%', label: 'Resolution Rate' },
              { value: '342+', label: 'Active Volunteers' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}