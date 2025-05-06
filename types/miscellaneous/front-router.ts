export interface RouteAuthRule {
  mode: "strict" | "lax";
}
export interface LaxRouteAuthRule extends RouteAuthRule {
  mode: "lax";
}
export interface StrictRouteAuthRule extends RouteAuthRule {
  mode: "strict";
  value: boolean;
}
