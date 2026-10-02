import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Founder & Full-Stack Developer',
    company: 'eDoska (USTASY) Startup',
    location: 'Remote',
    period: 'Present',
    description: 'Developing an AI-driven startup for the education system. Building Telegram Mini Apps to synchronize school schedules and automatically generate presentations. Focused on solving real-world educational challenges through AI.',
    skills: ['Next.js', 'Telegram Mini Apps', 'AI Integration', 'Startup Leadership', 'Full-Stack'],
  },
  {
    title: 'Freelance Python & Bot Developer',
    company: 'Kwork Platform',
    location: 'Remote',
    period: '2023 — Present',
    description: 'Creating custom, highly asynchronous Telegram bots for various clients. Projects range from attendance monitoring systems to voice message processing bots. Consistently delivering optimized and reliable solutions.',
    skills: ['Python', 'aiogram', 'Asynchronous Programming', 'Client Relations', 'API Development'],
  },
  {
    title: 'Team Leader (Volunteer)',
    company: 'Intensive Education Programs',
    location: 'Uzbekistan',
    period: '2023 — Present',
    description: 'Leading and coordinating volunteer teams in intensive educational settings. Facilitating peer-to-peer learning, managing tasks, and helping students grasp complex programming concepts.',
    skills: ['Team Leadership', 'Mentoring', 'Task Management', 'Communication', 'C Programming'],
  },
  {
    title: 'System Programmer & Developer',
    company: 'School 21 Ecosystem',
    location: 'Tashkent, Uzbekistan',
    period: '2023 — Present',
    description: 'Developing terminal applications and games (like Pong and Conway\'s Game of Life) using C and ncurses. Engaging in rigorous peer-to-peer code reviews and building security analysis scripts.',
    skills: ['C', 'ncurses', 'Linux', 'Security Analysis', 'Peer Review'],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 1, ease: 'easeOut' }
}

export function Work() {
  return (
    <section id="work" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Career</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          WORK<br />EXPERIENCE
        </motion.h2>

        {/* Experiences */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.company + exp.period}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
              className="border-t border-gray-800 py-8 md:py-12 lg:py-16 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Left Column - Title & Company */}
                <div className="lg:col-span-5">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-base lg:text-lg text-gray-400">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {exp.location}
                  </p>
                </div>

                {/* Middle Column - Period */}
                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-500 tracking-widest uppercase">
                    {exp.period}
                  </p>
                </div>

                {/* Right Column - Description & Skills */}
                <div className="lg:col-span-5">
                  <p className="text-gray-400 leading-relaxed mb-6 text-sm lg:text-base">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs text-gray-500 border border-gray-800 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>
  )
}
