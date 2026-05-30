import Image from "next/image"
import { Header } from "@/components/header"
import { AnimatedText } from "@/components/animated-text"
import { ContactForm } from "@/components/contact-form"
import { DelayedReveal } from "@/components/delayed-reveal"
import { HeroSheetReveal } from "@/components/hero-sheet-reveal"
import { sitePath } from "@/lib/site-path"

const services = [
  {
    title: "Executive & Administrative Support",
    description: "Structured support for daily business operations, communication and execution.",
    tasks: [
      "calendar management",
      "meeting scheduling and coordination",
      "reminders and deadline tracking",
      "incoming task management",
      "email and correspondence coordination",
      "document preparation",
      "spreadsheets, lists, and checklists",
      "digital file and folder organisation",
      "task tracker management",
      "follow-up and execution control",
      "contractor coordination",
      "information sourcing and structuring",
      "preparation of meeting materials",
      "post-meeting follow-ups",
      "organisation of personal and business operations within one structured system",
    ],
  },
  {
    title: "AI-Enhanced Operational Support",
    description: "Practical AI workflows that reduce repetitive work and organise information.",
    tasks: [
      "selecting AI tools based on client needs",
      "prompt template creation",
      "AI-assisted workflows for repetitive tasks",
      "AI-assisted research",
      "concise summaries and briefings",
      "structuring large volumes of information",
      "AI templates for emails, documents, and operational tasks",
      "support with ChatGPT, Claude, and Notion AI",
      "knowledge base creation",
      "workflow organisation using AI tools",
      "identifying opportunities to reduce manual workload",
      "operational guides and instructions for teams or assistants",
      "repeatable workflow systems",
    ],
  },
  {
    title: "Digital Organisation & Tech Support",
    description: "Calm digital systems for files, workspaces, content and project coordination.",
    tasks: [
      "Notion workspace setup and organisation",
      "client databases",
      "task management systems",
      "content calendars",
      "dashboards and operational spreadsheets",
      "Google Drive organisation",
      "digital file structures",
      "website text updates",
      "basic website edits",
      "blog, image, and content uploads",
      "digital administration",
      "online forms setup",
      "simple CRM systems and tracking tables",
      "support for digital projects",
      "coordination with developers, designers, and marketers",
      "website and landing page requirement organisation",
      "oversight of digital project workflows",
    ],
  },
  {
    title: "Strategic Research & Intelligence",
    description: "Structured research, sourcing and analysis for sharper decisions.",
    tasks: [
      "market research",
      "competitor analysis",
      "supplier sourcing",
      "contractor and service provider research",
      "comparison analysis",
      "structured comparison tables",
      "country and city research",
      "travel and relocation research",
      "product sourcing",
      "sourcing venues, specialists, and partners",
      "reputation and review analysis",
      "executive summaries",
      "structured findings and recommendations",
      "fact-checking",
      "AI-assisted and manually verified research workflows",
    ],
  },
  {
    title: "Travel Planning & Coordination",
    description: "Thoughtful travel logistics from research and booking support to live coordination.",
    tasks: [
      "flight research and booking support",
      "hotel and accommodation sourcing",
      "itinerary planning",
      "travel calendars and schedules",
      "transport and transfer coordination",
      "reservation management",
      "travel document checklists",
      "visa and documentation coordination where applicable",
      "restaurant, location, and activity research",
      "family travel planning",
      "business travel planning",
      "travel budget organisation",
      "travel-related research",
      "coordination of changes during trips",
      "operational support before and during travel within agreed scope",
    ],
  },
  {
    title: "Lifestyle & Household Operations",
    description: "Reliable support for family schedules, household admin and everyday tasks.",
    tasks: [
      "appointment scheduling",
      "reservations and bookings",
      "family scheduling",
      "children’s logistics coordination",
      "recurring household task organisation",
      "household administration",
      "sourcing services and providers",
      "contractor coordination",
      "ordering and service management",
      "reminders and personal scheduling",
      "relocation coordination",
      "research for schools, clinics, activities, and local services",
      "Airbnb and property coordination",
      "oversight of household operations",
      "gift coordination",
      "product sourcing and ordering",
      "personal lists, trackers, and checklists",
    ],
  },
  {
    title: "Event & Experience Coordination",
    description: "Detail-led planning and vendor coordination for private and business moments.",
    tasks: [
      "venue research and sourcing",
      "reservations and bookings",
      "comparison analysis",
      "contractor coordination",
      "guest lists and invitations",
      "event schedules and timelines",
      "budget tracking tables",
      "menu, logistics, and timing coordination",
      "corporate dinners",
      "client meetings",
      "team gatherings",
      "private celebrations",
      "retreats",
      "event coordination checklists",
      "communication with vendors and service providers",
      "oversight of operational details before the event",
    ],
  },
  {
    title: "Financial & Executive Administration",
    description: "Clear tracking systems for payments, budgets, expenses and finance coordination.",
    tasks: [
      "personal budgeting",
      "family budget tracking",
      "business expense tracking",
      "payment calendars",
      "invoices and payment coordination",
      "subscription tracking",
      "expense reports",
      "financial spreadsheets",
      "operational cash flow overviews",
      "recurring payment management",
      "preparation of financial documents for accountants",
      "coordination with accountants or finance providers",
      "recurring expense planning",
      "financial reminders",
      "analytical notes and financial tracking summaries",
    ],
  },
  {
    title: "Lifestyle, Property & Household Coordination",
    description: "Property, household and lifestyle logistics managed with practical structure.",
    tasks: [
      "household administration",
      "coordination of household staff",
      "appointment scheduling and bookings",
      "family scheduling",
      "children’s logistics coordination",
      "sourcing household services and vendors",
      "contractor coordination",
      "property-related administration",
      "Airbnb and short-term rental coordination",
      "relocation coordination",
      "service provider communication",
      "reminders and recurring household tasks",
      "organisation of repairs, deliveries, and maintenance appointments",
      "gift coordination and personal errands",
      "personal calendars, trackers, and checklists",
      "lifestyle and household operational support",
    ],
  },
] as const

export default function Home() {
  return (
    <main className="min-h-screen bg-[#ede7dc] text-foreground relative overflow-x-hidden">
      <Header />
      <HeroSheetReveal />

      <div className="layered-reveal-shell">
        {/* Hero Section */}
        <section className="hero-layer-sheet relative flex min-h-screen items-center overflow-hidden bg-[#253131] px-6 pt-20 lg:px-12 lg:pt-24" id="contacts">
          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#253131]">
            <Image
              src={sitePath("/hero-bg.jpg")}
              alt=""
              fill
              className="hero-reveal-image object-cover object-center"
              priority
              quality={90}
            />
            {/* Soft dark overlay for text readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/30 via-black/20 to-black/40" />
            {/* Subtle color blend overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#253131]/30 to-transparent mix-blend-multiply" />
            <div className="hero-reveal-splash absolute inset-0 z-20 bg-[#253131]" />
          </div>

          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left - Hero Text */}
              <div className="relative z-10">
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] mb-8 lg:mb-12">
                  <AnimatedText />
                  <br />
                  <span className="text-muted-foreground">Support</span>
                </h1>

                <p className="text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed mb-8 lg:mb-12">
                  Experience unparalleled personal assistance tailored to your unique lifestyle. 
                  We handle the details so you can focus on what matters most.
                </p>

                <div className="hidden lg:block">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/70">
                    By Elizabeth Klyukhina
                  </p>
                </div>
              </div>

              {/* Right - Contact Form */}
              <div className="relative z-10">
                <DelayedReveal delay={3750} restartOnHash="#contacts">
                  <div className="bg-card/50 backdrop-blur-sm border border-border/30 p-8 lg:p-12">
                    <h2 className="font-serif text-2xl lg:text-3xl font-light mb-2">
                      Get in Touch
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Start your journey to effortless living
                    </p>
                    <ContactForm />
                  </div>
                </DelayedReveal>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-underlayer relative z-10 bg-[#ede7dc] px-6 py-20 text-[#253131] lg:px-12 lg:py-32">
          <div className="container mx-auto">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.82fr)] lg:items-start lg:gap-16 xl:gap-20">
              <div className="max-w-3xl space-y-8">
                <div>
                  <p className="mb-5 text-xs uppercase tracking-[0.28em] text-[#253131]/60">
                    About Us
                  </p>

                  <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
                    Unlocking Your Ultimate Luxury: Time
                  </h2>
                </div>

                <div className="space-y-6 text-base leading-relaxed text-[#253131]/78 lg:text-lg">
                  <p>
                    Hello, I’m Liz, founder of <strong>Clavis Concierge</strong>.
                  </p>

                  <p>
                    We take on the immense mental load of visionaries, executives, and discerning families so you can focus entirely on what truly matters.
                  </p>

                  <p>
                    We transcend traditional assistance to act as your behind-the-scenes operational partner — fusing business acumen with AI-enhanced systems to seamlessly manage your life and enterprise.
                  </p>

                  <a
                    href="#services"
                    className="inline-flex items-center justify-center border border-[#253131] px-6 py-3 text-sm uppercase tracking-[0.18em] text-[#253131] transition-colors hover:bg-[#253131] hover:text-[#ede7dc]"
                  >
                    Discover Our Services
                  </a>
                </div>
              </div>

              <div>
                <img
                  src={sitePath("/about-liz.png")}
                  alt="Liz, founder of Clavis Concierge"
                  className="block aspect-[479/540] w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section id="services" className="relative z-10 bg-[#253131] px-6 py-20 text-[#ede7dc] lg:px-12 lg:py-32">
        <div className="container mx-auto">
          <div className="mb-14 max-w-3xl">
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-[#ede7dc]/60">
              Services
            </p>

            <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
              How We Support You
            </h2>

            <p className="mt-6 text-base leading-relaxed text-[#ede7dc]/75 lg:text-lg">
              Delegate with absolute confidence across our specialised areas.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                tabIndex={0}
                className="group relative min-h-[19rem] overflow-hidden border border-[#ede7dc]/15 p-6 outline-none transition-colors duration-300 hover:border-[#ede7dc]/45 focus-visible:border-[#ede7dc]/60 focus-visible:ring-2 focus-visible:ring-[#ede7dc]/25"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <h3 className="mb-4 font-serif text-2xl font-light leading-tight text-[#ede7dc]">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#ede7dc]/70 lg:text-base">
                      {service.description}
                    </p>
                  </div>

                  <p className="mt-10 text-xs uppercase tracking-[0.18em] text-[#ede7dc]/40">
                    What’s included
                  </p>
                </div>

                <div className="absolute inset-0 flex translate-y-full flex-col bg-[#253131] p-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <h3 className="font-serif text-xl font-light leading-tight text-[#ede7dc]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#ede7dc]/45">
                    What’s included
                  </p>

                  <ul className="mt-5 min-h-0 flex-1 space-y-2 overflow-y-auto pr-2 text-sm leading-relaxed text-[#ede7dc]/78">
                    {service.tasks.map((task) => (
                      <li key={task} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#ede7dc]/50" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#ede7dc] px-6 py-6 text-[#253131]/65 lg:px-12 lg:py-8">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p className="lg:hidden text-xs tracking-[0.2em] uppercase">
              By Elizabeth Klyukhina
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-[#253131] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#253131] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
