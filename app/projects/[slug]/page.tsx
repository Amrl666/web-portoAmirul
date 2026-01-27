import Navbar from "@/components/shared/navbar";
import React from "react";
import { getOtherProjects, getProject } from "@/sanity/lib/queries";
import { fetcher } from "@/sanity/lib/client";
import { Project } from "@/sanity/lib/types/project";
import { PortableText } from "@portabletext/react";
import { Badge } from "@/components/ui/badge";
import ProjectStack from "@/components/projects/project-stack";
import ImageSwiper from "@/components/projects/image-swiper";
import ProjectCard from "@/components/projects/project-card";
import { notFound } from "next/navigation";
import Footer from "@/components/shared/footer";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const revalidate = 1; // revalidate at most every hour

interface Props {
  params: { slug: string } | Promise<{ slug: string }>;
}

async function Projects({ params }: Props) {
  const { slug } = await Promise.resolve(params);
  if (!slug) {
    return notFound();
  }

  const project: Project | null = await fetcher(getProject, { slug });
  if (!project) {
    return notFound();
  }

  const otherProjects: Project[] = await fetcher(getOtherProjects, { slug });

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="w-full h-full pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-card text-foreground shadow-xl rounded-xl mt-10 p-5 sm:p-6 gap-5 border border-border relative">
          <Badge variant="secondary">{project?.company}</Badge>
          <h2 className="font-semibold text-foreground text-4xl my-2">
            {project?.title}
          </h2>
          {project.stack && <ProjectStack stack={project?.stack} />}
          <p className="mt-5 mb-5 text-lg text-muted-foreground">
            {project?.description}
          </p>
          {project.gallery && <ImageSwiper images={project?.gallery} />}

          <div className="prose prose-lg md:prose-xl mt-10 text-foreground">
            <PortableText value={project?.body} />
          </div>

          {project.url && (
            <div className="mt-8 flex justify-end">
              <Link
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "px-6 py-3 text-base"
                )}
              >
                Visit Project
              </Link>
            </div>
          )}
        </div>
        <div className="max-w-6xl mx-auto bg-card text-foreground shadow-xl rounded-xl mt-10 p-5 sm:p-6 border border-border">
          <h1 className="text-3xl mr-2 mt-1.5 font-semibold">Other Projects</h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-rows-auto gap-5 mt-8">
            {otherProjects &&
              otherProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Projects;
