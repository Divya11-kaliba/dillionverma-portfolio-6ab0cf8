"use client";

import React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";
import { cn } from "@/lib/utils";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { MagicCard } from "@/components/magicui/magic-card";
import Contact from "@/components/contact";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { EducationCard } from "@/components/eduaction-card";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/simple-carousel";
import { type simpleCarouselApi } from "@/components/ui/simple-carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import CertificateCard from "@/components/certificate-card";
import {
  FadeCarousel,
  FadeCarouselContent,
  FadeCarouselItem,
  FadeCarouselPrevious,
  FadeCarouselNext,
  FadeCarouselDots,
  type FadeCarouselApi,
} from "@/components/ui/FadeCarousel";
import { EmblaCarouselType } from "embla-carousel";

const BLUR_FADE_DELAY = 0.4;

export default function Page() {
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllHackathons, setShowAllHackathons] = useState(false);

  const hackathonSectionRef = useRef<HTMLDivElement>(null);
  const visibleHackathons = showAllHackathons
    ? DATA.hackathons
    : DATA.hackathons.slice(0, 6);
  const projectSectionRef = useRef<HTMLDivElement>(null);
  const visibleprojects = showAllProjects
    ? DATA.projects
    : DATA.projects.slice(0, 4);
  const educationSectionRef = useRef<HTMLDivElement>(null);
  const visibleeducations = showAllEducation
    ? DATA.education
    : DATA.education.slice(0, 4);

  const handleViewToggleHacktons = () => {
    setShowAllHackathons(!showAllHackathons);
    if (showAllHackathons && hackathonSectionRef.current) {
      hackathonSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleViewToggleProjects = () => {
    setShowAllProjects(!showAllProjects);
    if (showAllProjects && projectSectionRef.current) {
      projectSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleViewToggleEducation = () => {
    setShowAllEducation(!showAllEducation);
    if (showAllEducation && educationSectionRef.current) {
      educationSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [workCarouselApi, setWorkCarouselApi] = useState<simpleCarouselApi | null>(null);

  // Ref for the Autoplay plugin specific to the Work section
  const workAutoplayPlugin = useRef(
    Autoplay({
      delay: 1700,
      stopOnInteraction: false,
      stopOnMouseEnter: false, // ** Important: Disable built-in hover stop **
    })
  );

  // Callback passed to ResumeCard to notify parent of modal state change
  const handleExpandChange = useCallback((expanded: boolean) => {
    setIsCardExpanded(expanded);
  }, []); // useCallback ensures stable reference

  // Effect to control autoplay based *primarily* on modal state
  useEffect(() => {
    const autoplay = workAutoplayPlugin.current;
    if (!autoplay) return;

    if (isCardExpanded) {
      console.log("Modal Opened: Stopping Work Autoplay");
      autoplay.stop(); // Stop immediately when modal opens
    } else {
      console.log("Modal Closed: Resetting Work Autoplay (will play if not hovered)");
      // Resume playback when modal closes, unless mouse is still hovering (handled by mouseleave)
      // Using reset() is safer to ensure it restarts correctly
      autoplay.reset();
    }
  }, [isCardExpanded]); // Re-run only when modal state changes

  // --- Manual Hover Handlers for Work Carousel ---
  const handleWorkMouseEnter = () => {
    // Only stop for hover if no card modal is expanded
    if (!isCardExpanded && workAutoplayPlugin.current) {
      console.log("Work Hover Enter (No Modal): Stopping Autoplay");
      workAutoplayPlugin.current.stop();
    }
  };

  const handleWorkMouseLeave = () => {
    // Only resume from hover if no card modal is expanded
    if (!isCardExpanded && workAutoplayPlugin.current) {
      console.log("Work Hover Leave (No Modal): Resetting Autoplay");
      // Use reset() to ensure it starts playing again cleanly after hover
      workAutoplayPlugin.current.reset();
    }
  };
  // const autoplayPlugin = useRef(
  //   Autoplay({
  //     delay: 1700,
  //     stopOnInteraction: false,
  //     stopOnMouseEnter: true,
  //   }),
  // )

  // // Track carousel API
  // const [api1, setApi1] = useState<simpleCarouselApi | null>(null)

  // // Track if any card is expanded
  // const [expandedCardCount, setExpandedCardCount] = useState(0)

  // // Handle card expansion state change
  // const handleCardExpandChange = (expanded: boolean) => {
  //   // Increment or decrement the count based on whether a card is being expanded or collapsed
  //   setExpandedCardCount((prev) => (expanded ? prev + 1 : Math.max(0, prev - 1)))
  // }

  // // Control autoplay based on card expansion state
  // useEffect(() => {
  //   if (!autoplayPlugin.current) return
  
  //   if (expandedCardCount > 0) {
  //     autoplayPlugin.current.stop()
  //     console.log("Autoplay stopped because card opened")
  //   } else {
  //     autoplayPlugin.current.reset()
  //     console.log("Autoplay resumed because card closed")
  //   }
  // }, [expandedCardCount])
  

  const [api, setApi] = useState<FadeCarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  function setEmblaApi(api: EmblaCarouselType | undefined): void {
    throw new Error("Function not implemented.");
  }


  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 overflow-x-hidden w-full">
      {/*---------------------------------------------------Hero Section, About Section, Avatar section-----------------------------------------------*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  md:gap-10  lg:gap-20 mt-2 md:mt-4 px-4 sm:px-6 md:px-12">
        {/* Left Column: Hero and About Section */}
        <div className="flex flex-col space-y-8 md:space-y-12 order-2 lg:order-1 ">
          {/* Hero Section */}
          <section id="hero">
            <div className="mx-auto w-full max-w-4xl space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Text Section */}
                <div className="flex flex-col flex-1 space-y-4 text-center md:text-left">
                  <TextAnimate
                    animation="blurIn"
                    as="h1"
                    className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter "
                    style={{
                      textShadow: "2px 2px 10px rgba(94, 94, 94, 0.3)",
                      marginLeft: "0px",
                    }}
                  >
                    {`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
                  </TextAnimate>
                  <TextAnimate
                    animation="blurIn"
                    as="p"
                    className="max-w-[600px] text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground"
                  >
                    {DATA.description}
                  </TextAnimate>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="mt-4 md:mt-6">
            <div className="about-button m-2 sm:justify-center">
              <ShinyButton>
                <h2 className="text-xl sm:text-2xl font-bold">About</h2>
              </ShinyButton>
            </div>
            <BlurFade delay={0.4 * 4}>
              <Markdown className="prose max-w-full text-pretty font-sans text-base sm:text-lg text-muted-foreground dark:prose-invert p-2 text-justify">
                {DATA.summary}
              </Markdown>
            </BlurFade>
          </section>
        </div>

        {/* Right Column: HI and  Avtar Section */}
        <div className="flex flex-col space-y-10 justify-center items-center relative order-1 lg:order-2 ">
          {/* Background "HI" Animated Text */}
          <motion.h1
            className="absolute text-[180px] xs:text-[220px] sm:text-[280px] md:text-[280px] lg:text-[340px] xl:text-[380px] font-extrabold select-none transition-opacity duration-500 opacity-10 hover:opacity-30 text-transparent shadow-lg shadow-gray-400/50 dark:shadow-gray-800/50 hidden md:flex"
            initial={{ opacity: 0.1, scale: 1 }}
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.05, 1] }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={{
              top: "3%",
              left: "-47%",
              transform: "-translate-x-1/2",
              WebkitTextStroke: "3px rgba(94, 94, 94, 0.88)",
            }}
          >
            HI
          </motion.h1>
          {/* Avatar Section */}
          <div className="relative flex items-center justify-center mt-0 xs:mt-[-80px] sm:mt-[-100px] md:mt-[-120px] lg:mt-[-150px]">
            <Avatar className="relative w-[280px] h-[340px] xs:w-[320px] xs:h-[380px] sm:w-[360px] sm:h-[420px] md:w-[400px] md:h-[460px] lg:w-[460px] lg:h-[500px] overflow-hidden rounded-xl border-4 border-white dark:border-gray-800 shadow-lg rotate-6 hover:rotate-0  hover:border-gray-700 dark:hover:border-6 dark:hover:border-blue-600 transition-transform duration-500 ease-in-out">
              <AvatarImage
                alt={DATA.name}
                src={DATA.avatarUrl}
                className="w-full h-full object-cover"
              />
              <AvatarFallback>{DATA.initials}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------Skill Section -------------------------------------------------------------------*/}

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-5 ">
          <div className="skill-button  text-center m-2">
            <ShinyButton>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                Skills
              </h2>
            </ShinyButton>
          </div>
          <div className="flex flex-wrap gap-4 justify-center  ">
            {DATA.skills.map((skill, index) => (
              <div key={index} className="flex flex-col items-center ">
                <motion.div
                  key={index}
                  className="flex flex-col items-center "
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0px 10px 20px rgba(84, 78, 78, 0.87) ",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Avatar className="size-16 xs:size-18 sm:size-20  border-4 border-white shadow-lg relative z-[-10] m-2 bg-gray-100 dark:bg-gray-100 ">
                    <AvatarImage src={DATA.skillUrl[index]} />
                  </Avatar>
                  <p className="text-xs sm:text-sm font-medium text-center mt-2">
                    {skill}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*------------------------------------------------------------ workSection -------------------------------------------------------------------- */}

      <section id="work" className="py-8 sm:py-12 w-full">
        <div className="relative flex min-h-0 flex-col gap-y-3 bg-opacity-60 backdrop-blur-md p-5 sm:p-8 rounded-xl shadow-lg shadow-gray-600/50 dark:shadow-gray-600/50">
          <div className="work-button  text-center m-2">
            <ShinyButton>
              <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold">
                Work Experience
              </h2>
            </ShinyButton>
          </div>
          <div className=" relative overflow-hidden ">
            <Carousel
              className="w-full max-w-[2400px] p-2 sm:p-2 "
              // plugins={[autoplayPlugin.current]}
              // onMouseEnter={() => {
              //   if (expandedCardCount === 0) {
              //     autoplayPlugin.current?.stop()
              //     console.log("Autoplay stopped by mouse hover")
              //   }
              // }}
              // onMouseLeave={() => {
              //   if (expandedCardCount === 0) {
              //     autoplayPlugin.current?.reset()
              //     console.log("Autoplay resumed by mouse leave")
              //   }
              // }}
            plugins={[workAutoplayPlugin.current]} // Pass the plugin instance
            setApi1={setWorkCarouselApi}          // Optional: get API
            onMouseEnter={handleWorkMouseEnter} // Manual hover enter
            onMouseLeave={handleWorkMouseLeave}
            >
              {/* Left Arrow */}
              <CarouselPrevious className=" hidden xs:flex absolute -left-0  top-1/2 transform-translate-y-1/2 z-50 bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white p-2 sm:p-4 rounded-full border-foreground  hover:bg-gray-400 dark:hover:bg-gray-700 transition" />
              <div className="p-4 sm:p-4 m-2 sm:m-4">
                <CarouselContent className="p-1 sm:p-5 flex  gap-2 sm:gap-4 ">
                  {DATA.work.map((work, idx) => (
                    <CarouselItem
                      key={idx}
                      className={`sm:pl-3 md:pl-4 basis-full sm:basis-3/2 md:basis-2/3 lg:basis-2/3 xl:basis-1/4 flex-shrink-0 sm:mx-2 md:mx-4 ${
                        idx === DATA.work.length - 1
                          ? "mr-2 sm:mr-4 md:mr-6"
                          : ""
                      }`}
                    >
                      <ResumeCard
                        className="bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-md p-2 sm:p-3 text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                        logoUrl={work.logoUrl}
                        altText={work.company}
                        title={work.company}
                        subtitle={work.title}
                        href={work.href}
                        badges={work.badges}
                        period={`${work.start} - ${work.end ?? "Present"}`}
                        description={work.description}
                        showExpand={true}
                        // onExpandChange={handleExpandChange}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>
              {/* Right Arrow */}
              <CarouselNext className=" hidden xs:flex absolute -right-0 top-1/2 transform -translate-y-1/2 z-50 bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white p-2 sm:p-4 rounded-full border-foreground  hover:bg-gray-400 dark:hover:bg-gray-700 transition" />
            </Carousel>
          </div>
        </div>
      </section>

      {/*---------------------------------------------------- education section --------------------------------------------------------------------  */}

      {/* <section id="education" className=" w-full">
  <div className="flex min-h-0 flex-col gap-y-3">
  <div className="flex justify-center">
  <div className="education-button  text-center m-2">
          <ShinyButton>
            <h2 className="text-2xl font-bold">Education</h2>
          </ShinyButton>
        </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full ">
      {DATA.education.map((education, id) => (
        <div key={education.school} className="w-full flex ">
          <MagicCard className="w-full h-fit flex flex-col items-center p-2 rounded-xl ">
          <ResumeCard
            href={education.href}
            logoUrl={education.logoUrl}
            altText={education.school}
            title={education.school}
            subtitle={education.degree}
            period={`${education.start} - ${education.end}`}
            className="w-[640px] p-5 flex-grow justify-between bg-gray-300 dark:bg-gray-800"
          />
        </MagicCard>
        </div>
      ))}
    </div>
  </div>
</section>  */}

      {/*---------------------------------------------------------------------------- education section--------------------------------------------------------------  */}
      <section
        id="education"
        className=" py-6 sm:py-8 md:py-12 w-full"
        ref={educationSectionRef}
      >
        <div className="flex min-h-0 flex-col gap-y-3 px-4 sm:px-6 md:px-0 ">
          <div className="flex justify-center">
            <div className="education-button  text-center m-2">
              <ShinyButton>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                  Education
                </h2>
              </ShinyButton>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2  3xl:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 mt-4 sm:mt-6 w-full ">
            {visibleeducations.map((education, id) => (
              <div key={education.school} className="w-full flex flex-grow">
                <MagicCard className="w-full h-full flex flex-col p-3 rounded-xl">
                  <EducationCard
                    href={education.href}
                    logoUrl={education.logoUrl}
                    altText={education.school}
                    title={education.school}
                    subtitle={education.degree}
                    period={`${education.start} - ${education.end}`}
                    className="w-full min-h-[180px] xs:h-[180px] sm:h-[220px] md:min-h-[220px] flex flex-col justify-between bg-gray-300 dark:bg-gray-800 rounded-xl shadow-md p-3 sm:p-4 text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                  />
                </MagicCard>
              </div>
            ))}
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 1}>
            {DATA.education.length > 4 && (
              <div className="text-center mt-8 sm:mt-10 md:mt-12">
                <button
                  onClick={handleViewToggleEducation}
                  className="inline-flex items-center gap-1 xs:gap-2 px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3  bg-gray-600 text-white text-sm xs:text-base rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform hover:scale-105"
                >
                  {showAllEducation ? (
                    <>
                      View Less <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  ) : (
                    <>
                      View More{" "}
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </BlurFade>
        </div>
      </section>

      {/*----------------------------------------------------------------------- PROJECTS SECTION ------------------------------------------------------------------------ */}
      <section id="projects" className="relative w-full py-8 sm:py-10 ">
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="project-button  text-center m-2">
            <ShinyButton>
              <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold">
                Projects
              </h2>
            </ShinyButton>
          </div>
          <h2 className="text-3xl sm:text-4xl text-gray-900 dark:text-white font-bold">
            Check out my latest work
          </h2>
          <p className="text-gray-700 dark:text-gray-100  max-w-6xl mx-auto text-base sm:text-lg leading-relaxed">
            I&apos;ve worked on a variety of projects, from simple websites to
            complex web applications.
          </p>
        </div>
        <div
          ref={projectSectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  gap-6 md:gap-8 xl:gap-10 max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
        >
          {visibleprojects.map((project, id) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: id * 0.1, duration: 0.5 }}
              className="relative rounded-xl overflow-hidden shadow-lg bg-gray-300 dark:bg-gray-800 p-4"
            >
              <ProjectCard
                href={project.href}
                key={project.title}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
                index={id}
                totalProjects={DATA.projects.length}
              />
            </motion.div>
          ))}
        </div>
        <BlurFade delay={BLUR_FADE_DELAY * 1}>
          {DATA.projects.length > 4 && (
            <div className="text-center  mt-8 sm:mt-10 md:mt-12">
              <button
                onClick={handleViewToggleProjects}
                className="inline-flex items-centergap-1 xs:gap-2 px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3  bg-gray-600 text-white text-sm xs:text-base rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform hover:scale-105"
              >
                {showAllProjects ? (
                  <>
                    View Less <ChevronUp className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    View More <ChevronDown className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </BlurFade>
      </section>

      {/*------------------------------------------------------------------- Certificates Section---------------------------------------------------- */}
      <section id="certificate" className="py-8 sm:py-12 md:py-16">
        <div className="max-w-full mx-auto text-center space-y-4 sm:space-y-6 px-4 sm:px-7 md:px-8">
          <div className="certificate-button  text-center m-2">
            <ShinyButton>
              <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold">
                Certificates
              </h2>
            </ShinyButton>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 dark:text-white font-bold">
            Check out my Certificates
          </h2>
          <div className="relative px-3 sm:px-4 lg:px-8 w-full max-w-7xl mx-auto rounded-xl overflow-hidden shadow-lg">
            <FadeCarousel
              setApi={setApi}
              plugins={[Fade()]}
              className="relative w-full flex flex-col items-center"
              onSelect={() => {
                if (api) {
                  setCurrent(api.selectedScrollSnap());
                }
              }}
            >
              <FadeCarouselContent className="transition-opacity duration-1000 ease-in-out w-full">
                {DATA.certifications.map((cert, index) => (
                  <FadeCarouselItem
                    key={index}
                    className="flex justify-center w-full h-full sm:h-full md:h-[350px]"
                  >
                    <CertificateCard
                      title={cert.title}
                      issuer={cert.issuer}
                      date={cert.date}
                      description={cert.description}
                      imageUrl={cert.imageUrl}
                      className="rounded-xl border border-[#2A2A2A] shadow-md w-full h-full flex flex-col justify-between bg-gray-300 dark:bg-gray-800  p-3 xs:p-4 text-sm xs:text-base sm:text-lg"
                    />
                  </FadeCarouselItem>
                ))}
              </FadeCarouselContent>

              <div className=" w-full mt-4 sm:mt-5 md:m-6 mb-4 sm:mb-5  px-2 xs:px-3 sm:px-4 flex items-center justify-between gap-3 xs:gap-4 sm:gap-5">
                <div className="flex  justify-start gap-2 relative ">
                  <FadeCarouselPrevious className=" absolute top-1/2 -translate-y-1/2 -left-0 xs:-left-1 sm:-left-1 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-foreground  flex items-center justify-center shadow-innerbg-white/80 hover:bg-gray-300 dark:bg-gray-800/80 dark:hover:bg-gray-800" />
                  <FadeCarouselNext className="absolute top-1/2 -translate-y-1/2 -right-20 xs:-right-20 sm:-right-20 md:-right-28 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-foreground  flex items-center justify-center shadow-inner  bg-white/80 hover:bg-gray-300 dark:bg-gray-800/80 dark:hover:bg-gray-800" />
                </div>
                <FadeCarouselDots className="flex flex-wrap justify-end items-center  mt-1 xs:mt-1.5 sm:mt-2 mr-2 xs:mr-3 sm:mr-4  " />
              </div>
            </FadeCarousel>
          </div>
        </div>
      </section>

      {/*------------------------------------------------------------------- Certificates Section---------------------------------------------------- */}
      {/* <section className="py-16">
      <div className="max-w-full mx-auto text-center space-y-6">
      <div className="certificate-button  text-center m-2">
          <ShinyButton>
            <h2 className="text-2xl  font-bold">Certificates</h2>
          </ShinyButton>
        </div>         
      <h2 className="text-4xl text-gray-900 dark:text-white font-bold">
        Check out my Certificates
      </h2>
      <div className="relative flex items-center">
        <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
        plugins={[Fade()]} className="relative w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg"
        onSelect={() => {
          if (api) {
            setCurrentIndex(api.selectedScrollSnap())
          }
        }}>
          <CarouselContent className="transition-opacity duration-1000 ease-in-out">
            {DATA.certifications.map((cert, index) => (
              <CarouselItem key={index} className="flex justify-center w-full h-full">
                <CertificateCard
            title={cert.title}
            issuer={cert.issuer}
            date={cert.date}
            description={cert.description}
            imageUrl={cert.imageUrl}
            className="rounded-xl border border-[#2A2A2A] shadow-md w-full h-full flex flex-col justify-between bg-gray-300 dark:bg-gray-800 p-4"
          />
        </CarouselItem>
      ))}
    </CarouselContent>

    {/* Navigation Arrows 
    <div className="flex items-center justify-center space-x-8 mt-8">
              <CarouselPrevious className="pointer-events-auto -left-2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition" />
              <CarouselNext className="pointer-events-auto -right-2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition" />
          
            {/* Custom Pagination Dots 
            <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-gray-900 dark:bg-white scale-110" : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          </div>
  </Carousel>
</div>
</div>
</section> */}

      {/*------------------------------------------------------------- Hackthons Section -------------------------------------------------------------*/}
      <section id="hackathons" className="py-6 sm:py-8 md:py-12 w-full">
        <div
          ref={hackathonSectionRef}
          className="space-y-8 sm:space-y-10 md:space-y-12  w-full py-12"
        >
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="flex flex-col items-center justify-center space-y-4 text-centerspace-y-2 sm:space-y-3 md:space-y-4 text-center px-4 sm:px-6">
              <div className="space-y-1 sm:space-y-2 md:space-y-3">
                <div className="hackathon-button  text-center m-2">
                  <ShinyButton>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold">
                      Hackathons
                    </h2>
                  </ShinyButton>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">
                  I like building things
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-100 max-w-7xl mx-auto">
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

          <BlurFade delay={BLUR_FADE_DELAY * 1}>
            {/* Adjusted grid to evenly distribute space */}
            <div className="flex justify-center">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-12 xs:gap-16 sm:gap-18 md:gap-20 lg:gap-24 mx-auto px-4 sm:px-6 lg:px-8">
                {visibleHackathons.map((project, id) => (
                  <BlurFade
                    key={project.title + project.dates}
                    delay={BLUR_FADE_DELAY * 1 + id * 0.05}
                  >
                    <HackathonCard
                      title={project.title}
                      description={project.description}
                      location={project.location}
                      dates={project.dates}
                      image={project.image}
                      links={project.links}
                      classname={
                        "relative rounded-xl overflow-hidden shadow-lg bg-gray-300 dark:bg-gray-800  p-2 xs:p-3 sm:p-4"
                      }
                    />
                  </BlurFade>
                ))}
              </ul>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 1}>
            {DATA.hackathons.length > 6 && (
              <div className="text-center  mt-8 sm:mt-10 md:mt-12">
                <button
                  onClick={handleViewToggleHacktons}
                  className="inline-flex items-center gap-1 xs:gap-2 px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3  bg-gray-600 text-white text-sm xs:text-base rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform hover:scale-105"
                >
                  {showAllHackathons ? (
                    <>
                      View Less <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  ) : (
                    <>
                      View More{" "}
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </BlurFade>
        </div>
      </section>
      {/*---------------------------------------------------------------------  Contact Section ------------------------------------------------------------------------- */}
      <section id="contact" className="py-6 sm:py-8 md:py-12 w-full">
        <div className="flex flex-col items-center justify-center gap-2 xs:gap-3 sm:gap-4 px-1 xs:px-2 sm:px-8 text-center w-full py-4 xs:py-6 sm:py-8 md:py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="space-y-1 xs:space-y-2 sm:space-y-3 md:space-y-4 flex flex-col items-center justify-center text-center w-full px-1 xs:px-2 sm:px-8 md:px-10">
              <div className="w-full flex justify-center items-center">
                <TypewriterEffect
                  words={[
                    {
                      text: "Get",
                      className:
                        "text-gray-500 text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter",
                    },
                    {
                      text: "in",
                      className:
                        "text-gray-500 text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter",
                    },
                    {
                      text: "Touch",
                      className:
                        "text-gray-500 text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter",
                    },
                  ]}
                />
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-100 max-w-[95%] sm:max-w-[65%] md:max-w-7xl mx-auto px-6 sm:px-8 py-2">
                Want to chat? Just shoot me a dm{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="text-blue-400 hover:underline"
                >
                  with a direct question
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
            </div>

            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="min-h-0 py-6 xs:py-8 sm:py-12 md:py-16 lg:py-20 relative bg-background text-gray-900 dark:text-white max-w-full mx-auto px-4 xs:px-6 sm:px-10 md:px-16 lg:px-24">
                <div className="container mx-auto px-0 xs:px-2 sm:px-4 md:px-6 flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16">
                  {/* Contact Form - Now Above */}
                  <div className="bg-gray-300 dark:bg-gray-800 bg-opacity-60 backdrop-blur-md p-4 xs:p-5 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl shadow-gray-600/30 sm:shadow-gray-600/40 md:shadow-gray-600/50 dark:shadow-gray-400/30 sm:dark:shadow-gray-400/40 md:dark:shadow-gray-400/50 w-full max-w-4xl mx-auto">
                    <Contact />
                  </div>

                  {/* Contact Information Section */}
                  <div className=" w-[90%] xs:w-[90%] sm:w-[85%] md:w-[80%] max-w-5xl mx-auto py-2 xs:py-3 sm:py-4 md:py-6">
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full place-items-center"
                    >
                      {/* Phone */}
                      <motion.div
                        className="flex flex-col items-center text-center gap-2 xs:gap-3 w-full max-w-[250px] h-full"
                        whileHover={{ scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <div className="bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 p-3 xs:p-4 rounded-full shadow-md xs:shadow-lg transform transition-all duration-300 hover:rotate-12">
                          <Phone className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
                        </div>
                        <div className="bg-gradient-to-r from-transparent to-gray-200/10 dark:from-transparent dark:to-gray-700/10 backdrop-blur-sm p-2 xs:p-3 px-3 xs:px-4 rounded-lg transform transition-all duration-300 w-full">
                          <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-500 bg-clip-text text-transparent">
                            {DATA.contact.tel}
                          </h3>
                        </div>
                      </motion.div>
                      {/* Email */}
                      <motion.div
                        className="flex flex-col items-center text-center gap-2 xs:gap-3 w-full max-w-[250px] h-full"
                        whileHover={{ scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <div className="bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 p-3 xs:p-4 rounded-full shadow-md xs:shadow-lg transform transition-all duration-300 hover:rotate-12">
                          <Mail className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
                        </div>
                        <div className="bg-gradient-to-r from-transparent to-gray-200/10 dark:from-transparent dark:to-gray-700/10 backdrop-blur-sm p-2 xs:p-3 px-3 xs:px-4 rounded-lg transform transition-all duration-300 w-full">
                          <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-500 bg-clip-text text-transparent break-all">
                            {DATA.contact.email}
                          </h3>
                        </div>
                      </motion.div>
                      {/* Address */}
                      <motion.div
                        className="flex flex-col items-center text-center gap-2 xs:gap-3 w-full max-w-[250px] h-full lg:col-span-1"
                        whileHover={{ scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <div className="bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 p-3 xs:p-4 rounded-full shadow-md xs:shadow-lg transform transition-all duration-300 hover:rotate-12">
                          <MapPin className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
                        </div>
                        <div className="bg-gradient-to-r from-transparent to-gray-200/10 dark:from-transparent dark:to-gray-700/10 backdrop-blur-sm p-2 xs:p-3 px-3 xs:px-4 rounded-lg transform transition-all duration-300 w-full">
                          <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-500 bg-clip-text text-transparent">
                            {DATA.contact.address
                              .split("\n")
                              .map((line, index) => (
                                <span key={index} className="block">
                                  {line}
                                </span>
                              ))}
                          </h3>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </BlurFade>
          </BlurFade>
        </div>
      </section>

      <button
        className="fixed bottom-4 right-4 bg-gray-600 p-4 rounded-full border-foreground hover:bg-gray-700 transition-colors hidden sm:block"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="w-6 h-6 text-white" />
      </button>
    </main>
  );
}
