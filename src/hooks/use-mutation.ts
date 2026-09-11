"use client";

import {
  useMutation as useTanStackMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";

export function useMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useTanStackMutation(options);
}