'use client';
import React from 'react';
import Image from 'next/image';
import ftrbg from '@/Assets/images/dexfbg.webp';

const PricingCard = ({
  planName,
  tagline,
  nodePrice,
  totalSupply,
  instantBonus,
  totalCapital,
  votingPower,
  dailyRoi,
  privileges = [],
  badge, 
  // ctaText = 'Buy Node',
  // ctaHref = '#',
  icon, 
  iconClassName = '',
  highlighted = false,
  ...props
}) => {
  return (
    <div
      className={[
        'relative px-8 py-10 bg-[#111417] backdrop-blur min-h-64 rounded-xl border',
        highlighted ? 'border-[#7c3aed70] shadow-[0_0_0_1px_#7c3aed30]' : 'border-[#ffffff20]',
      ].join(' ')}
      {...props}
    >
     
      <Image
        src={ftrbg}
        alt="card-bg"
        className="w-full h-full absolute top-0 left-0 right-0 bottom-0 -z-10 rounded-xl object-cover opacity-70"
        priority
      />

    
      {badge ? (
        <div className="absolute top-5 right-5">
          <span className="text-xs tracking-wider uppercase px-3 py-1 rounded-full border border-[#ffffff25] bg-[#00000055] text-white">
            {badge}
          </span>
        </div>
      ) : null}

   
      <div className="flex items-start gap-4">
        {icon ? (
          <div className="flex items-center justify-center p-2 rounded-xl w-fit h-fit border border-[#ffffff20] bg-[#00000030]">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16">
              <Image
                src={icon}
                alt={`${planName} icon`}
                fill
                className={`${iconClassName} object-contain`}
              />
            </div>
          </div>
        ) : null}

        <div className="flex-1">
          <h3 className="text-white text-2xl text-left">{planName}</h3>
          {tagline ? (
            <p className="text-stone-300 text-base mt-1 text-left">{tagline}</p>
          ) : null}
        </div>
      </div>

     
      <div className="mt-7">
        <div className="text-stone-300 text-sm">Node Price</div>
        <div className="text-white text-4xl font-semibold mt-1">{nodePrice}</div>
      </div>

    
      <div className="mt-7 grid grid-cols-2 gap-4">
        <Stat label="Total Supply" value={totalSupply} />
        <Stat label="Instant Bonus" value={instantBonus} />
        <Stat label="Total Capital" value={totalCapital} />
        <Stat label="Voting Power" value={votingPower} />
        <div className="col-span-2">
          <Stat label="Daily ROI (1%)" value={dailyRoi} />
        </div>
      </div>

      
      {privileges?.length ? (
        <div className="mt-8">
          <div className="text-white text-lg font-medium">Privileges</div>
          <ul className="mt-4 space-y-3">
            {privileges.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-stone-300">
                <span className="mt-[7px] h-2 w-2 rounded-full bg-white/60 shrink-0" />
                <span className="text-base leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

     
      
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="rounded-xl border border-[#ffffff14] bg-[#00000025] p-4">
    <div className="text-stone-300 text-xs">{label}</div>
    <div className="text-white text-base font-medium mt-1">{value}</div>
  </div>
);

export default PricingCard;
