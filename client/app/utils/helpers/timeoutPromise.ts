export const timeoutPromise = async (ms: number = 250) => new Promise((res) => setTimeout(() => res(''), ms));
