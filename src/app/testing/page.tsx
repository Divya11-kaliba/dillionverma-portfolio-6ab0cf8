"use client";  // <-- Add this at the top of your file

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { Marquee } from "@/components/magicui/marquee";
import { MagicCard } from "@/components/magicui/magic-card";
import { BorderBeam } from "@/components/magicui/border-beam";

const BLUR_FADE_DELAY = 0.4;


export default function Page() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const cardHeight = 350; // Adjust based on actual card size
  const cardSpacing = 20;
  const totalCardHeight = cardHeight + cardSpacing;
  const projectCount = DATA.projects.length;

  // ✅ Correctly defining motion values
  const translateYValues = DATA.projects.map((_, i) =>
    useTransform(scrollYProgress, [0.5 * i, 0.5 * (i + 1)], [totalCardHeight * i, 0])
  );

  const scaleValues = DATA.projects.map((_, i) =>
    useTransform(scrollYProgress, [0.5 * i, 0.5 * (i + 1)], [1, 0.97])
  );

  const opacityValues = DATA.projects.map((_, i) =>
    useTransform(scrollYProgress, [0.5 * i - 0.1, 0.5 * (i + 1)], [0, 1])
  );
 
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 ">    
      
      <div className="grid grid-cols-2 gap-20 mt-24 px-12">

      {/* Left Column: Hero and About Section */}      
      <div className="flex flex-col space-y-10">
      {/* Hero Section */}
      <section id="hero">
        <div className="mx-auto w-full max-w-4xl space-y-8">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
      {/* Text Section */}
        <div className="flex flex-col flex-1 space-y-4 text-center md:text-left">
        <TextAnimate animation="blurIn" as="h1" className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"> 
          {`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
        </TextAnimate>
        <TextAnimate animation="blurIn" as="p" className="max-w-[600px] md:text-2xl text-muted-foreground">
          {DATA.description}
        </TextAnimate>
        </div>
      {/* Avatar Section */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Dot Pattern Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <DotPattern 
            glow={true} 
            className="w-full h-full opacity-50 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          />
        </div>
          {/* Avatar */}
        <Avatar className="w-44 h-44 border-4 border-white shadow-lg relative z-10 rounded-full">
          <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
          <AvatarFallback>{DATA.initials}</AvatarFallback>
        </Avatar>
        </div>

      </div>
      </div>
      </section>


      {/* About Section */}
      <section id="about">
        <div className="about-button m-2">
          <ShinyButton>
            <h2 className="text-3xl font-bold">About</h2>
          </ShinyButton>
        </div>
        <BlurFade delay={0.4 * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-l text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>

      {/* Skill Section */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
         <div className="skill-button m-0.5">
          <ShinyButton>
            <h2 className="text-2xl font-bold">Skills</h2>
          </ShinyButton>
          </div>
          <div className="flex flex-wrap gap-2 text-xl">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* Right Column: skill Section */}
      <div className="flex flex-col space-y-10">
      <div className="relative flex min-h-0 flex-row gap-x-2 bg-opacity-60 backdrop-blur-md p-6 rounded-xl shadow-lg">        {/* Marquee Effect */}
        <div className="h-[600px] mt-4 overflow-hidden relative ml-8 ">
        <Marquee pauseOnHover vertical className="[--duration:15s]">
        {DATA.skillUrl.map((url, index) => (
        <Avatar key={index} className=" size-40 border-4 border-white shadow-lg relative z-10  m-2">
          <AvatarImage alt={DATA.skills[index]} src={url} />
        </Avatar>
      ))}
        </Marquee>        
       </div>
       <div className="h-[600px] mt-4 overflow-hidden relative ml-auto">
        <Marquee pauseOnHover vertical className="[--duration:15s]" reverse>
          {DATA.skillUrl.map((url, index) => (
          <Avatar key={`down-${index}`} className="size-40 border-4 border-white shadow-lg relative z-10 m-2">
            <AvatarImage alt={DATA.skills[index]} src={url} />
          </Avatar>
          ))}
          </Marquee>
       </div>
      </div>
      </div>

</div>


{/* Right Column: workSection */}
<section id="work">
        <div className="relative flex min-h-0 flex-col gap-y-3 bg-opacity-60 backdrop-blur-md p-6 rounded-xl shadow-lg">
      {/* Section Title */}
      <h2 className="text-xl font-bold text-center">Work Experience</h2>
      {/* Marquee Effect */}
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide px-4 py-2 snap-x snap-mandatory">
        {DATA.work.map((work, idx) => (
          <ResumeCard
            className="bg-gray-900 text-white rounded-xl shadow-md p-4 text-lg font-semibold hover:bg-gray-800 transition-all duration-300"
            key={idx}
            logoUrl={work.logoUrl}
            altText={work.company}
            title={work.company}
            subtitle={work.title}
            href={work.href}
            badges={work.badges}
            period={`${work.start} - ${work.end ?? "Present"}`}
            description={work.description}            
          />
        ))}
      
       </div>
      </div>
</section>





{/* education section  */}
<section id="education">
  <div className="flex min-h-0 flex-col gap-y-3">
    <MagicCard>
      <h2 className="text-xl font-bold text-center">Education</h2>
    </MagicCard>
    <div className="grid grid-cols-2  gap-6 mt-6">
      {DATA.education.map((education, id) => (
        <MagicCard key={education.school}>
          <ResumeCard
            href={education.href}
            logoUrl={education.logoUrl}
            altText={education.school}
            title={education.school}
            subtitle={education.degree}
            period={`${education.start} - ${education.end}`}
          />
        </MagicCard>
      ))}
    </div>
  </div>
</section>  


    {/* PROJECTS SECTION */}
    <section id="projects" ref={ref} className="relative w-full min-h-[300vh]">
          
          <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center">
            {/* Left: Title Section - Stays fixed */}
            <div className="absolute left-0 top-1/4 pl-10">
              <div className="text-left">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white mt-2">
                  Check out my latest work
                </h2>
                <p className="text-gray-400 mt-2 text-lg max-w-md">
                  I&apos;ve worked on a variety of projects, from simple websites to complex web applications.
                </p>
              </div>
            </div>

            {/* Right: Project Cards Stacking Effect */}
            <div className="relative w-full max-w-[600px] h-[500px] ml-15">
          {DATA.projects.map((project, index) => (
            <motion.div
              key={project.title}
              style={{
                y: translateYValues[index],
                scale: scaleValues[index],
                opacity: opacityValues[index],
                zIndex: projectCount - index,
              }}
              className="absolute top-0 left-0 w-full"
            >
              <ProjectCard
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            </motion.div>
          ))}
        </div>
          </div>
        
      </section>


 
  
   


{/* Hackthons Section */}

      <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Hackathons
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  I like building things
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  During my time in university, I attended{" "}
                  {DATA.hackathons.length}+ hackathons. People from around the
                  country would come together and build incredible things in 2-3
                  days. It was eye-opening to see the endless possibilities
                  brought to life by a group of motivated and passionate
                  individuals.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4 ml-4 divide-y divide-dashed border-l">
          {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}>
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>

      
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on twitter
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}









































