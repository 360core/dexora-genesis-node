import { useEffect, useState } from "react";
import { isAddress } from "viem";

export const REFERRAL_KEY = "dexora_referral";

export function useReferral() {
  const [referral, setReferral] = useState<`0x${string}` | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const queryRef = urlParams.get("ref");
    const storedRef = localStorage.getItem(REFERRAL_KEY);

    if (queryRef && isAddress(queryRef)) {
      const addr = queryRef as `0x${string}`;
      localStorage.setItem(REFERRAL_KEY, addr);
      setReferral(addr);
      return;
    }

    if (storedRef && isAddress(storedRef)) {
      setReferral(storedRef as `0x${string}`);
    }
  }, []);

  return referral;
}
