import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">About Zakariyo</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        {/* First Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div
            {...fadeInUp}
            className="order-2 lg:order-1"
          >
            <img
              src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Programming Setup"
              className="w-full h-auto grayscale"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              SCHOOL 21 - PEER-TO-PEER EDUCATION
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="order-1 lg:order-2 flex items-center"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              I am Zakariyo Qarshiyev, also known as Geromari online. Currently a 2nd-year Lyceum student and an active participant in the School 21 education ecosystem. My passion lies in software engineering, spanning Full-Stack development, system programming, Telegram bots, and integrating AI into real-world applications.
            </p>
          </motion.div>
        </div>

        {/* Quote Block */}
        <motion.div
          {...fadeInUp}
          className="mb-24 lg:mb-32"
        >
          <h2 className="font-display text-[8vw] lg:text-section leading-none tracking-tight text-gray-300">
            "BUILDING THE FUTURE<br />
            <span className="text-white underline underline-offset-8">OF AI STARTUPS</span><br />
            AND HIGH-PERFORMANCE<br />
            SYSTEMS."
          </h2>
          <p className="mt-6 text-sm text-gray-500 tracking-widest uppercase">
            SOFTWARE ENGINEERING<br />
            & AI INTEGRATION
          </p>
        </motion.div>

        {/* Second Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div
            {...fadeInUp}
            className="flex items-center lg:text-right"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              Through platforms like Kwork, I've developed scalable, asynchronous Telegram bots and worked extensively with Python and C. I also have deep experience using Arch Linux and tiling window managers, reflecting my dedication to system-level understanding and optimization.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <img
              src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Coding on Multiple Screens"
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              FREELANCE DEVELOPMENT
            </p>
          </motion.div>
        </div>

        {/* Third Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
          <motion.div {...fadeInUp}>
            <img
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Team Collaboration"
              className="w-full h-auto grayscale"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              TEAM LEADER & VOLUNTEER
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="flex items-center"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              Beyond writing code, I lead teams in intensive education programs and collaborate on peer-to-peer systems. I'm currently working on eDoska (USTASY), an AI-driven startup that aims to synchronize school schedules and auto-generate presentations via Telegram Mini Apps. My goal is to build tools that solve genuine problems.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
