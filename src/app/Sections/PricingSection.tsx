'use client';
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import ftrbg from '@/Assets/images/dexfbg.webp';
import Button from '../Components/Button';
import NodeStatsCards from './NodeStatsCards';
import TableTabs from './TableTabs';
import { useAccount } from 'wagmi';
import {NodeType, usdtTokenAddress} from "../constant";
import { useGenesisNode } from '../hooks/useGenesisNode';
import toast from 'react-hot-toast';

// type PricingSectionProps = {
//   address?: string; // 👈 wallet address optional
// };

  const plans = [
    {
      type: NodeType.PREMIUM,
      nodeCost: 20000,
      planName: 'Prime Genesis Node',
      tagline: 'Elite Governance Authority',
      nodePrice: '$20,000',
      totalSupply: '18 Nodes',
      instantBonus: '20% = $4,000',
      votingPower: '5 Votes',
      badge: 'ELITE',
      highlighted: false,
      ctaText: 'Buy Prime Node',
      ctaHref: '/buy/prime',
      privileges: [
        'Senior-level DAO proposal and final decision rights',
        'Direct influence over tokenomics, liquidity, and core economic modules',
        'Priority access to every Dexora upgrade, utility, and protocol expansion',
        'Highest per-node reward allocation across the ecosystem',
      ],
    },
    {
      type: NodeType.CORE,
      nodeCost: 5000,
      planName: 'Core Genesis Node',
      tagline: 'Strategic Builders of Dexora',
      nodePrice: '$5,000',
      totalSupply: '81 Nodes',
      instantBonus: '15% = $750',
      votingPower: '3 Votes',
      badge: 'POPULAR',
      highlighted: true,
      ctaText: 'Buy Core Node',
      ctaHref: '/buy/core',
      privileges: [
        'Proposal rights for partnerships and operational integrations',
        'Strong governance influence at ecosystem level',
        'Enhanced early access to utilities, staking programs, and upgrades',
      ],
    },
    {
      type: NodeType.BASIC,
      nodeCost: 2000,
      planName: 'Base Genesis Node',
      tagline: 'Decentralized Community Backbone',
      nodePrice: '$2,000',
      totalSupply: '800 Nodes',
      instantBonus: '10% = $200',
      votingPower: '1 Vote',
      badge: 'VALUE',
      highlighted: false,
      ctaText: 'Buy Base Node',
      ctaHref: '/buy/base',
      privileges: [
        'Community-level proposal authority',
        'Participation in all major governance decisions',
        'Guaranteed daily revenue share aligned with Dexora activity',
      ],
    },
  ];

export default function PricingSection() {
  const [copied, setCopied] = useState(false);
  const { address } = useAccount();
  const genesisNode = useGenesisNode();
  const [nodes, setNodes] = useState(null);
  

  const baseUrl =
  typeof window !== 'undefined' ? window.location.origin : '';
  const referralAddress = address;
    // process.env.NEXT_PUBLIC_BASE_URL ||
    // (typeof window !== 'undefined' ? window.location.origin : '');

    // useEffect(() => {
    //   if (!genesisNode) return;
    //   (async () => {
    //      try {
    //       const nodesInfo = await genesisNode.getNodesInfo();
    //       // setNodes(nodesInfo);
    //       console.log(nodesInfo, "nodesInfonodesInfo");
    //     } catch (e) {
    //       console.error(e, "wwwwwwwwwwwwwwwwwwwwwwwwwww");
    //     }
    //   })();
    // }, []);

   const handleApprove = async (amount) => {
     if (!genesisNode.approve) return;
    const tx = await genesisNode.approve(usdtTokenAddress, BigInt(amount)); // Approve specified USDT amount
    const receipt = await genesisNode.waitForTransactionReceipt(tx);
    if (receipt.status !== 'success') {
      throw new Error('Approval transaction failed');
    } 
    toast.success('USDT Approved successfully');
   };

   const handleBuyNode = async (plan: typeof plans[number]) => {
     if (!genesisNode.createNode) return;
     const allowance = await genesisNode.checkAllowance(address as `0x${string}`, usdtTokenAddress);
     const requiredAmount = BigInt(plan.nodeCost * 10 ** 6); // Assuming USDT has 6 decimals
     if (allowance < requiredAmount) {
        await handleApprove(requiredAmount);
     }

     const tx = await genesisNode.createNode(plan.type, referralAddress as `0x${string}`);
      const receipt = await genesisNode.waitForTransactionReceipt(tx);
      if (receipt.status !== 'success') {
        throw new Error('Node creation transaction failed');
      }
      toast.success('Node created successfully');
   };

  const referralUrl = useMemo(() => {
    if (!address) return '';
    return `${baseUrl}?ref=${address}`;
  }, [baseUrl, address]);

  const handleCopyReferral = useCallback(async () => {
    if (!referralUrl) return;
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, [referralUrl]);

  const mergedPlans = useMemo(() => {
    if (!nodes) return plans;

    return plans.map((p, i) => ({
      ...p,
      totalSupply: `${nodes.totalSupply[i]} Nodes`,
      instantBonus: `${nodes.instantBonus[i] / 100}%`,
    }));
  }, [nodes]);

  console.log(mergedPlans, "mergedPlansmergedPlansmergedPlans")

  return (
    <section className="relative py-24 md:py-40">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-white text-4xl font-semibold">Dexora Genesis Nodes</h2>
        <p className="text-stone-300 text-lg mt-2">
          Choose your governance power level and secure your position.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
          {plans.map((plan, index) => (
            // <PricingCard key={plan.planName} {...plan} />
            <div
              key={index}
              className={`relative px-4 sm:px-8 py-10 rounded-xl border bg-[#111417] flex flex-col ${
                plan.highlighted ? 'border-[#9de0ff80]' : 'border-white/20'
              }`}
          >
            <Image
              src={ftrbg}
              alt="bg"
              fill
              className="object-cover opacity-50 -z-10"
            />

            {plan.badge && (
              <span className="absolute top-5 right-5 text-xs px-3 py-1 rounded-full bg-white/20 text-white">
                {plan.badge}
              </span>
            )}

            <h3 className="text-white text-2xl">{plan.planName}</h3>
            <p className="text-stone-300 mt-1">{plan.tagline}</p>

            <p className="text-white text-4xl font-semibold mt-4">{plan.nodePrice}</p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Stat label="Supply" value={plan.totalSupply} />
              <Stat label="Bonus" value={plan.instantBonus} />
              <Stat label="Votes" value={plan.votingPower} className="col-span-2" />
            </div>

            <ul className="mt-6 space-y-3 text-stone-300 flex-1 text-start">
              {plan.privileges.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="w-2 h-2 bg-white rounded-full mt-2" />
                  {p}
                </li>
              ))}
            </ul>

            <Button onClick={() => handleBuyNode(plan)} variant="animated" className="w-full mt-6">
              {plan.ctaText}
            </Button>
          </div>
          ))}

        </div>
         <div className=" border bg-[#111417] flex flex-col border-white/20 rounded-lg p-4 bg-card text-left max-w-xl w-full mx-auto mt-10">
            <p className="text-lg font-medium text-white">Referral Link</p>

            <div className="mt-2 flex gap-2">
              <input
                disabled
                value={referralUrl}
                placeholder={
                  address ? 'Referral URL' : 'Connect wallet to generate link'
                }
                className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-[#9de0ff2f] text-white"
              />

              <button
                onClick={handleCopyReferral}
                disabled={!referralUrl}
                className="px-3 py-2 rounded-lg bg-slate-400 hover:bg-slate-500 ring-1 ring-[#9de0ff2f] "
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <div className='mt-10'>
          <NodeStatsCards />


          </div>
             <div className='mt-20'>
             <h3 className='text-4xl text-center '>Stake & Referral</h3>

         <TableTabs />


          </div>
      </div>
    </section>
  );
}



// const PricingCard = ({
//   planName,
//   tagline,
//   nodePrice,
//   totalSupply,
//   instantBonus,
//   votingPower,
//   privileges,
//   badge,
//   highlighted,
//   ctaText,
//   ctaHref,
// }) => (
//   <div
//     className={`relative px-4 sm:px-8 py-10 rounded-xl border bg-[#111417] flex flex-col ${
//       highlighted ? 'border-[#9de0ff80]' : 'border-white/20'
//     }`}
//   >
//     <Image
//       src={ftrbg}
//       alt="bg"
//       fill
//       className="object-cover opacity-50 -z-10"
//     />

//     {badge && (
//       <span className="absolute top-5 right-5 text-xs px-3 py-1 rounded-full bg-white/20 text-white">
//         {badge}
//       </span>
//     )}

//     <h3 className="text-white text-2xl">{planName}</h3>
//     <p className="text-stone-300 mt-1">{tagline}</p>

//     <p className="text-white text-4xl font-semibold mt-4">{nodePrice}</p>

//     <div className="grid grid-cols-2 gap-3 mt-6">
//       <Stat label="Supply" value={totalSupply} />
//       <Stat label="Bonus" value={instantBonus} />
//       <Stat label="Votes" value={votingPower} className="col-span-2" />
//     </div>

//     <ul className="mt-6 space-y-3 text-stone-300 flex-1 text-start">
//       {privileges.map((p, i) => (
//         <li key={i} className="flex gap-2">
//           <span className="w-2 h-2 bg-white rounded-full mt-2" />
//           {p}
//         </li>
//       ))}
//     </ul>

//     <Button href={ctaHref} variant="animated" className="w-full mt-6">
//       {ctaText}
//     </Button>
//   </div>
// );

const Stat = ({ label, value, className = '' }) => (
  <div className={`border border-white/20 rounded-lg p-2 ${className}`}>
    <p className="text-xs text-stone-400">{label}</p>
    <p className="text-white font-medium">{value}</p>
  </div>
);
