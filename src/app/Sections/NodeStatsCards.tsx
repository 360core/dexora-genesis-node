'use client';
import React from 'react';
import Image from 'next/image';
import ftrbg from '@/Assets/images/dexfbg.webp';
import { UserNodeView } from '../hooks/useUserNodeView';
import { UseReferralByLevel } from '../hooks/useUserReferralByLevel';

type Props = {
  userNode?: UserNodeView | null;
  userNodeLoading?: boolean;
  useUserReferralByLevel?: UseReferralByLevel | null;
};

function fmt(value?: string | number, decimals = 4) {
  if (value === undefined || value === null) return '--';
  const n = Number(value);
  if (Number.isNaN(n)) return '--';
  return n.toFixed(decimals);
}

function nodeTypeLabel(type: number) {
  switch (type) {
    case 1:
      return 'Base Genesis Node';
    case 2:
      return 'Core Genesis Node';
    case 3:
      return 'Premium Genesis Node';
    default:
      return '--';
  }
}

const NodeStatsCards = ({ userNode, userNodeLoading: loading, useUserReferralByLevel }: Props) => {
  const isEmpty = !userNode || !userNode.hasNode;

  const referralCountByLevelObj = useUserReferralByLevel?.referralCountByLevel
    ? {
      level_1: useUserReferralByLevel.referralCountByLevel[0] ?? 0,
      level_2: useUserReferralByLevel.referralCountByLevel[1] ?? 0,
      level_3: useUserReferralByLevel.referralCountByLevel[2] ?? 0,
    }
    : {
      level_1: 0,
      level_2: 0,
      level_3: 0,
    };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card
        title="Node Name"
        value={
          loading
            ? 'Loading...'
            : isEmpty
              ? '--'
              : nodeTypeLabel(userNode.nodeType)
        }
        icon={<NodeIcon />}
      />
      <Card
        title="Investment"
        value={loading ? 'Loading...' : fmt(userNode?.bondedAmount)}
        icon={<DollarIcon />}
      />
      <Card
        title="ROI"
        value={loading ? 'Loading...' : isEmpty ? '--' : `${fmt(userNode?.rewardRate, 2)} %`}
        icon={<ChartIcon />}
      />
      <Card
        title="Referral Income"
        value={loading ? 'Loading...' : fmt(userNode?.referralClaimable)}
        icon={<LinkIcon />}
      />
      <Card
        title="Direct Referral"
        value={loading ? 'Loading...' : userNode?.referralCount ?? '--'}
        icon={<UsersIcon />}
      />
      <Card
        title="Level 1"
        value={loading ? 'Loading...' : referralCountByLevelObj?.level_1 ?? '--'}
        icon={<UsersIcon />}
      />
      <Card
        title="Level 2"
        value={loading ? 'Loading...' : referralCountByLevelObj?.level_2 ?? '--'}
        icon={<UsersIcon />}
      />
      <Card
        title="Level 3"
        value={loading ? 'Loading...' : referralCountByLevelObj?.level_3 ?? '--'}
        icon={<UsersIcon />}
      />
    </div>
  );
};

export default NodeStatsCards;


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
      <p className="text-slate-300 text-base">{title}</p>
      <p className="text-white text-2xl font-semibold mt-1">{value}</p>
    </div>
  </div>
);


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
