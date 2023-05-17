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

  return {
    error: "Internal error.",
  };
}
