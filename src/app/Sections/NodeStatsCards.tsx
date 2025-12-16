'use client';
import React from 'react';
import Image from 'next/image';
import ftrbg from '@/Assets/images/dexfbg.webp';

const Card = ({ title, value, icon }) => (
  <div className="relative rounded-xl border border-[#ffffff20] bg-[#111417] p-6 backdrop-blur overflow-hidden flex flex-col justify-center  items-center gap-3">
    <Image
      src={ftrbg}
      alt="bg"
      className="absolute inset-0 -z-10 w-full h-full object-cover opacity-70"
      priority
    />

    {/* Icon */}
    <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/20 bg-black/30 shrink-0 p-1">
      {icon}
    </div>

    
    <div>
      <p className="text-stone-300 text-base">{title}</p>
      <p className="text-white text-2xl font-semibold mt-1">{value}</p>
    </div>
  </div>
);

const NodeStatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      <Card
        title="Node Name"
        value="Core Genesis Node"
        icon={<NodeIcon />}
      />
      <Card
        title="Investment"
        value="$5,000"
        icon={<DollarIcon />}
      />
      <Card
        title="ROI"
        value="1% Daily"
        icon={<ChartIcon />}
      />
      <Card
        title="Referral Income"
        value="$320"
        icon={<LinkIcon />}
      />
      <Card
        title="Total Referral"
        value="14"
        icon={<UsersIcon />}
      />
    </div>
  );
};

export default NodeStatsCards;



const iconClass =
  'w-10 h-10 text-white opacity-90';

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
    <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
  </svg>
);

const DollarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
    <path d="M12 1v22M17 5H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H7" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
    <path d="M3 3v18h18" />
    <path d="M7 15l4-4 4 3 5-6" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
    <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
    <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
    <circle cx="9" cy="7" r="4" />
    <path d="M17 11a4 4 0 1 0-4-4" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
  </svg>
);
