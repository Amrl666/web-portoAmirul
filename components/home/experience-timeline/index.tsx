import React from "react";
import { Experience } from "@/sanity/lib/types/experience";
import { formatMMYY } from "@/lib/utils";
import { motion } from "framer-motion";
import { CosmicDot } from "@/components/ui/cosmic-border";

interface Props {
  experience: Experience[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

function ExperienceTimeline({ experience }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
      <motion.h2 
        className="text-foreground leading-snug text-2xl sm:text-3xl md:text-4xl text-center underline mb-5 font-semibold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Experience
      </motion.h2>
      <motion.ol 
        className="relative border-s border-border"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {experience.map((exp, idx) => (
          <motion.li
            key={exp._id || `experience-${idx}`}
            className={`${idx === experience.length - 1 ? "" : "mb-10"} ms-4 group`}
            variants={itemVariants}
          >
            {/* Cosmic timeline marker */}
            <motion.div 
              className="absolute w-6 h-6 bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 rounded-full -start-[15px] border-4 border-background cursor-pointer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.3, boxShadow: "0 0 20px rgba(34, 211, 238, 0.6)" }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              {/* Pulsing core */}
              <motion.div 
                className="absolute inset-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Glow line to next */}
            {idx < experience.length - 1 && (
              <motion.div 
                className="absolute w-0.5 h-10 bg-gradient-to-b from-cyan-500/60 to-transparent -start-[6.3px] top-8"
                initial={{ height: 0 }}
                animate={{ height: 40 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            )}

            <motion.time 
              className="mb-1 text-sm font-normal leading-none text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {formatMMYY(exp.startDate)}
            </motion.time>
            <motion.h3 
              className="text-lg font-semibold text-foreground group-hover:text-cyan-400 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {`${exp.position} at ${exp.company}, ${exp.location}`}
            </motion.h3>
            <motion.p 
              className="mb-4 text-base font-normal text-muted-foreground group-hover:text-foreground/80 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {exp.summary}
            </motion.p>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}

export default ExperienceTimeline;
