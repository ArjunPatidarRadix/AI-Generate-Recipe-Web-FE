export function getOverPercentage(
  estimatedCost: number,
  actualCost: number
): string {
  return (((actualCost - estimatedCost) / estimatedCost) * 100).toFixed(1);
}

export function storeToken(token: string) {
  localStorage.setItem("accessToken", token);
}

export function removeToken() {
  localStorage.removeItem("accessToken");
}

export function getToken(): string {
  return localStorage.getItem("accessToken") || "";
}
