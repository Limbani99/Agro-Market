import React from "react";
import { HelpCircle, Mail, Phone, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

export default function HelpSupport() {
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    toast.success("Help request logged! A representative will connect soon.");
    e.target.reset();
  };

  const faqs = [
    { q: "How do I withdraw farm earnings?", a: "Go to your dashboard tab and click 'Withdraw funds' underneath your Total Earnings balance. Withdrawals are processed within 1-3 business days directly to your registered bank account." },
    { q: "How do low stock notifications work?", a: "If any of your listed items have 5 or less units in stock, our system tags them as 'Low Stock' and fires an warning bubble in your dashboard alert bar so you can plan your next harvest." },
    { q: "What fees are charged on sales?", a: "Terra Agro retains a 20% commission on transactions to cover marketing, secure cash-free payments processing, and logistics. 80% represents your direct earnings." }
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
      <div>
        <h2 className="font-serif text-2xl font-bold text-slate-800">Seller Help & Support</h2>
        <p className="text-slate-500 text-[13.5px] mt-0.5">Access FAQs or message our farm support team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FAQs */}
        <div className="flex flex-col gap-5">
          <h3 className="font-serif text-[17px] font-bold text-slate-800 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span>Frequently Asked Questions</span>
          </h3>

          <div className="flex flex-col gap-4">
            {faqs.map((f, i) => (
              <div key={i} className="card bg-white p-5">
                <h4 className="font-bold text-slate-800 text-[14px]">{f.q}</h4>
                <p className="text-slate-500 text-[13px] mt-2 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form / support lines */}
        <div className="flex flex-col gap-6">
          <div className="card bg-white p-6">
            <h3 className="font-serif text-[17px] font-bold text-slate-800 mb-4">Direct Message Support</h3>
            <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-bold text-slate-600 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yield shipping issue"
                  className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 bg-white"
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-600 mb-2">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you need help with..."
                  className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 bg-white leading-relaxed"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Support Message
              </button>
            </form>
          </div>

          {/* Quick contact numbers */}
          <div className="card bg-[#ECE8DD]/40 border border-[#E2DFD3] p-5 flex flex-col gap-4">
            <h4 className="font-bold text-slate-800 text-[14px]">Urgent Hotlines</h4>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3 text-slate-600 text-[13px] font-medium">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (800) 555-AGRO (Mon-Fri 8am-6pm PST)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-[13px] font-medium">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@terraagro.org</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
