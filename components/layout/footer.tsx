import Link from 'next/link';
import { Rocket, Github, Twitter, Youtube } from 'lucide-react';

const FOOTER_LINKS = [
  { href: '/launches', label: 'Launches' },
  { href: '/live', label: 'Live' },
  { href: '/agencies', label: 'Agencies' },
  { href: '/vehicles', label: 'Vehicles' },
];

const DATA_SOURCES = [
  { name: 'The Space Devs', href: 'https://thespacedevs.com' },
  { name: 'Launch Library 2', href: 'https://thespacedevs.com/llapi' },
];

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-nebula bg-cosmos">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="h-6 w-6 text-rocket-orange" />
              <span className="font-display text-xl font-bold text-starlight">RocketWatch</span>
            </div>
            <p className="text-sm text-stardust max-w-md">
              For the love of space. A free, inclusive space launch tracking platform for everyone
              from 5-year-olds to aerospace engineers.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stardust hover:text-starlight transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stardust hover:text-starlight transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stardust hover:text-starlight transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold text-starlight mb-4">Explore</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stardust hover:text-starlight transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Attribution */}
          <div>
            <h3 className="font-display text-sm font-semibold text-starlight mb-4">Data Sources</h3>
            <ul className="space-y-2">
              {DATA_SOURCES.map((source) => (
                <li key={source.name}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-stardust hover:text-starlight transition-colors"
                  >
                    {source.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-nebula flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-stardust">
            © {currentYear} RocketWatch. Built with love for space exploration.
          </p>
          <p className="text-xs text-stardust">
            Free forever. No accounts. No paywalls. Just space. 🚀
          </p>
        </div>
      </div>
    </footer>
  );
}
