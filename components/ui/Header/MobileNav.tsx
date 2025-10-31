'use client';

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Drawer from '../Drawer';
import Link from 'next/link';
import { Button } from '../button';

export default function MobileNav() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session?.user?.id) return null;

  const links = [
    { name: 'Home', path: `/${session.user.id}` },
    { name: 'About Me', path: `/${session.user.id}/about` },
    { name: 'Work', path: `/${session.user.id}/work` },
    { name: 'chamber', path: `/${session.user.id}/chamber` },
    { name: '🤖MindMate Al', path: `/MindMateAI` },
    
  ];

  return (
    <nav className="p-2 md:hidden">
      <Drawer links={links} />
     
    </nav>
  );
}
