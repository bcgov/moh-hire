// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SuccessResponse<C = any> {
  data: C | C[];
}
