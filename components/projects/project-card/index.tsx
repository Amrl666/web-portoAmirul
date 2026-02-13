"use client";
import { Project } from "@/sanity/lib/types/project";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  project: Project;
}

const builder = imageUrlBuilder(client);
const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCI+Tm8gaW1hZ2U8L3RleHQ+PC9zdmc+";

function ProjectCard({ project }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const imageSrc = project.image
    ? builder.image(project.image).url()
    : FALLBACK_IMAGE;
  const altText = project.image?.alt || project.title || "Project image";

  return (
    <Card
      key={project._id}
      className="bg-card/50 backdrop-blur-sm h-full transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:border-primary/50 group overflow-hidden border-muted"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tight">
          <Link href={project.url} target="_blank" className="hover:text-primary transition-colors flex items-center gap-2">
            {project.title}
          </Link>
        </CardTitle>
        <CardDescription>{project.company}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-md border border-muted relative aspect-video">
        {isHovering && project.gif ? (
          <Image
            src={builder.image(project.gif).url()}
            className="rounded-md max-w-full"
            alt="project preview"
            width={200}
            height={200}
            unoptimized={true}
            layout={"responsive"}
          />
        ) : (
          <Image
            src={imageSrc}
            className="rounded-md max-w-full"
            alt={altText}
            width={400}
            height={200}
          />
        )}
      </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3">
        <CardDescription>{project.description}</CardDescription>
          <Link
            href={`/projects/${project?.slug.current}`}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Read More
          </Link>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
