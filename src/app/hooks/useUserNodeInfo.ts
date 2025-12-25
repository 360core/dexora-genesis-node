import { useQuery } from '@tanstack/react-query';
import { formatUnits } from 'viem';

export type UserNodeInfo = {
    referrer: `0x${string}`;
    bondedAmount: string;
    unbondedAmount: string;
    bondedAt: bigint;
    lastClaim: bigint;
    nodeType: number;
};

export function useUserNodeInfo(
    genesisNode,
    address?: `0x${string}`
) {
    return useQuery<UserNodeInfo>({
        queryKey: ['user-node-info', address],
        enabled: !!genesisNode && !!address,
        staleTime: 30_000,

        queryFn: async (): Promise<UserNodeInfo> => {
            const result = await genesisNode.getUserNodeInfo(address);

            return {
                referrer: result[0] as `0x${string}`,
                bondedAmount: formatUnits(result[1], 18),
                unbondedAmount: formatUnits(result[2], 18),
                bondedAt: result[3],
                lastClaim: result[4],
                nodeType: Number(result[5]),
            };
        },
    });
}
