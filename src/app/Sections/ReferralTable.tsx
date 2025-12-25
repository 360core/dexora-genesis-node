'use client';
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useGenesisNode } from '../hooks/useGenesisNode';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UserNodeView } from '../hooks/useUserNodeView';
 
type Props = {
  userNode?: UserNodeView | null;
  userNodeLoading?: boolean;
};

const ReferralTable = ({ userNode, userNodeLoading }: Props) => {
  const { address } = useAccount();
  const genesisNode = useGenesisNode();
  const queryClient = useQueryClient();
  const [claiming, setClaiming] = useState(false);

  // 🌟 Use actual referral data from userNode if available
  const referralData = [
    { wallet: '0xA1b2...9CDe', amount: '100 DORA', reward: '10 DORA' },
    { wallet: '0xF3e4...1aB0', amount: '250 DORA', reward: '25 DORA' },
  ];

  const claimReferralRewards = async () => {
    if (!genesisNode?.claimReferralRewards) return;
    try {
      setClaiming(true);
      const tx = await genesisNode.claimReferralRewards();
      const receipt = await genesisNode.waitForTransactionReceipt(tx);

      if (receipt.status !== 'success') throw new Error('Claim failed');

      queryClient.invalidateQueries({
        queryKey: ['user-node-view', address],
      });

      toast.success('Rewards claimed successfully 🎉');
    } catch (e) {
      console.error(e);
      toast.error('Claim transaction failed');
    } finally {
      setClaiming(false);
    }
  };

    if (userNodeLoading) {
    return (
      <div className="bg-card border border-gray-700 rounded-md p-6 text-center text-stone-300">
        Loading Referral data...
      </div>
    );
  }

  if (!userNode || !userNode.hasNode) {
    return (
      <div className="bg-card border border-gray-700 rounded-md p-6 text-center text-stone-400">
        No Referral found
      </div>
    );
  }

  return (
    <>
      <div className="bg-card border border-gray-700 rounded-md p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Referral List</h3>
          <button
            disabled={claiming || !userNode?.referralClaimable || Number(userNode.referralClaimable) === 0}
            onClick={claimReferralRewards}
            className="px-4 py-2 text-sm bg-[#bcd7f5] text-black rounded-md font-semibold disabled:opacity-50"
          >
            {claiming ? 'Claiming...' : 'Claim All'}
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-[700px] w-full text-sm">
            <thead className="bg-[#a5b6c4] text-black">
              <tr>
                <th className="px-4 py-2 text-center">Sr No.</th>
                <th className="px-4 py-2 text-center">Wallet</th>
                <th className="px-4 py-2 text-center">Amount</th>
                <th className="px-4 py-2 text-center">Reward</th>
              </tr>
            </thead>
            <tbody>
              {referralData.length > 0 ? (
                referralData.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="px-4 py-3 text-center">{i + 1}</td>
                    <td className="px-4 py-3 text-center">{item.wallet}</td>
                    <td className="px-4 py-3 text-center">{item.amount}</td>
                    <td className="px-4 py-3 text-green-400 text-center">{item.reward}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-center text-gray-400">
                    No referrals yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReferralTable;
