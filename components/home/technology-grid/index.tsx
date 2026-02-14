"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { Technology } from "@/sanity/lib/types/technology";
import { motion, AnimatePresence } from "framer-motion";

const builder = imageUrlBuilder(client);
const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+Tm8gaW1hZ2U8L3RleHQ+PC9zdmc+";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

interface Props {
  technologies: Technology[];
}

export default function TechnologyGrid({ technologies }: Props) {
  const [selected, setSelected] = useState<Technology | null>(null);

  return (
    <section className="mt-16">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          className="text-foreground leading-snug text-2xl sm:text-3xl md:text-4xl text-center underline mb-6 font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tech Stack
        </motion.h2>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {technologies.map((t) => (
            <motion.div
              key={t._id}
              variants={itemVariants}
            >
              <Card
                className="bg-card border border-border hover:border-primary/60 transition-colors cursor-pointer h-full"
                onClick={() => setSelected(t)}
              >
              <CardContent className="flex flex-col items-center justify-center gap-3 py-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg bg-background border border-border">
                  <Image
                    className="object-contain"
                    src={
                      t.image
                        ? builder.image(t.image).width(150).format("png").url()
                        : FALLBACK_IMAGE
                    }
                    alt={t?.image?.alt || `${t.title} logo`}
                    width={80}
                    height={80}
                  />
                </div>
                <CardTitle className="text-center text-sm sm:text-base font-semibold text-foreground">
                  {t.title}
                </CardTitle>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div 
            className="relative max-w-lg w-full bg-card border border-border rounded-xl shadow-2xl p-6"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              ×
            </button>
            <motion.div 
              className="flex gap-4 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 flex items-center justify-center border border-border rounded-lg bg-background">
                <Image
                  className="object-contain"
                  src={
                    selected.image
                      ? builder.image(selected.image).width(150).format("png").url()
                      : FALLBACK_IMAGE
                  }
                  alt={selected?.image?.alt || `${selected.title} logo`}
                  width={96}
                  height={96}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{selected.title}</h3>
              </div>
            </motion.div>
            <motion.p 
              className="text-muted-foreground mt-4 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {selected.description}
            </motion.p>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
