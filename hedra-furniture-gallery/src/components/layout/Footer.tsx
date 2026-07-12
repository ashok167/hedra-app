import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import edendekLogo from "../../assets/icons/300px.png";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      {/* ↓ was py-12. Reduce top padding only. */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 sm:pt-10 sm:pb-8">
        {/* ↓ align all columns to the same top line */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9 sm:gap-8 items-start">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1 leading-none">
              <img
                src={edendekLogo}
                alt="Edendek logo"
                className="block h-12 w-auto"  // ↑ increased size
                loading="eager"
              />
            </div>

            <p className="mt-2 text-sm text-gray-900 leading-snug
               max-w-md mx-auto md:mx-0 md:max-w-[28ch] lg:max-w-[30ch]">
              Creating exceptional furniture pieces that blend craftsmanship with modern design.
              Your trusted partner for premium furniture solutions.
            </p>

          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#14294C] uppercase tracking-wider">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-900 hover:text-[#b53e1d] transition-colors text-sm">Home</Link>
              <Link to="/catalog" className="text-gray-900 hover:text-[#b53e1d] transition-colors text-sm">Product Catalog</Link>
              <Link to="/projects" className="text-gray-900 hover:text-[#b53e1d] transition-colors text-sm">Our Projects</Link>
              <Link to="/services" className="text-gray-900 hover:text-[#b53e1d] transition-colors text-sm">Services</Link>
              <Link to="/about" className="text-gray-900 hover:text-[#b53e1d] transition-colors text-sm">About Us</Link>
               <Link to="/blogs" className="text-gray-900 hover:text-[#b53e1d] transition-colors text-sm">
      Blogs
    </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#14294C] uppercase tracking-wider">Services</h3>
            <nav className="flex flex-col space-y-2">
              <span className="text-gray-900 text-sm">Custom Furniture</span>
              <span className="text-gray-900 text-sm">Interior Design</span>
              <span className="text-gray-900 text-sm">Furniture Restoration</span>
              <span className="text-gray-900 text-sm">Commercial Projects</span>
              <span className="text-gray-900 text-sm">Consultation</span>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
  <h3 className="text-sm font-semibold text-[#14294C] uppercase tracking-wider">
    Contact Us
  </h3>

  {/* 2-column grid: fixed icon column + flexible text column */}
  <div className="grid grid-cols-[22px,1fr] gap-x-3 gap-y-2 items-start">
    {/* Phone */}
    <Phone className="h-5 w-5 text-[#b53e1d] mt-0.5" />
    <span className="text-sm text-gray-900"><a href="tel:+919962452447">+91 99624 52447</a></span>

    {/* Email */}
    <Mail className="h-5 w-5 text-[#b53e1d] mt-0.5" />
    <span className="text-sm text-gray-900 break-all"><a href="mailto:info@edendek.com">info@edendek.com</a></span>

    {/* Address */}
    <MapPin className="h-5 w-5 text-[#b53e1d] mt-0.5" />
    <address className="not-italic text-sm text-gray-900 leading-snug">
      No: 126/1, Sivanthi Athithan Nagar,<br />
      Ambedkar Main Road,<br />
      Redhills, Chennai,<br />
      Tamil Nadu: 600 052
    </address>
  </div>

  {/* Socials */}
  <div className="flex gap-3 pt-2">
    <a href="#" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-900 hover:border-[#b53e1d] hover:text-[#b53e1d] transition-colors">
      <Facebook className="h-5 w-5" />
    </a>
    <a href="#" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-900 hover:border-[#b53e1d] hover:text-[#b53e1d] transition-colors">
      <Instagram className="h-5 w-5" />
    </a>
    <a href="#" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-900 hover:border-[#b53e1d] hover:text-[#b53e1d] transition-colors">
      <Linkedin className="h-5 w-5" />
    </a>
  </div>
</div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-9 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
         <p className="text-[#14294C] text-sm">
  © {new Date().getFullYear()} Edendek. All rights reserved.
</p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link to="/privacy" className="text-[#14294C] hover:text-[#14294C] transition-colors text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-[#14294C] hover:text-[#14294C] transition-colors text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
