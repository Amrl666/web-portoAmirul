"use client";
import React from "react";
import useSWR from "swr";
import { getProjects } from "@/sanity/lib/queries";
import { fetcher } from "@/sanity/lib/client";
import { Project } from "@/sanity/lib/types/project";
import ProjectCard from "@/components/projects/project-card";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

function Projects() {
  const { data: projects } = useSWR<Project[]>(getProjects, fetcher);
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="w-full h-full pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-card/50 backdrop-blur-sm border border-border shadow-xl rounded-xl mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-rows-auto p-4 sm:p-5 gap-4 sm:gap-5">
          {projects &&
            projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Projects;
