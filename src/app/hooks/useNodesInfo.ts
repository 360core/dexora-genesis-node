import { useQuery } from '@tanstack/react-query';

export function useNodesInfo(genesisNode) {
    return useQuery({
        queryKey: ['nodes-info'],
        queryFn: async () => {
            const result = await genesisNode.getNodesInfo();
            const [
                priceInUSDT,
                totalSupply,
                instantBonus,
                currentSupply,
                monthlyRate,
            ] = result;

            return {
                priceInUSDT: [...priceInUSDT].reverse(),
                totalSupply: [...totalSupply].reverse(),
                instantBonus: [...instantBonus].reverse(),
                currentSupply: [...currentSupply].reverse(),
                monthlyRate: [...monthlyRate].reverse(),
            };
        },
        enabled: !!genesisNode,          // ✅ optional call
        staleTime: 30_000,               // ⏱ 30 seconds cache
        // cacheTime: 5 * 60_000,            // keep in memory
    });
}
