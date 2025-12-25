'use client';
import React, { useState } from 'react';
import { UserNodeView } from '../hooks/useUserNodeView';
import { useGenesisNode } from '../hooks/useGenesisNode';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

type Props = {
  userNode?: UserNodeView | null;
  userNodeLoading?: boolean;
};

const StakeTable = ({ userNode, userNodeLoading }: Props) => {
  const { address } = useAccount();
  const genesisNode = useGenesisNode();
  const queryClient = useQueryClient();

  const [claiming, setClaiming] = useState(false);
  const [unbonding, setUnbonding] = useState(false);

  const claimReward = async () => {
    if (!genesisNode?.claimReward) return;

    try {
      setClaiming(true);

      const tx = await genesisNode.claimReward();
      const receipt = await genesisNode.waitForTransactionReceipt(tx);

      if (receipt.status !== 'success') {
        throw new Error('Claim failed');
      }

      queryClient.invalidateQueries({
        queryKey: ['user-node-view', address],
      });

      toast.success('Rewards claimed successfully 🎉');
    } catch {
      toast.error('Claim transaction failed');
    } finally {
      setClaiming(false);
    }
  };

  const unbond = async () => {
    if (!genesisNode?.unbond) return;

    try {
      setUnbonding(true);

      const tx = await genesisNode.unbond();
      const receipt = await genesisNode.waitForTransactionReceipt(tx);

      if (receipt.status !== 'success') {
        throw new Error('Unbond failed');
      }
      
      queryClient.invalidateQueries({
        queryKey: ['user-node-view', address],
      });

      toast.success('Unbond successful 🎉');
    } catch {
      toast.error('Unbond transaction failed');
    } finally {
      setUnbonding(false);
    }
  };

  if (userNodeLoading) {
    return (
      <div className="bg-card border border-gray-700 rounded-md p-6 text-center text-stone-300">
        Loading stake data...
      </div>
    );
  }

  if (!userNode || !userNode.hasNode) {
    return (
      <div className="bg-card border border-gray-700 rounded-md p-6 text-center text-stone-400">
        No active node found
      </div>
    );
  }

  const nodeName =
    userNode.nodeType === 1
      ? 'Base Genesis Node'
      : userNode.nodeType === 2
        ? 'Core Genesis Node'
        : 'Premium Genesis Node';

  const hasClaimable = Number(userNode.pendingReward) > 0;
  const hasUnbondable = Number(userNode.availableToUnbond) > 0;

  return (
    <div className="bg-card border border-gray-700 rounded-md p-4">
      <h3 className="text-lg font-semibold mb-4">Stake Details</h3>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[950px] w-full text-sm">
          <thead className="bg-[#a5b6c4] text-black">
            <tr>
              <th className="px-4 py-2 text-left">Sr No.</th>
              <th className="px-4 py-2 text-left">Node Type</th>
              <th className="px-4 py-2 text-left">Bonded Amount</th>
              <th className="px-4 py-2 text-left">Pending Reward</th>
              <th className="px-4 py-2 text-left">Unbondable</th>
              <th className="px-4 py-2 text-left">APR</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray-700 hover:bg-gray-800">
              <td className="px-4 py-3">1</td>
              <td className="px-4 py-3">{nodeName}</td>
              <td className="px-4 py-3">
                {Number(userNode.bondedAmount).toFixed(4)}
              </td>
              <td className="px-4 py-3 text-green-400">
                {Number(userNode.pendingReward).toFixed(4)}
              </td>
              <td className="px-4 py-3">
                {Number(userNode.availableToUnbond).toFixed(4)}
              </td>
              <td className="px-4 py-3">
                {userNode.rewardRate?.toFixed(2)}%
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2 justify-center">
                  {/* CLAIM */}
                  <button
                    onClick={claimReward}
                    disabled={!hasClaimable || claiming || unbonding}
                    className="px-3 py-2 text-xs rounded-md font-semibold
                      bg-[#bcd7f5] text-black disabled:opacity-50
                      flex items-center gap-2"
                  >
                    {claiming && (
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    )}
                    Claim
                  </button>

                  {/* UNBOND */}
                  <button
                    onClick={unbond}
                    disabled={!hasUnbondable || unbonding || claiming}
                    className="px-3 py-2 text-xs rounded-md font-semibold
                      bg-[#bcd7f5] text-black disabled:opacity-50
                      flex items-center gap-2"
                  >
                    {unbonding && (
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    )}
                    Unstake
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StakeTable;
