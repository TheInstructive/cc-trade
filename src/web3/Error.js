export class Web3ClientError extends Error {}

export function returnError(err) {
  console.error(err);

  if (err instanceof Web3ClientError) {
    return {
      error: err.message,
    };
  }

  return {
    error: "Internal error.",
  };
}
