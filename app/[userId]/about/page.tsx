'use client';

import Degree from '@/components/ui/AboutMe/Degree';
import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import Image from 'next/image';

const about = {
  title: 'About Me',
  bio: 'I am a passionate doctor with a long journey of dedication, expertise, and care for my patients. I have worked in prestigious institutions and earned valuable experiences that shaped my professional journey.',
};

const experience = [
  {
    num: '1',
    role: 'Head of Doctor',
    college: 'Usmani Medical College',
    year: '2012 to 2017',
  },
  {
    num: '2',
    role: 'Senior Consultant',
    college: 'Sylhet City Clinic',
    year: '2018 to 2022',
  },
  {
    num: '3',
    role: 'Visiting Surgeon',
    college: 'Green Life Hospital',
    year: '2022 - Present',
  },
];

const education = [
  {
    num: '1',
    Exam: 'SSC',
    college: 'Sylhet Govt. High School',
    year: '2008',
  },
  {
    num: '2',
    Exam: 'HSC',
    college: 'Sylhet Govt. College',
    year: '2010',
  },
  {
    num: '3',
    Exam: 'MBBS',
    college: 'Usmani Medical College',
    year: '2016',
  },
  {
    num: '4',
    Exam: 'SSC',
    college: 'Sylhet Govt. High School',
    year: '2008',
  },
  {
    num: '5',
    Exam: 'HSC',
    college: 'Sylhet Govt. College',
    year: '2010',
  },
  {
    num: '6',
    Exam: 'MBBS',
    college: 'Usmani Medical College',
    year: '2016',
  },
];

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs.Root
          defaultValue="aboutMe"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          {/* Tabs Trigger List */}
          <Tabs.List className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-4">
            {[
              { label: 'About Me', value: 'aboutMe' },
              { label: 'Education', value: 'education' },
              { label: 'Degree', value: 'degree' },
              { label: 'Experience', value: 'experience' },
            ].map((tab) => (
              <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className="text-left text-xl font-semibold px-4 py-3 rounded-lg transition-all
                text-gray-700 hover:text-blue-600 
                data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700
                dark:text-white dark:hover:text-accent 
                dark:data-[state=active]:bg-[#232329] dark:data-[state=active]:text-accent"
            >
              {tab.label}
            </Tabs.Trigger>
            ))}
          </Tabs.List>

          {/* Tabs Content */}
          <div className="flex-1">
            {/* About Me */}
            <Tabs.Content value="aboutMe">
              <div className="h-[400px] sm:flex flex flex-col sm:flex-row gap-5 bg-[#1f1f23] rounded-xl overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-[#2c2c30] p-6 pr-4">
                <div className="space-y-6 order-2 sm:order-none">
                  <h3 className="text-4xl font-bold text-white">{about.title}</h3>
                  <p className="max-w-[600px] text-lg text-gray-300 leading-relaxed text-justify">
                    {about.bio}
                  </p>
                </div>
                <motion.div
  initial={{ opacity: 0 }}
  animate={{
    opacity: 1,
    transition: { delay: 0.5, duration: 1, ease: "easeInOut" },
  }}
  className="relative w-[300px] min-h-[298px] xl:w-[400px] xl:h-[350px] order-1 sm:order-none overflow-hidden border-4 border-white-500 rounded-2xl shadow-md"
>
  <Image 
    src="/contactDr.png"
    alt="dr photo"
    priority
    quality={100}
    fill
   
  />
</motion.div>

              </div>
            </Tabs.Content>

            {/* Education */}
            <Tabs.Content value="education">
              <div className="h-[400px] bg-[#1f1f23] rounded-xl overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-[#2c2c30] p-6 pr-4">
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {education.map((edu, index) => (
                    <li key={index} className="bg-[#232329] p-6 rounded-xl space-y-2">
                      <span className="text-accent font-medium">{edu.year}</span>
                      <h4 className="text-xl font-semibold">{edu.Exam}</h4>
                      <p className="text-gray-300">{edu.college}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Tabs.Content>

            {/* Degree */}
            <Tabs.Content value="degree">
              <div className="h-[400px] bg-[#1f1f23] rounded-xl overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-[#2c2c30] p-6 pr-4">
                <div className="text-gray-300">
               <Degree />
                </div>
              </div>
            </Tabs.Content>

            {/* Experience */}
            <Tabs.Content value="experience">
              <div className="h-[400px] bg-[#1f1f23] rounded-xl overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-[#2c2c30] p-6 pr-4">
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {experience.map((exp, index) => (
                    <li key={index} className="bg-[#232329] p-6 rounded-xl space-y-2">
                      <span className="text-accent font-medium">{exp.year}</span>
                      <h4 className="text-xl font-semibold">{exp.role}</h4>
                      <p className="text-gray-300">{exp.college}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </div>
    </motion.div>
  );
}
