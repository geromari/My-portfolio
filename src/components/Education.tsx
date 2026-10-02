import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Education() {
  return (
    <section id="education" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Background</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          EDUCATION
        </motion.h2>

        {/* Education Items */}
        <div className="space-y-16 lg:space-y-24">
          {/* Lyceum */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            <motion.div {...fadeInUp}>
              <img
                src="https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Lyceum"
                className="w-full h-auto grayscale"
              />
              <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                ACADEMIC LYCEUM / UZBEKISTAN
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="flex items-center"
            >
              <div>
                <h3 className="text-xl lg:text-2xl font-light text-white mb-4">
                  High School Student (2nd Year)
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Focusing on exact sciences and foundational academic studies. Balancing traditional education with an intensive deep dive into software engineering and AI technologies.
                </p>
                <p className="text-sm text-gray-500">Present</p>
              </div>
            </motion.div>
          </div>

          {/* School 21 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            <motion.div
              {...fadeInUp}
              className="flex items-center lg:order-2"
            >
              <div>
                <h3 className="text-xl lg:text-2xl font-light text-white mb-4">
                  Software Engineering Track
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Participating in a rigorous peer-to-peer programming curriculum. Tackling complex C programming projects, terminal applications, algorithms, and collaborating closely with peers in a project-based environment.
                </p>
                <p className="text-sm text-gray-500">2023 — Present</p>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="lg:order-1"
            >
              <img
                src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="School 21 Education"
                className="w-full h-auto grayscale"
              />
              <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                SCHOOL 21 - PEER-TO-PEER EDUCATION
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
