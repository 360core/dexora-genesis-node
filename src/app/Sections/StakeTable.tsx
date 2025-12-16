'use client';
import React from 'react';

const stakeData = [
  {
    type: 'Standard Stake',
    days: '24h',
    capital: '100 DORA',
    reward: '16.15 DORA',
    unstakable: '100 DORA',
    claimable: '16.15 DORA',
    status: 'Unlocked',
  },
  {
    type: 'Future Yield',
    days: '7 Days',
    capital: '250 DORA',
    reward: '52.80 DORA',
    unstakable: '250 DORA',
    claimable: '52.80 DORA',
    status: 'Locked',
  },
];

const StakeTable = () => {
  return (
   <div className="bg-card border border-gray-700 rounded-md p-4">
  <h3 className="text-lg font-semibold mb-4">Stake List</h3>

  {/* Scroll wrapper */}
  <div className="w-full overflow-x-auto">
    <table className="min-w-[950px] w-full text-sm">
      <thead className="bg-[#a5b6c4] text-black">
        <tr>
          <th className="px-4 py-2 text-left">Sr No.</th>
          <th className="px-4 py-2 text-left">Stake Type</th>
          <th className="px-4 py-2 text-left">Days</th>
          <th className="px-4 py-2 text-left">Total Capital</th>
          <th className="px-4 py-2 text-left">Total Reward</th>
          <th className="px-4 py-2 text-left">Unstakable</th>
          <th className="px-4 py-2 text-left">Claimable</th>
          <th className="px-4 py-2 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {stakeData.map((item, i) => (
          <tr key={i} className="border-b border-gray-700 hover:bg-gray-800">
            <td className="px-4 py-3 text-left">{i + 1}</td>
            <td className="px-4 py-3 text-left">{item.type}</td>
            <td className="px-4 py-3 text-left">{item.days}</td>
            <td className="px-4 py-3 text-left">{item.capital}</td>
            <td className="px-4 py-3 text-left">{item.reward}</td>
            <td className="px-4 py-3">{item.unstakable}</td>
            <td className="px-4 py-3 text-green-400 text-left">{item.claimable}</td>
            <td className="px-4 py-3">
              <div className="flex gap-2 justify-center">
                <button className="px-3 py-2 text-xs bg-[#bcd7f5] text-black rounded-md">
                  Claim
                </button>
                <button className="px-3 py-2 text-xs bg-[#bcd7f5] text-black rounded-md">
                  Unstake
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default StakeTable;
