import { ArrowRight, TrendingUp, Zap, BarChart3, Target, Trophy, ChevronRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-gold-700/30 backdrop-blur-sm bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center font-bold text-slate-950">
              ⚽
            </div>
            <div>
              <p className="text-xs text-gold-300 font-semibold">SKCS AI</p>
              <p className="text-sm font-bold text-white">Sports Predictions</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-gold-400 transition text-sm">
              Features
            </a>
            <a href="#leagues" className="text-gray-300 hover:text-gold-400 transition text-sm">
              Leagues
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-gold-400 transition text-sm">
              How It Works
            </a>
            <Link
              to="/sports"
              className="px-5 py-2 border border-gold-500/40 hover:border-gold-500/70 text-gold-300 hover:text-gold-400 rounded-lg font-semibold transition"
            >
              Select Sport
            </Link>
            <Link
              to="/predictions"
              className="px-5 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 rounded-lg font-semibold transition"
            >
              View Predictions
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full">
              <Zap className="w-4 h-4 text-gold-400" />
              <span className="text-sm text-gold-300 font-semibold">AI-Powered Predictions</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Smart{" "}
              <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                sports predictions
              </span>
              {" "}powered by AI
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              SKCS AI delivers data-driven match forecasts, real-time insights, and actionable betting predictions across major leagues worldwide. Stay ahead with machine learning precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                to="/sports"
                className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 rounded-lg font-bold flex items-center justify-center gap-2 transition transform hover:scale-105"
              >
                Choose Your Sport
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/predictions"
                className="px-8 py-4 border-2 border-gold-500/40 hover:border-gold-500/70 text-gold-300 hover:text-gold-200 rounded-lg font-semibold transition"
              >
                View All Predictions
              </Link>
            </div>

            <div className="pt-8 flex items-center gap-8 text-gray-400">
              <div>
                <p className="font-bold text-2xl text-gold-400">87.3%</p>
                <p className="text-sm">Avg Accuracy</p>
              </div>
              <div className="w-px h-12 bg-gold-700/30"></div>
              <div>
                <p className="font-bold text-2xl text-gold-400">15,000+</p>
                <p className="text-sm">Predictions Daily</p>
              </div>
              <div className="w-px h-12 bg-gold-700/30"></div>
              <div>
                <p className="font-bold text-2xl text-gold-400">6</p>
                <p className="text-sm">Major Leagues</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-700 rounded-2xl blur-3xl opacity-15"></div>
            <div className="relative bg-slate-900/50 border border-gold-600/20 rounded-2xl p-8 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-3 bg-gold-600/30 rounded-full w-2/5"></div>
                  <div className="text-xs text-gold-400 font-semibold">LIVE</div>
                </div>
                <div className="h-3 bg-gold-600/30 rounded-full w-3/4"></div>
                <div className="h-3 bg-gold-600/30 rounded-full w-2/3"></div>
              </div>
              <div className="pt-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <div className="flex-1 h-2 bg-gold-500/50 rounded-full"></div>
                  <div className="text-xs text-gold-300">68%</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                  <div className="flex-1 h-2 bg-slate-700 rounded-full"></div>
                  <div className="text-xs text-slate-400">32%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Coverage Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            6 Major Sports, Unlimited Predictions
          </h2>
          <p className="text-lg text-gray-400">
            Comprehensive AI-powered forecasts across football, rugby, tennis, snooker, ice hockey, and basketball
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              sport: "⚽ Football",
              emoji: "⚽",
              predictions: ["Full-Time Results", "Half-Time/Full-Time", "Both Teams to Score", "Correct Scores", "First/Last Goal Scorers"],
              color: "from-green-600 to-green-700",
            },
            {
              sport: "🏈 Rugby",
              emoji: "🏈",
              predictions: ["Match Results", "Point Spreads", "Try Scorers", "Total Points", "Half-Time Results"],
              color: "from-orange-600 to-orange-700",
            },
            {
              sport: "🎾 Tennis",
              emoji: "🎾",
              predictions: ["Match Winners", "Set Winners", "Correct Scores", "Tie-Break Predictions", "Game Totals"],
              color: "from-yellow-600 to-yellow-700",
            },
            {
              sport: "🎱 Snooker",
              emoji: "🎱",
              predictions: ["Frame Winners", "Correct Frame Score", "Highest Break", "Century Breaks", "Match Results"],
              color: "from-red-600 to-red-700",
            },
            {
              sport: "🏒 Ice Hockey",
              emoji: "🏒",
              predictions: ["Full-Time Results", "Period Winners", "Total Goals", "Goal Scorers", "Puck Line"],
              color: "from-blue-600 to-blue-700",
            },
            {
              sport: "🏀 Basketball",
              emoji: "🏀",
              predictions: ["Match Winners", "Point Spreads", "Over/Under Points", "Quarter Winners", "Player Props"],
              color: "from-orange-500 to-orange-600",
            },
          ].map((sport, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl border border-gold-600/20 bg-gradient-to-br ${sport.color} bg-opacity-10 hover:border-gold-500/40 transition group`}
            >
              <p className="text-3xl mb-3">{sport.emoji}</p>
              <h3 className="text-xl font-bold text-white mb-4">{sport.sport}</h3>
              <ul className="space-y-2">
                {sport.predictions.map((pred, pidx) => (
                  <li key={pidx} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-gold-400 mt-1">✓</span>
                    <span>{pred}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Core Features */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: "AI-Powered Accuracy",
              description: "Machine learning models trained on years of historical data deliver predictions with 85%+ confidence scores",
            },
            {
              icon: TrendingUp,
              title: "Real-Time Updates",
              description: "Live match insights with instant prediction adjustments as games unfold and new data emerges",
            },
            {
              icon: BarChart3,
              title: "Comprehensive Analytics",
              description: "Track prediction accuracy by league, sport, and time with detailed historical analysis",
            },
            {
              icon: Trophy,
              title: "Global League Coverage",
              description: "Top divisions worldwide including Premier League, La Liga, Champions League, NFL, NBA, and more",
            },
            {
              icon: Zap,
              title: "Suggested Bets",
              description: "Data-backed betting recommendations with current odds and probability percentages",
            },
            {
              icon: TrendingUp,
              title: "Continuous Learning",
              description: "Self-improving algorithms that adapt to season trends, team form, and betting market dynamics",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-gold-600/20 bg-slate-900/50 hover:bg-slate-900/70 hover:border-gold-500/40 transition group"
              >
                <Icon className="w-10 h-10 text-gold-400 mb-4 group-hover:scale-110 transition" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Leagues & Tournaments Section */}
      <section id="leagues" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-900/30 rounded-3xl">
        <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-4">
          500+ Leagues & Tournaments
        </h2>
        <p className="text-lg text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          From major international tournaments to regional competitions, SKCS AI covers top divisions across every continent
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { name: "Premier League", emoji: "⚽", country: "England", matches: "1,847", accuracy: "87.3%" },
            { name: "La Liga", emoji: "⚽", country: "Spain", matches: "1,652", accuracy: "85.9%" },
            { name: "Serie A", emoji: "⚽", country: "Italy", matches: "1,523", accuracy: "84.2%" },
            { name: "Bundesliga", emoji: "⚽", country: "Germany", matches: "1,734", accuracy: "86.1%" },
            { name: "Ligue 1", emoji: "⚽", country: "France", matches: "1,456", accuracy: "83.5%" },
            { name: "Champions League", emoji: "⚽", country: "Europe", matches: "821", accuracy: "88.7%" },
            { name: "Six Nations", emoji: "🏈", country: "Europe", matches: "156", accuracy: "84.3%" },
            { name: "NFL", emoji: "🏈", country: "USA", matches: "567", accuracy: "81.2%" },
            { name: "Wimbledon", emoji: "🎾", country: "England", matches: "423", accuracy: "82.9%" },
            { name: "Australian Open", emoji: "🎾", country: "Australia", matches: "512", accuracy: "81.5%" },
            { name: "World Championship", emoji: "🎱", country: "England", matches: "189", accuracy: "85.6%" },
            { name: "NHL", emoji: "🏒", country: "USA", matches: "678", accuracy: "80.4%" },
          ].map((league, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-gold-600/20 bg-slate-800/50 hover:bg-slate-800/80 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-3xl mb-2">{league.emoji}</p>
                  <h3 className="text-lg font-bold text-white">{league.name}</h3>
                  <p className="text-xs text-gray-500">{league.country}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gold-400">{league.accuracy}</p>
                  <p className="text-xs text-gray-400">accuracy</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-gold-300">{league.matches}</span> predictions
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/predictions"
            className="inline-block px-8 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 rounded-lg font-bold transition"
          >
            Explore All Predictions
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-16">
          How SKCS AI Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Data Collection",
              desc: "Aggregates historical match data, player stats, and real-time metrics",
            },
            {
              step: "2",
              title: "AI Analysis",
              desc: "Machine learning models analyze patterns and identify winning indicators",
            },
            {
              step: "3",
              title: "Prediction Engine",
              desc: "Generates probabilities and suggests optimal bets with confidence scores",
            },
            {
              step: "4",
              title: "Real-Time Insights",
              desc: "Updates predictions during matches as new data flows in",
            },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-4 font-bold text-slate-950 text-xl shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
              {idx < 3 && (
                <div className="hidden md:block absolute top-8 -right-3 w-6 h-1 bg-gradient-to-r from-gold-500 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-400">
            Choose the plan that fits your sports prediction needs. All plans include access to all sports and prediction types.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { name: "5 Days", price: "$2.40", features: ["All sports", "Basic predictions", "Email alerts"] },
            { name: "Monthly", price: "$10", features: ["All features", "Accuracy analytics", "Dashboard", "Priority support"], highlighted: true },
            { name: "Annual", price: "$105", features: ["All Monthly +", "Full history", "Advanced analytics", "24/7 support"] },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`relative p-8 rounded-2xl border transition transform hover:scale-105 ${
                plan.highlighted
                  ? "border-gold-500/50 bg-gradient-to-br from-gold-950/40 to-slate-950 ring-2 ring-gold-500/30 shadow-xl shadow-gold-500/20"
                  : "border-gold-600/20 bg-slate-900/50"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 bg-gold-500 text-slate-950 text-xs font-bold rounded-full">BEST VALUE</span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-gold-400 mb-6">{plan.price}</p>
              <ul className="space-y-2 mb-8">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-gold-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-bold transition ${
                plan.highlighted
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950"
                  : "border border-gold-500/40 hover:border-gold-500/70 text-gold-300"
              }`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/premium"
            className="inline-block px-8 py-3 border-2 border-gold-500/40 hover:border-gold-500/70 text-gold-300 hover:text-gold-200 rounded-lg font-bold transition"
          >
            View All Plans & Features
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gold-600 to-gold-700 p-12 sm:p-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950 to-transparent transform -skew-x-12"></div>
          </div>
          <div className="relative text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-950 mb-4">
              Start Making Smarter Predictions Today
            </h2>
            <p className="text-slate-800 text-lg mb-8 max-w-2xl mx-auto font-medium">
              Get instant access to AI-powered predictions across 6 major sports with real-time confidence scores and betting insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sports"
                className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-gold-400 font-bold rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Select Your Sport
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/premium"
                className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg transition backdrop-blur-sm"
              >
                View Premium Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Gambling Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8 rounded-xl border border-amber-500/30 bg-amber-950/20">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-amber-300 mb-2">Responsible Gambling</h3>
              <p className="text-sm text-amber-100 mb-3">
                SKCS AI provides sports predictions and analysis for entertainment and informational purposes only. Sports predictions are not guaranteed and involve risk. Never bet more than you can afford to lose.
              </p>
              <p className="text-sm text-amber-100 mb-3">
                If you or someone you know has a gambling problem, please seek help immediately. In the US, you can contact the National Council on Problem Gambling at 1-800-GAMBLER (1-800-426-2537).
              </p>
              <p className="text-xs text-amber-200">
                We strongly encourage you to gamble responsibly. Set limits, know the risks, and seek help if needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold-700/20 bg-slate-950/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center font-bold text-slate-950">
                  ⚽
                </div>
                <span className="font-bold text-white">SKCS AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Smart sports predictions powered by AI
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Enterprise Number: 2025/918368/07
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/predictions" className="hover:text-gold-400 transition">
                    Predictions
                  </Link>
                </li>
                <li>
                  <Link to="/premium" className="hover:text-gold-400 transition">
                    Premium Plans
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-gold-400 transition">
                    API Docs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-gold-400 transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gold-400 transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gold-400 transition">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal & Safety</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-gold-400 transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gold-400 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gold-400 transition">
                    Responsible Gambling
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gold-700/20 pt-8">
            <p className="text-center text-xs text-gray-500 mb-4">
              © 2025 SKCS AI Sports Prediction PYT (Ltd). All rights reserved. Enterprise Number: 2025/918368/07
            </p>
            <p className="text-center text-xs text-gray-600">
              Predictions are for entertainment purposes. Always gamble responsibly. 18+ only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
