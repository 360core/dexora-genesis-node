'use client';
import React from 'react';

const referralData = [
  {
    wallet: '0xA1b2...9CDe',
    amount: '100 DORA',
    reward: '10 DORA',
  },
  {
    wallet: '0xF3e4...1aB0',
    amount: '250 DORA',
    reward: '25 DORA',
  },
];

const ReferralTable = () => {
  return (
    <div className="bg-card border border-gray-700 rounded-md p-4">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Referral List</h3>
        <button className="px-4 py-2 text-sm bg-[#bcd7f5] text-black rounded-md font-semibold">
          Claim All
        </button>
      </div>

      {/* 👇 Scroll wrapper */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm">
          <thead className="bg-[#a5b6c4] text-black">
            <tr>
              <th className="px-4 py-2 text-center">Sr No.</th>
              <th className="px-4 py-2 text-center">Wallet</th>
              <th className="px-4 py-2 text-center">Amount</th>
              <th className="px-4 py-2 text-center">Reward</th>
              {/* <th className="px-4 py-2 text-center">Action</th> */}
            </tr>
          </thead>

          <tbody>
            {referralData.map((item, i) => (
              <tr
                key={i}
                className="border-b border-gray-700 hover:bg-gray-800"
              >
                <td className="px-4 py-3 text-center">{i + 1}</td>
                <td className="px-4 py-3 text-center">{item.wallet}</td>
                <td className="px-4 py-3 text-center">{item.amount}</td>
                <td className="px-4 py-3 text-green-400 text-center">{item.reward}</td>
                {/* <td className="px-4 py-3 text-center">
                  <button className="px-3 py-2 text-xs bg-[#bcd7f5] text-black rounded-md">
                    Claim
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralTable;
