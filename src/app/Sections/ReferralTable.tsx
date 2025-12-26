'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { useGenesisNode } from '../hooks/useGenesisNode';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UserNodeView } from '../hooks/useUserNodeView';
import { useReferralRewards } from '../hooks/useReferralRewards';

type Props = {
  userNode?: UserNodeView | null;
  userNodeLoading?: boolean;
};

const ReferralTable = ({ userNode }: Props) => {
  const { address } = useAccount();
  const genesisNode = useGenesisNode();
  const queryClient = useQueryClient();
  const [claiming, setClaiming] = useState(false);
    const { address: user, isConnected } = useAccount();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { referrals = [], loading, refetch } = useReferralRewards(user);
  // console.log(referrals, "referralsreferrals")


  // 🌟 Use actual referral data from userNode if available
  // const referralData = [
  //   { wallet: '0xA1b2...9CDe', amount: '100 DORA', reward: '10 DORA' },
  //   { wallet: '0xF3e4...1aB0', amount: '250 DORA', reward: '25 DORA' },
  // ];



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

  // Silent refresh on user change
  useEffect(() => {
    if (user) {
      refetch(true, true);
    }
  }, [user, refetch]);

  // Format referral data
  const allRows = useMemo(() => {
    if (!referrals) return [];

    const formatDate = (timestamp: number) => {
      const date = new Date(Number(timestamp) * 1000);
      const day = date.toLocaleDateString("en-GB");
      const time = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${day} ${time}`;
    };

    const formatHash = (hash: `0x${string}`) => `${hash.slice(0, 6)}...${hash.slice(-4)}`;

    return referrals.map((r) => ({
      date: formatDate(r.timestamp_),
      sponsor: formatHash(r.buyerSponsor),
      referee: formatHash(r.buyer),
      tokenAmount: (Number(r.amount) / 1e18).toFixed(4),
      level: r.level,
      tx: formatHash(r.transactionHash_),
      hashLink: `https://testnet.bscscan.com/tx/${r.transactionHash_}`,
    }));
  }, [referrals]);

  const totalPages = Math.ceil(allRows.length / pageSize);
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return allRows.slice(startIndex, startIndex + pageSize);
  }, [allRows, currentPage]);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  if (loading) {
    return (
      <div className="bg-card border border-gray-700 rounded-md p-6 text-center text-slate-300">
        Loading Referral data...
      </div>
    );
  }

  if (!userNode || !referrals?.length) {
    return (
      <div className="bg-card border border-gray-700 rounded-md p-6 text-center text-slate-400">
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
                <th className="px-4 py-2 text-center">Sponsor</th>
                <th className="px-4 py-2 text-center">User</th>
                <th className="px-4 py-2 text-center">Level</th>
                <th className="px-4 py-2 text-center">Reward</th>
                <th className="px-4 py-2 text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {!isConnected ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-amber-100/80">
                    Connect your wallet to view referral history.
                  </td>
                </tr>
              ) : loading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-amber-100/80">
                    Loading...
                  </td>
                </tr>
              ) : paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-amber-100/80">
                    No referrals found
                  </td>
                </tr>
              ) : (
                paginatedRows.map((r, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="px-4 py-3 text-center">{idx + 1}</td>
                    <td className="px-4 py-3 text-center">{r.sponsor}</td>
                    <td className="px-4 py-3 text-center">{r.referee}</td>
                    <td className="px-4 py-3 text-center">{r.level}</td>
                    <td className="px-4 py-3 text-green-400 text-center">{r.tokenAmount}</td>
                    <td className="px-4 py-3 text-green-400 text-center">{r.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {allRows.length > pageSize && (
          <div className="flex items-center justify-center gap-6 md:gap-10 px-6 py-6">
            <button
              onClick={goPrev}
              disabled={currentPage === 1}
              className={`rounded-lg border border-amber-500/60 px-5 py-2.5 text-sm md:text-base focus:outline-none ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-500/10"
                }`}
            >
              Previous
            </button>
            <span className="text-amber-100/80 text-sm md:text-base">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={goNext}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`rounded-lg border border-amber-500/80 px-5 py-2.5 text-sm md:text-base focus:outline-none ${currentPage === totalPages || totalPages === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-amber-500/10"
                }`}
            >
              Next
            </button>
          </div>
        )}

      </div>
    </>
  );
};

export default ReferralTable;
