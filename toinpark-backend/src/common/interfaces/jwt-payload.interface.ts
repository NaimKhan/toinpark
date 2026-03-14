export interface JwtPayload {
  sub: string;
  email?: string;
  phone?: string;
  role: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  iat?: number;
  exp?: number;
  //referredUser? : any;
}