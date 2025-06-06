import { ContactForm } from "@/components/contact-form"

export const metadata = {
  title: "Contact Us | Working Tuner",
  description:
    "Contact the Working Tuner team with questions, feedback, or suggestions. We'd love to hear from you!",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-zinc-900">
      <div className="max-w-2xl w-full py-12">
        <header>
          <h1 className="text-4xl font-bold text-center mb-8 text-zinc-100">Contact Us</h1>
        </header>
        
        <section className="space-y-6 text-zinc-300">
          <p className="text-center">
            Have questions, feedback, or suggestions about Working Tuner? We&apos;d love to hear from you! Fill out the form
            below and we&apos;ll get back to you as soon as possible.
          </p>
          
          <div className="mt-8">
            <ContactForm />
          </div>
        </section>
      </div>
      
      <footer className="mt-12 pt-6 border-t border-zinc-800 w-full">
        <p className="text-center text-zinc-500 text-sm">
          © {new Date().getFullYear()} SpudPug Development. All rights reserved.
        </p>
      </footer>
    </main>
  )
}