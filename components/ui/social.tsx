'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaFacebook, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";

interface SocialLinks {
  fbLink?: string;
  linkedin?: string;
  youTubeLink?: string;
  instagram?: string;
}

const Social = () => {
  const params = useParams();
  const userId = params?.userId as string;
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setSocialLinks({
            fbLink: data.fbLink,
            linkedin: data.linkedin,
            youTubeLink: data.youTubeLink,
            instagram: data.instagram,
          });
        }
      } catch (error) {
        console.error('Error fetching social links:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, [userId]);

  const socials = [
    { icon: <FaFacebook />, path: socialLinks.fbLink, label: 'Facebook' },
    { icon: <FaLinkedinIn />, path: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: <FaYoutube />, path: socialLinks.youTubeLink, label: 'YouTube' },
    { icon: <FaInstagram />, path: socialLinks.instagram, label: 'Instagram' },
  ];

  // Filter out socials without links
  const availableSocials = socials.filter(social => social.path && social.path.trim() !== '');

  if (loading) {
    return (
      <div className='flex flex-row gap-4 text-3xl mt-[-20px] xl:mt-[30px]'>
        <div className="animate-pulse flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (availableSocials.length === 0) {
    return (
      <div className='mt-[-20px] xl:mt-[30px]'>
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          No social links available
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-row gap-4 text-3xl mt-[-20px] xl:mt-[30px]'>
      {availableSocials.map((item, index) => (
        <Link 
          key={index} 
          href={item.path!} 
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 sm:mt-2"
          title={item.label}
        >
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-[#1f1f1f] hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-400 shadow-md transition-all duration-300 hover:scale-110">
            {item.icon}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default Social;