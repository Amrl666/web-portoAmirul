"use client";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Badge, badgeVariants } from "../../ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../../ui/button";
import { UserInfo } from "@/sanity/lib/types/userInfo";
import Image from "next/image";
import { useState } from "react";

interface Props {
	userInfo: UserInfo;
}

export default function Hero({ userInfo }: Props) {
	const [imgError, setImgError] = useState(false);

	return (
		<div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 md:pt-32 pb-16">
			<div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-x-5">
				<div className="md:order-1 order-2">
					<div className="flex justify-start items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
						<Badge className={cn(badgeVariants({ variant: "default" }))}>
							{userInfo && userInfo.title}
						</Badge>
						<div className="flex justify-start gap-2">
							{userInfo.githubUrl && (
								<Link target="_blank" href={userInfo.githubUrl}>
									<Github size={25} />
								</Link>
							)}
							{userInfo.linkedInUrl && (
								<Link target="_blank" href={userInfo.linkedInUrl}>
									<Linkedin size={25} />
								</Link>
							)}
						</div>
					</div>

					<p className="text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tighter mt-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100 fill-mode-both">
						{userInfo && `${userInfo?.name} ${userInfo?.surname}`}
					</p>

					<p className="text-muted-foreground mt-5 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 fill-mode-both">
						{userInfo && userInfo.summary}
					</p>

					<div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 mt-10 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300 fill-mode-both">
						<Link
							href="/projects"
							className={cn(
								buttonVariants({ variant: "default" }),
								"flex justify-center items-center transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
							)}
						>
							See Projects <ArrowRight className="ml-1" size={15} />
						</Link>
						{userInfo?.cv?.url && (
							<Link
								href={userInfo.cv.url}
								target="_blank"
								className={cn(
									buttonVariants({ variant: "secondary" }),
									"flex justify-center items-center transition-all hover:scale-105 active:scale-95"
								)}
							>
								Download CV
							</Link>
						)}
					</div>
				</div>

				<div className="hidden md:flex md:order-2 order-1 pb-10 md:pb-0 justify-center sm:justify-start md:justify-end animate-in fade-in zoom-in-95 duration-1000 delay-200 fill-mode-both">
					{!imgError ? (
						<Image
							src="/potooooo.png"
							alt="Hero Photo"
							className="rounded-xl w-full max-w-[400px] h-auto sm:w-auto"
							width={400}
							height={400}
							priority
							onError={() => setImgError(true)}
						/>
					) : (
						<div className="rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/80 w-full max-w-[400px] sm:w-auto">
							<div className="w-full aspect-square max-w-[400px] flex items-center justify-center">
								<div className="text-center">
									<div className="text-6xl mb-4"></div>
									<p className="text-muted-foreground">Hero Image</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
