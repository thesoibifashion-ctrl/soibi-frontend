const listeners = new Set<() => void>();
let visible = false;

const notify = () => listeners.forEach((listener) => listener());

export const networkStatus = {
  isVisible: () => visible,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  },
  reportFailure: () => {
    if (visible) return;
    visible = true;
    notify();
  },
  reportResponse: () => {
    if (!visible) return;
    visible = false;
    notify();
  },
  dismiss: () => {
    visible = false;
    notify();
  },
};

export const isNetworkFailure = (error: unknown) =>
  error instanceof TypeError ||
  (error instanceof Error && error.name === "NetworkError") ||
  (typeof error === "object" && error !== null && "response" in error && !(error as { response?: unknown }).response && "isAxiosError" in error);

export const reportNetworkFailure = (error: unknown) => {
  if (error instanceof Error && error.name === "AbortError") return;
  if (isNetworkFailure(error) || (error instanceof Error && "isNetworkError" in error)) networkStatus.reportFailure();
};

export const networkError = () => {
  const error = new Error("Network error. Please check your internet connection.") as Error & { isNetworkError: boolean };
  error.isNetworkError = true;
  return error;
};

export async function trackedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  try {
    const response = await fetch(input, init);
    networkStatus.reportResponse();
    return response;
  } catch (error) {
    reportNetworkFailure(error);
    if (error instanceof Error && error.name === "AbortError") throw error;
    if (isNetworkFailure(error)) throw networkError();
    throw error;
  }
}
