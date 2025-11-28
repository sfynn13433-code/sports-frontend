import { Link } from "react-router-dom";
import { Check, Home, AlertCircle } from "lucide-react";

export default function Premium() {
  const plans = [
    {
      id: "5day",
      name: "5 Days Trial",
      price: "$2.40",
      period: "5 days",
      color: "border-gray-600/30 bg-slate-900/30",
      badge: null,
      features: [
        "Access to all sports predictions",
        "Basic prediction accuracy stats",
        "Email match notifications",
        "Limited to 5 days",
      ],
      recommended: false,
    },
    {
      id: "7day",
      name: "Weekly Pass",
      price: "$3.30",
      period: "7 days",
      color: "border-blue-500/30 bg-blue-950/20",
      badge: "POPULAR",
      features: [
        "Access to all sports predictions",
        "Real-time confidence scores",
        "Advanced filtering by prediction type",
        "Email & push notifications",
        "Full match history",
      ],
      recommended: false,
    },
    {
      id: "30day",
      name: "Monthly",
      price: "$10",
      period: "30 days",
      color: "border-gold-500/30 bg-gold-950/20",
      badge: "BEST VALUE",
      features: [
        "All Weekly features",
        "Prediction accuracy analytics",
        "Customizable dashboard",
        "30-day historical data",
        "Priority support",
        "CSV export of predictions",
      ],
      recommended: true,
    },
    {
      id: "6month",
      name: "6 Months",
      price: "$55",
      period: "6 months",
      color: "border-green-500/30 bg-green-950/20",
      badge: null,
      features: [
        "All Monthly features",
        "6-month prediction history",
        "Advanced AI insights",
        "League-specific accuracy reports",
        "Custom alerts & filters",
        "Dedicated account manager",
      ],
      recommended: false,
    },
    {
      id: "12month",
      name: "Annual",
      price: "$105",
      period: "12 months",
      color: "border-purple-500/30 bg-purple-950/20",
      badge: "SAVE 17%",
      features: [
        "All 6-Month features",
        "Full year prediction history",
        "Unlimited historical data access",
        "Advanced multi-league analytics",
        "Early access to new sports",
        "Premium email support (24/7)",
        "Annual accuracy report",
      ],
      recommended: false,
    },
    {
      id: "lifetime",
      name: "Early Supporter Lifetime",
      price: "$199",
      period: "Lifetime",
      color: "border-gold-700/50 bg-gradient-to-br from-gold-950/40 to-gold-900/20",
      badge: "LIMITED TIME",
      features: [
        "All features forever",
        "Unlimited prediction history",
        "Priority feature requests",
        "Lifetime 24/7 premium support",
        "VIP community access",
        "Quarterly deep-dive analytics reports",
        "Early beta access to new sports",
        "Name on supporter wall",
      ],
      recommended: false,
    },
  ];

  const comparisonFeatures = [
    { name: "All Sports Predictions", id: "all-sports" },
    { name: "Prediction Accuracy Stats", id: "accuracy" },
    { name: "Real-Time Confidence Scores", id: "confidence" },
    { name: "Email Notifications", id: "email-notif" },
    { name: "Push Notifications", id: "push-notif" },
    { name: "Advanced Filtering", id: "filtering" },
    { name: "Customizable Dashboard", id: "dashboard" },
    { name: "Historical Data Access", id: "history" },
    { name: "CSV Export", id: "export" },
    { name: "Priority Support", id: "support" },
  ];

  const planFeatures: Record<string, boolean[]> = {
    "5day": [true, false, false, true, false, false, false, false, false, false],
    "7day": [true, false, true, true, true, true, false, true, false, false],
    "30day": [true, true, true, true, true, true, true, true, true, true],
    "6month": [true, true, true, true, true, true, true, true, true, true],
    "12month": [true, true, true, true, true, true, true, true, true, true],
    lifetime: [true, true, true, true, true, true, true, true, true, true],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-gold-700/30 backdrop-blur-sm bg-slate-950/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center font-bold text-slate-950">
              ⚽
            </div>
            <div>
              <p className="text-xs text-gold-300 font-semibold">SKCS AI</p>
              <p className="text-sm font-bold text-white">Sports Predictions</p>
            </div>
          </Link>
          <Link to="/" className="text-gray-300 hover:text-gold-400 transition flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Back to Home</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
            Premium Plans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your sports prediction needs. All plans include access to our AI-powered forecasts across football, rugby, tennis, snooker, ice hockey, and basketball.
          </p>
        </div>

        {/* Responsible Gambling Warning */}
        <div className="mb-12 max-w-3xl mx-auto p-4 rounded-lg border border-orange-500/30 bg-orange-950/20 flex gap-3">
          <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-orange-300 mb-1">Responsible Gambling Notice</p>
            <p className="text-xs text-orange-200">
              Sports predictions are for entertainment and informational purposes only. Betting involves risk. Never bet more than you can afford to lose. If you have a gambling problem, please contact the National Problem Gambling Helpline (1-800-GAMBLER).
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-8 rounded-2xl border transition transform hover:scale-105 ${
                plan.recommended
                  ? `${plan.color} ring-2 ring-gold-500/50 shadow-xl shadow-gold-500/20`
                  : plan.color
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 text-xs font-bold rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold text-gold-400 mb-1">{plan.price}</p>
                <p className="text-sm text-gray-400">for {plan.period}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-bold transition ${
                  plan.recommended
                    ? "bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950"
                    : "border-2 border-gold-500/40 hover:border-gold-500/70 text-gold-300 hover:text-gold-200 bg-transparent"
                }`}
              >
                Choose Plan
              </button>

              {plan.id === "lifetime" && (
                <p className="text-xs text-gold-300 text-center mt-3 font-semibold">
                  Limited-time offer - Early Supporters only
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Detailed Feature Comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gold-600/20 bg-slate-900/50">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold-600/20 bg-slate-900/80">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Feature</th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`px-6 py-4 text-center text-sm font-bold whitespace-nowrap ${
                        plan.recommended ? "text-gold-400" : "text-gray-300"
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr key={feature.id} className="border-b border-gold-600/10 hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4 text-sm text-gray-300 font-medium">{feature.name}</td>
                    {plans.map((plan, pidx) => (
                      <td key={plan.id} className="px-6 py-4 text-center">
                        {planFeatures[plan.id]?.[idx] ? (
                          <Check className="w-5 h-5 text-gold-400 mx-auto" />
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes! You can cancel your subscription at any time through your account settings. No questions asked.",
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 7-day money-back guarantee if you're not satisfied with our predictions. Contact support for more details.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept credit cards (Visa, Mastercard, Amex), PayPal, and cryptocurrency options for global accessibility.",
              },
              {
                q: "Are predictions guaranteed to be accurate?",
                a: "No predictions are 100% guaranteed. Our AI models achieve high accuracy rates, but sports are unpredictable. Always bet responsibly.",
              },
              {
                q: "Can I upgrade or downgrade my plan?",
                a: "Absolutely! You can change your plan anytime. We'll prorate any charges or credits based on your usage.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-gold-600/20 bg-slate-900/50 hover:bg-slate-900/70 transition"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center p-12 rounded-2xl border border-gold-600/30 bg-gradient-to-r from-gold-950/30 to-slate-950/50">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of sports enthusiasts making smarter predictions with SKCS AI. All plans include a 7-day free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/predictions"
              className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 rounded-lg font-bold transition transform hover:scale-105"
            >
              Explore Free Predictions
            </Link>
            <Link
              to="/"
              className="px-8 py-4 border-2 border-gold-500/40 hover:border-gold-500/70 text-gold-300 hover:text-gold-200 rounded-lg font-bold transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
