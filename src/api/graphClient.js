"use client";
import { request, gql } from "graphql-request";

const endpoint =
  "https://api.goldsky.com/api/public/project_cmheolbv0up0u01x039de2b0p/subgraphs/dexora-genesis-node/1.0.0/gn";

export const GET_USER_REFERRALS = gql`
  query GetUserReferrals($receiver: String!, $first: Int!, $skip: Int!) {
    referralRewardDistributeds(
      first: $first
      skip: $skip
      orderBy: timestamp_
      orderDirection: desc
      where: { receiver: $receiver }
    ) {
      id
      receiver
      buyer
      buyerSponsor
      level
      amount
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
    receiver: referrer.toLowerCase(), // ⚠️ always lowercase
    first,
    skip,
  };

  try {
    const data = await request(endpoint, GET_USER_REFERRALS, variables);
    // console.log(data, "datadatadatadatadatadatadata")
    return data.referralRewardDistributeds;
  } catch (err) {
    console.error("GraphQL Error:", err.response || err);
    return [];
  }
}
