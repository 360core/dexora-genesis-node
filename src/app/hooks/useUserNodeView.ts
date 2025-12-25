import { useQuery } from '@tanstack/react-query';
import { formatUnits } from 'viem';

export type UserNodeView = {
    hasNode: boolean;

    // Node identity
    nodeType: number;            // 1 = BASE | 2 = CORE | 3 = PREMIUM
    referrer: `0x${string}`;

    // Bonding (formatted)
    bondedAmount: string;        // formatted ETH / token
    unbondedAmount: string;        // formatted ETH / token
    bondedAt: number;            // unix timestamp
    lastClaim: number;           // unix timestamp

    // Rewards (formatted)
    pendingReward: string;
    availableToUnbond: string;

    // Node economics (UI friendly)
    rewardRate: number;         // APR %
    instantBonus: number;        // %

    // Referral
    referralCount: number;
    referralClaimable: string;
    referralTotalEarned: string;
};


export function useUserNodeView(
    genesisNode,
    address?: `0x${string}`
) {
    return useQuery<UserNodeView>({
        queryKey: ['user-node-view', address],
        enabled: !!genesisNode && !!address,
        staleTime: 30_000,          // 30 seconds
        queryFn: async () => {
            const result = await genesisNode.getUserNodeView(address);

            const {
                hasNode,
                nodeType,
                referrer,
                bondedAmount,
                unbondedAmount,
                bondedAt,
                lastClaim,
                pendingReward,
                availableToUnbond,
                rewardRate,
                instantBonus,
                referralCount,
                referralClaimable,
                referralTotalEarned,
            } = result;

            return {
                hasNode,
                nodeType: Number(nodeType),
                referrer,

                bondedAmount: formatUnits(bondedAmount, 18),
                unbondedAmount: formatUnits(unbondedAmount, 18),
                bondedAt: Number(bondedAt),
                lastClaim: Number(lastClaim),

                pendingReward: formatUnits(pendingReward, 18),
                availableToUnbond: formatUnits(availableToUnbond, 18),

                rewardRate: Number(rewardRate) / 100,
                instantBonus: Number(instantBonus) / 100,

                referralCount: Number(referralCount),
                referralClaimable: formatUnits(referralClaimable, 18),
                referralTotalEarned: formatUnits(referralTotalEarned, 18),
            };

        },
    });
}
