export interface JWTPayload {
  username: string;
  sub: string;
  permissions: string[];
}
