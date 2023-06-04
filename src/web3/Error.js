import { UserRejectedRequestError } from "@wagmi/core";

export class Web3ClientError extends Error {}

export function returnError(err) {
  console.error(err);

  if (err instanceof Web3ClientError) {
    return {
      error: err.message,
    };
  }

  if (err instanceof UserRejectedRequestError) {
    return {
      error: "User rejected the request.",
    };
  }

  if (err && err.reason) {
    return {
      error: "Chain Error: " + err.reason,
    }
  }

  return {
    error: "Internal error.",
  };
}
