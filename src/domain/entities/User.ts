export interface User {
  id: bigint;
  accountId: bigint;
  username: string | null;
  hasPass: boolean;
  passExpiresAt: Date | null;
  registeredAt: Date;
}
