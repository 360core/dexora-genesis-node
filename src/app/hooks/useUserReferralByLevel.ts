import { useQuery } from '@tanstack/react-query';
import { formatUnits } from 'viem';

export type UseReferralByLevel = {
    tokenByLevel: string[];          // ["20", "40", "5"]
    referralCountByLevel: number[];  // [3, 6, 1]
};


export function useUserReferralByLevel(
    genesisNode,
    address?: `0x${string}`
) {
    return useQuery<UseReferralByLevel>({
        queryKey: ['user-referral-view', address],
        enabled: !!genesisNode && !!address,
        staleTime: 30_000,
        queryFn: async () => {
            const result = await genesisNode.getUserReferralByLevel(address);

            // viem / ethers returns tuple arrays
            const tokenByLevelRaw = result[0];
            const referralCountByLevelRaw = result[1];

            return {
                tokenByLevel: tokenByLevelRaw.map((v: bigint) =>
                    formatUnits(v, 18)
                ),
                referralCountByLevel: referralCountByLevelRaw.map((v: bigint) =>
                    Number(v)
                ),
            };
        },
    });
}
