import { HackathonCard } from "@/components/hackathon-card";
import VisionSection  from "@/components/VisionSection";

import BlurFade from "@/components/magicui/blur-fade"
import { TextAnimate } from "@/components/magicui/text-animate"
import { ShinyButton } from "@/components/magicui/shiny-button"
import { AnimatedList } from "@/components/magicui/animated-list"
import { ProjectCard } from "@/components/project-card"
import { ResumeCard } from "@/components/resume-card"
import { Badge } from "@/components/ui/badge"
import { DATA } from "@/data/resume"
import Link from "next/link"
import { ArrowUpRight, Instagram, Linkedin, Twitter } from "lucide-react"
import { FeatureGrid } from "@/components/feature-grid"

const BLUR_FADE_DELAY = 0.4

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] bg-[#121212] text-white">
      {/* Hero Section */}
      <section id="hero" className="w-full pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <TextAnimate animation="blurIn" as="h1" className="text-5xl md:text-6xl font-bold">
                  Hii, I'm <span className="text-[#ff0054]">{DATA.name.split(" ")[0]}</span>
                </TextAnimate>
                <TextAnimate animation="blurIn" as="h1" className="text-4xl md:text-5xl font-bold">
                  From India
                </TextAnimate>
                <BlurFade delay={BLUR_FADE_DELAY * 2}>
                  <p className="text-gray-400 max-w-md mt-6">{DATA.description}</p>
                </BlurFade>
              </div>

              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-[#ff0054] hover:bg-[#ff0054]/90 text-white px-6 py-3 rounded-md transition-colors"
                  >
                    Book a Call
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#projects"
                    className="inline-flex items-center gap-2 bg-[#ff0054] hover:bg-[#ff0054]/90 text-white px-6 py-3 rounded-md transition-colors"
                  >
                    See Portfolio
                  </Link>
                </div>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 4}>
                <div className="space-y-6 pt-8">
                  <h3 className="text-xl font-semibold">My Top Skills</h3>
                  <div className="flex flex-wrap gap-4">
                    {DATA.skills.slice(0, 6).map((skill, idx) => (
                      <div
                        key={skill}
                        className="w-12 h-12 bg-[#1e1e1e] rounded-full flex items-center justify-center shadow-lg"
                        title={skill}
                      >
                        <span className="text-xs">{skill.substring(0, 2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Find Me On</h3>
                  <div className="flex gap-4">
                    <Link
                      href="https://instagram.com"
                      target="_blank"
                      className="w-12 h-12 bg-[#1e1e1e] rounded-full flex items-center justify-center hover:bg-[#1e1e1e]/80 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </Link>
                    <Link
                      href="https://linkedin.com"
                      target="_blank"
                      className="w-12 h-12 bg-[#1e1e1e] rounded-full flex items-center justify-center hover:bg-[#1e1e1e]/80 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </Link>
                    <Link
                      href="https://twitter.com"
                      target="_blank"
                      className="w-12 h-12 bg-[#1e1e1e] rounded-full flex items-center justify-center hover:bg-[#1e1e1e]/80 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </BlurFade>
            </div>

            {/* Right Column - Feature Grid */}
            <FeatureGrid />
            <VisionSection />
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="work" className="w-full py-16 bg-[#151515]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex min-h-0 flex-col gap-y-8">
            <BlurFade delay={BLUR_FADE_DELAY * 6}>
              <div className="flex items-center gap-4 mb-8">
                <ShinyButton>
                  <h2 className="text-2xl font-bold">Work Experience</h2>
                </ShinyButton>
              </div>
            </BlurFade>
            <AnimatedList>
              {DATA.work.map((work, idx) => (
                <BlurFade key={idx} delay={BLUR_FADE_DELAY * 7 + idx * 0.1}>
                  <div className="bg-[#1e1e1e] p-6 rounded-lg mb-4 hover:transform hover:scale-[1.02] transition-all duration-300">
                    <ResumeCard
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
                  </div>
                </BlurFade>
              ))}
            </AnimatedList>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="w-full py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex min-h-0 flex-col gap-y-8">
            <BlurFade delay={BLUR_FADE_DELAY * 8}>
              <div className="flex items-center gap-4 mb-8">
                <ShinyButton>
                  <h2 className="text-2xl font-bold">Education</h2>
                </ShinyButton>
              </div>
            </BlurFade>
            {DATA.education.map((education, id) => (
              <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 9 + id * 0.1}>
                <div className="bg-[#1e1e1e] p-6 rounded-lg mb-4 hover:transform hover:scale-[1.02] transition-all duration-300">
                  <ResumeCard
                    key={education.school}
                    href={education.href}
                    logoUrl={education.logoUrl}
                    altText={education.school}
                    title={education.school}
                    subtitle={education.degree}
                    period={`${education.start} - ${education.end}`}
                  />
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="w-full py-16 bg-[#151515]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex min-h-0 flex-col gap-y-8">
            <BlurFade delay={BLUR_FADE_DELAY * 10}>
              <div className="flex items-center gap-4 mb-8">
                <ShinyButton>
                  <h2 className="text-2xl font-bold">Skills</h2>
                </ShinyButton>
              </div>
            </BlurFade>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {DATA.skills.map((skill, id) => (
                <BlurFade key={skill} delay={BLUR_FADE_DELAY * 11 + id * 0.05}>
                  <div className="bg-[#ff0054] p-6 flex items-center justify-center text-center h-32 hover:bg-[#ff0054]/90 transition-all duration-300">
                    <Badge key={skill} className="bg-transparent border-none text-white text-lg font-medium">
                      {skill}
                    </Badge>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="w-full py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="space-y-12">
            <BlurFade delay={BLUR_FADE_DELAY * 12}>
              <div className="flex items-center gap-4 mb-8">
                <ShinyButton>
                  <h2 className="text-2xl font-bold">Projects</h2>
                </ShinyButton>
              </div>
              <p className="text-gray-400 max-w-2xl">
                I've worked on a variety of projects, from simple websites to complex web applications. Here are a few
                of my favorites.
              </p>
            </BlurFade>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DATA.projects.map((project, id) => (
                <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 13 + id * 0.1}>
                  <div className="bg-[#1e1e1e] rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300">
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
                    />
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="hackathons" className="w-full py-16 bg-[#151515]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="space-y-12">
            <BlurFade delay={BLUR_FADE_DELAY * 14}>
              <div className="flex items-center gap-4 mb-8">
                <ShinyButton>
                  <h2 className="text-2xl font-bold">Hackathons</h2>
                </ShinyButton>
              </div>
              <p className="text-gray-400 max-w-2xl">
                During my time in university, I attended {DATA.hackathons.length}+ hackathons. People from around the
                country would come together and build incredible things in 2-3 days.
              </p>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DATA.hackathons.map((project, id) => (
                  <BlurFade key={project.title + project.dates} delay={BLUR_FADE_DELAY * 16 + id * 0.05}>
                    <div className="bg-[#1e1e1e] p-6 rounded-lg hover:transform hover:scale-[1.02] transition-all duration-300">
                      <HackathonCard
                        title={project.title}
                        description={project.description}
                        location={project.location}
                        dates={project.dates}
                        image={project.image}
                        links={project.links}
                      />
                    </div>
                  </BlurFade>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="contact" className="w-full py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid items-center justify-center gap-8 text-center">
            <BlurFade delay={BLUR_FADE_DELAY * 17}>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <ShinyButton>
                    <h2 className="text-2xl font-bold">Get in Touch</h2>
                  </ShinyButton>
                </div>
                <p className="mx-auto max-w-[600px] text-gray-400">
                  Want to chat? Just shoot me a dm{" "}
                  <Link href={DATA.contact?.social?.X?.url || "#"} className="text-[#ff0054] hover:underline">
                    with a direct question on twitter
                  </Link>{" "}
                  and I'll respond whenever I can. I will ignore all soliciting.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 18}>
              <div className="flex justify-center gap-6 pt-8">
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="w-12 h-12 bg-[#1e1e1e] rounded-full flex items-center justify-center hover:bg-[#1e1e1e]/80 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className="w-12 h-12 bg-[#1e1e1e] rounded-full flex items-center justify-center hover:bg-[#1e1e1e]/80 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="w-12 h-12 bg-[#1e1e1e] rounded-full flex items-center justify-center hover:bg-[#1e1e1e]/80 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      <footer className="w-full py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-[#ff0054] font-bold text-xl">
                {DATA.initials}
              </Link>
              <p className="text-gray-400 mt-2">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="#hero" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="#work" className="text-gray-400 hover:text-white transition-colors">
                Work
              </Link>
              <Link href="#projects" className="text-gray-400 hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

