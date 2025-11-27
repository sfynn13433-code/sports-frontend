import { ArrowRight, Zap, Sparkles, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-950/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Builder</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
            <a href="#how-it-works" className="text-slate-300 hover:text-white transition">How It Works</a>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Powered by AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Build{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                beautiful apps
              </span>
              {" "}from scratch, instantly
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
              No developer setup required. Builder's AI guides you through every step, automatically generating production-ready code and keeping everything synchronized.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105">
                Start Building
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-3 border border-slate-700 hover:border-slate-600 text-white rounded-lg font-semibold transition">
                View Demo
              </button>
            </div>

            <div className="pt-8 flex items-center gap-6 text-slate-400">
              <div className="text-sm">
                <p className="font-semibold text-white">10,000+</p>
                <p>Apps Created</p>
              </div>
              <div className="w-px h-8 bg-slate-700"></div>
              <div className="text-sm">
                <p className="font-semibold text-white">99.9%</p>
                <p>Uptime</p>
              </div>
              <div className="w-px h-8 bg-slate-700"></div>
              <div className="text-sm">
                <p className="font-semibold text-white">24/7</p>
                <p>AI Support</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-3xl opacity-20"></div>
            <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-8 space-y-4">
              <div className="space-y-3">
                <div className="h-3 bg-slate-700 rounded-full w-1/3"></div>
                <div className="h-3 bg-slate-700 rounded-full w-2/3"></div>
                <div className="h-3 bg-slate-700 rounded-full w-1/2"></div>
              </div>
              <div className="pt-4 space-y-2">
                <div className="h-2 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full"></div>
                <div className="h-2 bg-gradient-to-r from-blue-500/30 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything you need to build apps
          </h2>
          <p className="text-lg text-slate-400">
            Powerful features designed to accelerate your workflow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: "AI-Powered Code Generation",
              description: "Automatically generate clean, production-ready code that follows best practices",
            },
            {
              icon: Zap,
              title: "Lightning Fast Setup",
              description: "No complex configurations or developer environment needed to get started",
            },
            {
              icon: ArrowRight,
              title: "Real-Time Synchronization",
              description: "Watch your changes instantly as the AI updates your app with new features",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-700/50 bg-slate-900/50 hover:bg-slate-800/50 hover:border-slate-600/50 transition"
              >
                <Icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Describe", desc: "Tell Builder what app you want to create" },
            { step: "2", title: "Generate", desc: "AI automatically creates your codebase" },
            { step: "3", title: "Refine", desc: "Iterate and improve with AI guidance" },
            { step: "4", title: "Deploy", desc: "Ship your app to production instantly" },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{item.step}</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
              {idx < 3 && (
                <div className="hidden md:block absolute top-6 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-12 sm:p-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
          </div>
          <div className="relative text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to build your next app?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of developers building beautiful, production-ready applications with AI
            </p>
            <button className="px-8 py-3 bg-white hover:bg-slate-100 text-blue-600 font-semibold rounded-lg transition transform hover:scale-105">
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-sm mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white">Builder</span>
              </div>
              <p className="text-slate-400 text-sm">
                The AI-powered platform for building production apps in minutes
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Follow</h4>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-white transition">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-sm text-slate-500">
              © 2024 Builder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
