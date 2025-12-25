import { useState, useEffect, useCallback } from "react";
import { fetchUserReferrals } from "../../api/graphClient";

export const useReferralRewards = (
  user: string | undefined,
  first = 100,
  skip = 0
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const refetch = useCallback(
    async (withDelay = false, silent = false) => {
      if (!user) return;

      if (!silent) setLoading(true);

      try {
        if (withDelay) {
          // wait for indexing (Goldsky / Graph)
          await new Promise((r) => setTimeout(r, 2500));
        }

        const result = await fetchUserReferrals(user, first, skip);
        setData(result);
      } catch (err) {
        console.error("Referral fetch error:", err);
        setData([]);
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [user, first, skip]
  );

  useEffect(() => {
    refetch(false, false); // show loader on first load
  }, [refetch]);

  return {
    referrals: data,
    loading,
    refetch,
  };
};
