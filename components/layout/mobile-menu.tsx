'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { useUIStore } from '@/lib/stores/ui';
import { useUserPreferences } from '@/lib/stores/preferences';
import { AgeModeToggle } from './age-mode-toggle';

interface NavLink {
  href: string;
  label: string;
  hideInExplorer?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/launches', label: 'Launches' },
  { href: '/live', label: 'Live' },
  { href: '/agencies', label: 'Agencies', hideInExplorer: true },
  { href: '/vehicles', label: 'Vehicles', hideInExplorer: true },
];

export function MobileMenu(): JSX.Element {
  const pathname = usePathname();
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { ageMode } = useUserPreferences();

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  if (!mobileMenuOpen) return <></>;

  // Filter nav links based on age mode
  const visibleLinks = NAV_LINKS.filter(
    (link) => ageMode !== 'explorer' || !link.hideInExplorer
  );

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 top-16 z-40 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-void/80 backdrop-blur-sm"
        onClick={() => setMobileMenuOpen(false)}
        aria-label="Close menu"
      />

      {/* Menu Content */}
      <div className="relative h-full bg-cosmos border-t border-nebula">
        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <nav className="flex-1 p-6 space-y-2" aria-label="Mobile navigation">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block rounded-lg px-4 py-3 text-lg font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-plasma-blue/20 text-plasma-blue'
                    : 'text-stardust hover:bg-white/5 hover:text-starlight'
                )}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Age Mode Toggle (Mobile) */}
          <div className="border-t border-nebula p-6">
            <p className="mb-3 text-sm font-medium text-stardust">Experience Mode</p>
            <AgeModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
