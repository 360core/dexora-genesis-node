"use client";
import { request, gql } from "graphql-request";

const endpoint =
  "https://api.goldsky.com/api/public/project_cmheolbv0up0u01x039de2b0p/subgraphs/dexora-genesis-node/1.0.0/gn";

export const GET_USER_REFERRALS = gql`
  query GetUserReferrals($referrer: String!, $first: Int!, $skip: Int!) {
    referralRewardPaids(
      first: $first
      skip: $skip
      orderBy: timestamp_
      orderDirection: desc
      where: { referrer: $referrer }
    ) {
      id
      referrer
      referee
      level
      tokenAmount
      block_number
      timestamp_
      transactionHash_
      contractId_
    }
  }
`;

export async function fetchUserReferrals(
  referrer,
  first = 50,
  skip = 0
) {
  const variables = {
    referrer: referrer.toLowerCase(), // ⚠️ always lowercase
    first,
    skip,
  };

  try {
    const data = await request(endpoint, GET_USER_REFERRALS, variables);
    console.log(data, "datadatadatadatadatadatadata")
    return data.referralRewardPaids;
  } catch (err) {
    console.error("GraphQL Error:", err.response || err);
    return [];
  }
}
