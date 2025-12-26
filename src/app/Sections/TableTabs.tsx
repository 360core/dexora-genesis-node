'use client';
import React, { useState } from 'react';
import StakeTable from './StakeTable';
import ReferralTable from './ReferralTable';
import { UserNodeView } from '../hooks/useUserNodeView';

type Props = {
  userNode?: UserNodeView | null;
  userNodeLoading?: boolean;
};

const TableTabs = ({ userNode, userNodeLoading }: Props) => {
  const [activeTab, setActiveTab] = useState<'stake' | 'referral'>('stake');

  return (
    <div className="mt-6">

      <div className="relative w-fit rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-1 flex gap-1 mx-auto">


        <span
          className={`absolute top-1 bottom-1 w-[50%] rounded-lg bg-gradient-to-r from-[#bcd7f5] to-[#d9e9ff] transition-all duration-300 ease-out
          ${activeTab === 'stake' ? 'left-1' : 'left-[50%]'}`}
        />

        <button
          onClick={() => setActiveTab('stake')}
          className={`relative z-10 px-5 py-2 text-sm font-semibold rounded-lg transition
            ${activeTab === 'stake'
              ? 'text-black'
              : 'text-slate-300 hover:text-white'
            }`}
        >
          Stake
        </button>

        <button
          onClick={() => setActiveTab('referral')}
          className={`relative z-10 px-5 py-2 text-sm font-semibold rounded-lg transition
            ${activeTab === 'referral'
              ? 'text-black'
              : 'text-slate-300 hover:text-white'
            }`}
        >
          Referral
        </button>
      </div>


      <div className="mt-5 animate-fadeIn">
        {activeTab === 'stake' && (
          <StakeTable
            userNode={userNode}
            userNodeLoading={userNodeLoading}
          />
        )}

        {activeTab === 'referral' && (
          <ReferralTable
            userNode={userNode}
            userNodeLoading={userNodeLoading}
           />
        )}
      </div>
    </div>
  );
};

export default TableTabs;
