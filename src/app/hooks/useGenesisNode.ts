import {
    defaultChainId,
    genesisNodeAddress,
    genesisNodeAbi,
} from "../constant";
import { useAccount, useChains, usePublicClient, useWriteContract } from "wagmi";
import { Abi, erc20Abi } from "viem";

export type NodesInfoResult = readonly [
    readonly bigint[],
    readonly bigint[],
    readonly bigint[],
    readonly bigint[],
    readonly bigint[]
];

const GENESIS_NODE_ABI = genesisNodeAbi as Abi;
const GENESIS_NODE_ADDRESS = genesisNodeAddress as `0x${string}`;

export const useGenesisNode = () => {
    const { address: userAddress } = useAccount();
    const publicClient = usePublicClient({ chainId: defaultChainId });
    const { writeContractAsync } = useWriteContract();

    interface ReadContractParams {
        address: `0x${string}`;
        abi: Abi;
        functionName: string;
        args?: unknown[];
    }

    const chains = useChains();
    const chain = chains.find(c => c.id === defaultChainId);

    // ✅ Reusable read
    const customReadContract = async <TReturn>({
        address,
        abi,
        functionName,
        args = [],
    }: ReadContractParams): Promise<TReturn> => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (publicClient as unknown as any).readContract({
            abi: abi as Abi,
            functionName,
            address,
            args,
        });

        return result as TReturn;
    };

    const fetchBalance = async (token: `0x${string}`, userAddress: `0x${string}`) => {
        if (!token || !userAddress) return BigInt(0);

        if (token === "0x0000000000000000000000000000000000000000") {
            const balance = await publicClient.getBalance({ address: userAddress });
            return balance;
        }

        // ERC20 token
        const balance = await customReadContract<bigint>({
            address: token as `0x${string}`,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [userAddress],
        });

        return balance as bigint;
    };

    // ✅ Check allowance
    const checkAllowance = async (owner: `0x${string}`, token: `0x${string}`) => {
        return await customReadContract<bigint>({
            address: token,
            abi: erc20Abi,
            functionName: "allowance",
            args: [owner, GENESIS_NODE_ADDRESS],
        });
    };

    // ✅ Approve
    const approve = async (token: `0x${string}`, amount: bigint) => {
        return await writeContractAsync({
            address: token as `0x${string}`,
            abi: erc20Abi,
            functionName: "approve",
            args: [GENESIS_NODE_ADDRESS, amount] as const,
            account: userAddress,
            chain
        });
    };

    // GENESIS NODE FUNCTIONS
    const createNode = async (nodeType: string, referrer: `0x${string}`) => {
        // console.log(nodeType, referrer, "nodeType, referrer")
        return await writeContractAsync({
            address: GENESIS_NODE_ADDRESS,
            abi: GENESIS_NODE_ABI,
            functionName: "createNode",
            args: [nodeType, referrer] as const,
            account: userAddress,
            chain
        });
    };

    // ✅ Claim rewards
    const claimReward = async () => {
        return await writeContractAsync({
            address: GENESIS_NODE_ADDRESS,
            abi: GENESIS_NODE_ABI,
            functionName: "claimReward",
            args: [] as const,
            account: userAddress,
            chain
        });
    };

    // ✅ Unbond
    const unbond = async () => {
        return await writeContractAsync({
            address: GENESIS_NODE_ADDRESS,
            abi: GENESIS_NODE_ABI,
            functionName: "unbond",
            args: [] as const,
            account: userAddress,
            chain
        });
    };

    // ✅ Claim referral rewards
    const claimReferralRewards = async () => {
        return await writeContractAsync({
            address: GENESIS_NODE_ADDRESS,
            abi: GENESIS_NODE_ABI,
            functionName: "claimReferralRewards",
            args: [] as const,
            account: userAddress,
            chain
        });
    };

    // ✅ Wait for transaction receipt

    const waitForTransactionReceipt = async (
        tx: { hash: `0x${string}` } | `0x${string}`
    ) => {
        const hash = typeof tx === "string" ? tx : tx.hash;
        return publicClient.waitForTransactionReceipt({ hash });
    };

    const getNodesInfo = async (): Promise<NodesInfoResult> => {
        return await customReadContract({
            address: GENESIS_NODE_ADDRESS,
            abi: GENESIS_NODE_ABI,
            functionName: "getNodesInfo",
            args: [],
        });
    };

    const isGenesisNode = async (userAddress: `0x${string}`) => {
        return await customReadContract({
            address: GENESIS_NODE_ADDRESS,
            abi: GENESIS_NODE_ABI,
            functionName: "isGenesisNode",
            args: [userAddress],
        });
    };

    const getUserNodeInfo = async (userAddress: `0x${string}`) => {
        return await customReadContract({
            address: GENESIS_NODE_ADDRESS,
            abi: GENESIS_NODE_ABI,
            functionName: "getUserNodeInfo",
            args: [userAddress],
        });
    };

    const getUserNodeView = async (userAddress: `0x${string}`) => {
        return await customReadContract({
            address: GENESIS_NODE_ADDRESS,
            abi: GENESIS_NODE_ABI,
            functionName: "getUserNodeView",
            args: [userAddress],
        });
    };


    return {
        fetchBalance,
        checkAllowance,
        getNodesInfo,
        isGenesisNode,
        getUserNodeInfo,
        getUserNodeView,


        approve,
        createNode,
        claimReward,
        unbond,
        claimReferralRewards,
        waitForTransactionReceipt
    };

};
