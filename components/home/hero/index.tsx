"use client";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Badge, badgeVariants } from "../../ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../../ui/button";
import { UserInfo } from "@/sanity/lib/types/userInfo";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { FloatingAstronaut } from "../../ui/floating-astronaut";
import { CosmicDot } from "../../ui/cosmic-border";

interface Props {
	userInfo: UserInfo;
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8 },
	},
};

export default function Hero({ userInfo }: Props) {
	const [imgError, setImgError] = useState(false);

	return (
		<div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 md:pt-32 pb-16">
			<div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-x-5">
				<motion.div 
					className="md:order-1 order-2"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.div 
						className="flex justify-start items-center gap-4"
						variants={itemVariants}
					>
						<Badge className={cn(badgeVariants({ variant: "default" }))}>
							{userInfo && userInfo.title}
						</Badge>
						<div className="flex justify-start gap-2">
							{userInfo.githubUrl && (
								<motion.div
									whileHover={{ scale: 1.2, rotate: 5 }}
									whileTap={{ scale: 0.95 }}
									transition={{ type: "spring", stiffness: 400, damping: 10 }}
								>
									<Link target="_blank" href={userInfo.githubUrl}>
										<Github size={25} />
									</Link>
								</motion.div>
							)}
							{userInfo.linkedInUrl && (
								<motion.div
									whileHover={{ scale: 1.2, rotate: -5 }}
									whileTap={{ scale: 0.95 }}
									transition={{ type: "spring", stiffness: 400, damping: 10 }}
								>
									<Link target="_blank" href={userInfo.linkedInUrl}>
										<Linkedin size={25} />
									</Link>
								</motion.div>
							)}
						</div>
					</motion.div>

					<motion.p 
						className="text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tighter mt-4"
						variants={itemVariants}
					>
						{userInfo && `${userInfo?.name} ${userInfo?.surname}`}
					</motion.p>

					<motion.p 
						className="text-muted-foreground mt-5"
						variants={itemVariants}
					>
						{userInfo && userInfo.summary}
					</motion.p>

					<motion.div 
						className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 mt-10"
						variants={itemVariants}
					>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
						>
							<Link
								href="/projects"
								className={cn(
									buttonVariants({ variant: "default" }),
									"flex justify-center items-center shadow-lg hover:shadow-xl"
								)}
							>
								See Projects <ArrowRight className="ml-1" size={15} />
							</Link>
						</motion.div>
						{userInfo?.cv?.url && (
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								transition={{ type: "spring", stiffness: 400, damping: 10 }}
							>
								<Link
									href={userInfo.cv.url}
									target="_blank"
									className={cn(
										buttonVariants({ variant: "secondary" }),
										"flex justify-center items-center"
									)}
								>
									Download CV
								</Link>
							</motion.div>
						)}
					</motion.div>
				</motion.div>

				<motion.div 
					className="hidden md:flex md:order-2 order-1 pb-10 md:pb-0 justify-center sm:justify-start md:justify-end relative"
					initial={{ opacity: 0, scale: 0.95, rotateY: -20 }}
					animate={{ opacity: 1, scale: 1, rotateY: 0 }}
					transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
				>
					{/* Cosmic decorations */}
					<div className="absolute -top-10 -right-10 hidden lg:block">
						<FloatingAstronaut size={60} emoji="👽" />
					</div>
					<div className="absolute top-20 -left-5 hidden lg:block">
						<CosmicDot color="cyan" animated />
					</div>
					<div className="absolute -bottom-5 right-10 hidden lg:block">
						<CosmicDot color="purple" animated />
					</div>

					{!imgError ? (
						<div className="relative">
							<Image
								src="/potooooo.png"
								alt="Hero Photo"
								className="rounded-xl w-full max-w-[400px] h-auto sm:w-auto shadow-lg"
								width={400}
								height={400}
								priority
								onError={() => setImgError(true)}
							/>
							{/* Glow effect */}
							<motion.div
								className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-2xl -z-10"
								animate={{ opacity: [0.3, 0.6, 0.3] }}
								transition={{ duration: 3, repeat: Infinity }}
							/>
						</div>
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
				</motion.div>
			</div>
		</div>
	);
}
