import { ContactForm } from '@/components/contact-form';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-900 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-zinc-100 mb-8">Contact Us</h1>
        <p className="text-center text-zinc-400 mb-8 max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <div className="max-w-md mx-auto bg-zinc-800 rounded-lg p-6">
          <ContactForm />
        </div>
      </div>
    </main>
  );
} 