import React from 'react';
import { siteConfig } from '@/data/siteData';

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20Digi%20Vidyarthi%2C%20I%20want%20to%20know%20more%20about%20your%20Digital%20Marketing%20courses`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
    >
      <svg
        className="w-8 h-8 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.63.078-1.877-.437-1.39-.575-2.288-1.996-2.357-2.09-.069-.092-.56-7.44-.56-1.42 0-.677.355-1.01.481-1.144.126-.134.275-.168.368-.168.092 0 .184.002.264.006.084.005.197-.032.308.236.115.276.391.956.425 1.026.034.069.057.15.011.242-.046.092-.069.15-.138.23-.069.08-.145.179-.207.241-.069.069-.141.144-.061.282.08.138.358.591.768.956.529.471.975.617 1.113.686.138.069.218.058.298-.035.08-.092.344-.401.436-.539.092-.138.184-.115.31-.069.126.046.804.379.942.448.138.069.23.103.264.161.034.057.034.333-.11.738z" />
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.178L2 22l4.981-1.309A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.167-.47-4.464-1.28l-.32-.201-2.956.776.789-2.883-.22-.351A8.163 8.163 0 0 1 3.8 12c0-4.521 3.679-8.2 8.2-8.2 4.521 0 8.2 3.679 8.2 8.2 0 4.521-3.679 8.2-8.2 8.2z" />
      </svg>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
