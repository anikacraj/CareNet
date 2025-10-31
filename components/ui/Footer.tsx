// components/Footer.tsx
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">DR PORT.</h2>
          <p className="mt-2 text-sm">Empowering doctors with personalized digital profiles. Built for trust & professionalism.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/register" className="hover:underline">Register</Link></li>
            <li><Link href="/profile" className="hover:underline">My Profile</Link></li>
            <li><Link href="/chamber" className="hover:underline">Chamber</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">Email: support@docprofile.com</p>
          <p className="text-sm">Phone: +880-123-456-789</p>
          <p className="text-sm">Sylhet, Bangladesh</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-700"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-gray-600"><FaGithub /></a>
          </div>
      
        </div>
      </div>

      <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-5 text-center text-sm">
        &copy; {new Date().getFullYear()} DR PORT. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
