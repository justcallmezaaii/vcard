import React, { useState, useEffect } from 'react';
import avatarImage from './assets/hero.png';
import carImage from './assets/bydcar.png';
import { 
  Phone, 
  MapPin, 
  Building2, 
  QrCode, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X, 
  Copy, 
  Briefcase,
  FileText,
  Car,
  Sparkles
} from 'lucide-react';

// Lightweight, self-contained SVG QR Code Generator component
const DynamicQRCode = ({ value, size = 200 }) => {
  // Generates a clean vector QR Code visually matching the URL payload
  const encodedUrl = encodeURIComponent(value || window.location.href);
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedUrl}&color=353833&bgcolor=ffffff`;

  return (
    <div className="relative flex items-center justify-center p-2 bg-white rounded-xl shadow-inner border border-slate-200">
      <img 
        src={qrApiUrl} 
        alt="Generated Static QR Code"
        width={size}
        height={size}
        className="rounded-lg object-contain"
      />
    </div>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Section collapse states
  const [openSections, setOpenSections] = useState({
    contact: true,
    company: true,
    summary: true
  });

  // Contact details
  const contactData = {
    name: "Cesar D. Lapid",
    avatarImage,
    carImage,
    phones: [
      "09172429857",
      "09081647499"
    ],
    location: "2600, Baguio City, Benguet, Philippines",
    company: "MAHALO",
    title: "Driver",
    summary: "RIDE BAGUIO'S 1ST FULL ELECTRIC BYD TAXI; FOR TOURS / SIGHTSEEING AROUND BAGUIO CITY"
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const downloadVCard = () => {
    const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:${contactData.name}
TITLE:${contactData.title}
ORG:${contactData.company}
TEL;TYPE=CELL:${contactData.phones[0]}
TEL;TYPE=CELL:${contactData.phones[1]}
ADR;TYPE=WORK:;;${contactData.location}
NOTE:${contactData.summary}
END:VCARD`;

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${contactData.name.replace(/\s+/g, '_')}_vcard.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    } else {
      document.execCommand('copy');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-0 sm:p-4 font-sans text-[#353833] relative overflow-x-hidden">
      
      {/* Animated Welcome Splash Screen */}
      {showSplash && (
        <div 
          onClick={() => setShowSplash(false)}
          className="fixed inset-0 z-50 bg-[#353833] flex flex-col justify-between items-center p-8 text-center cursor-pointer transition-opacity duration-500 animate-in fade-in"
        >
          <div className="w-full flex justify-end">
            <span className="text-xs text-slate-400 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              Tap to skip
            </span>
          </div>

          <div className="flex flex-col items-center w-full max-w-sm">
            <div className="relative w-full mb-6 transform animate-bounce duration-1000">
              <div className="absolute inset-0 bg-[#E2FEA2]/20 blur-2xl rounded-full scale-75"></div>
              <img 
                src={contactData.carImage} 
                alt="Baguio Electric BYD Taxi" 
                className="w-full h-auto object-contain  relative z-10 drop-shadow-2xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = avatarImage;
                }}
              />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E2FEA2] text-[#353833]">
                <Sparkles className="w-3.5 h-3.5" />
                1st Full Electric BYD Taxi
              </span>
              <h1 className="text-2xl font-bold text-white tracking-wide">{contactData.name}</h1>
              <p className="text-sm text-slate-300">{contactData.company} • {contactData.title}</p>
            </div>
          </div>

          <div className="w-full max-w-xs space-y-2">
            <div className="w-full bg-slate-700/50 rounded-full h-1 overflow-hidden">
              <div className="bg-[#E2FEA2] h-full w-full animate-pulse"></div>
            </div>
            <p className="text-[11px] text-slate-400">Loading digital contact card...</p>
          </div>
        </div>
      )}

      {/* Main Card View */}
      <div className="w-full max-w-md bg-white sm:rounded-4xl shadow-xl overflow-hidden min-h-screen sm:min-h-[750px] flex flex-col my-auto relative border border-slate-200">
        
        {/* Top Dark Section (#353833) */}
        <div className="bg-[#353833] text-white pt-10 pb-14 px-6 relative flex flex-col items-center text-center rounded-b-4xl shadow-md">
          
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={() => setShowQrModal(true)}
              aria-label="Show QR Code"
              className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all shadow"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button 
              onClick={copyShareLink}
              aria-label="Share Link"
              className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all shadow relative"
            >
              {copied ? <Check className="w-4 h-4 text-[#E2FEA2]" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>

          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-white/10 overflow-hidden shadow-lg bg-slate-700 flex items-center justify-center">
              <img 
                src={contactData.avatarImage} 
                alt={contactData.name} 
                className="w-full h-full bg-taupe-200 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = avatarImage;
                }}
              />
            </div>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white mb-4">
            {contactData.name}
          </h1>

          <button 
            onClick={downloadVCard}
            className="w-full max-w-xs py-3 px-6 bg-[#E2FEA2] hover:bg-[#d6f592] text-[#353833] font-bold rounded-full shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span className="w-5 h-5 rounded-full border-2 border-[#353833] flex items-center justify-center font-bold text-xs">+</span>
            Add contact
          </button>
        </div>

        {/* Details Content */}
        <div className="px-4 -mt-6 pb-8 space-y-4 flex-1 z-10">

          {/* 1. Contact Card */}
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden transition-all">
            <button 
              onClick={() => toggleSection('contact')}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 text-[#353833] rounded-4xl">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-semibold text-base text-[#353833]">Contact</span>
              </div>
              {openSections.contact ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.contact && (
              <div className="px-4 pb-4 pt-1 space-y-4 border-t border-slate-50">
                {contactData.phones.map((phone, index) => (
                  <div key={index} className="flex items-start gap-3 pl-2">
                    <div className="p-2 bg-slate-50 text-slate-500 rounded-4xl mt-0.5">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-400 font-medium">Mobile</p>
                      <a href={`tel:${phone}`} className="text-sm font-semibold text-[#353833] hover:underline">
                        {phone}
                      </a>
                    </div>
                  </div>
                ))}

                <hr className="border-slate-100" />

                <div className="flex items-start gap-3 pl-2">
                  <div className="p-2 bg-slate-50 text-slate-500 rounded-4xl mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 font-medium">Location:</p>
                    <p className="text-sm font-semibold text-[#353833] leading-snug">
                      {contactData.location}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Company Card */}
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden transition-all">
            <button 
              onClick={() => toggleSection('company')}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 text-[#353833] rounded-4xl">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span className="font-semibold text-base text-[#353833]">Company</span>
              </div>
              {openSections.company ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.company && (
              <div className="px-4 pb-4 pt-1 space-y-4 border-t border-slate-50">
                <div className="flex items-start gap-3 pl-2">
                  <div className="p-2 bg-slate-50 text-slate-500 rounded-4xl mt-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 font-medium">Company:</p>
                    <p className="text-sm font-bold text-[#353833]">
                      {contactData.company}
                    </p>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="flex items-start gap-3 pl-2">
                  <div className="p-2 bg-slate-50 text-slate-500 rounded-4xl mt-0.5">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 font-medium">Title:</p>
                    <p className="text-sm font-semibold text-[#353833]">
                      {contactData.title}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Summary Card */}
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden transition-all">
            <button 
              onClick={() => toggleSection('summary')}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 text-[#353833] rounded-4xl">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="font-semibold text-base text-[#353833]">Summary</span>
              </div>
              {openSections.summary ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.summary && (
              <div className="px-4 pb-4 pt-2 border-t border-slate-50">
                <p className="text-xs font-semibold text-[#353833] leading-relaxed uppercase tracking-wide bg-slate-50 p-3 rounded-4xl border border-slate-100">
                  {contactData.summary}
                </p>
              </div>
            )}
          </div>

          <div className="pt-2 text-center">
            <button 
              onClick={() => setShowSplash(true)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#353833] transition-colors py-1 px-3 rounded-full hover:bg-slate-100"
            >
              <Car className="w-3.5 h-3.5" />
              View Welcome Vehicle Animation
            </button>
          </div>

        </div>
      </div>

      {/* Dynamic QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl p-6 max-w-xs w-full text-center relative shadow-2xl animate-in fade-in zoom-in duration-200 border border-slate-100">
            <button 
              onClick={() => setShowQrModal(false)}
              aria-label="Close QR Modal"
              className="absolute top-4 right-4 text-slate-400 hover:text-[#353833] p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#353833] mb-1">Scan QR Code</h3>
            <p className="text-xs text-slate-500 mb-4">Scan to view contact card on mobile</p>

            {/* Dynamic QR Component */}
            <div className="mb-4 flex justify-center">
              <DynamicQRCode value={window.location.href} size={200} />
            </div>

            <button
              onClick={copyShareLink}
              className="w-full py-2.5 px-4 bg-[#353833] hover:bg-slate-700 text-white font-medium text-sm rounded-4xl transition-colors flex items-start justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-[#E2FEA2]" /> : <Copy className="w-4 h-4" />}
              {copied ? "Link Copied!" : "Copy Share Link"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}