import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { MessageSquare, Mail, Clock, Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact SocialQX — Support & Inquiries | SocialQX",
  description: "Get in touch with the SocialQX team. Live chat, email support, and dispute resolution available.",
  alternates: { canonical: "https://socialqx.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16 w-full flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Get in Touch</h1>
          <p className="text-slate-500 text-lg">We typically respond within 4 business hours.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            {[
              { icon: <MessageSquare className="h-5 w-5 text-indigo-600" />, title: "Live Chat", desc: "Available Mon–Fri, 9am–6pm EST.", bg: "bg-indigo-50", action: "Start Chat" },
              { icon: <Mail className="h-5 w-5 text-slate-600" />, title: "Email Support", desc: "support@socialqx.com — 4h response.", bg: "bg-slate-50", action: "Send Email" },
              { icon: <Twitter className="h-5 w-5 text-blue-500" />, title: "Twitter / X", desc: "DM @SocialQX for quick questions.", bg: "bg-blue-50", action: "Open X" },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>{c.icon}</div>
                <h3 className="font-bold text-slate-900 mb-1">{c.title}</h3>
                <p className="text-sm text-slate-500 mb-3">{c.desc}</p>
                <Button variant="secondary" size="sm">{c.action}</Button>
              </div>
            ))}
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 flex gap-3">
              <Clock className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-amber-900">Response times</div>
                <div className="text-xs text-amber-700 mt-1 space-y-0.5">
                  <div>Disputes: &lt; 2 hours</div>
                  <div>Technical: &lt; 4 hours</div>
                  <div>General: &lt; 1 business day</div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
