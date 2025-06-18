export interface User {
  id: bigint;
  accountId: bigint;
  username: string;
  hasPass: boolean;
  registeredAt: Date;
}
