import { useMediaQuery } from "@vueuse/core";

export function useResponsiveData() {
  return {
    isMobile: useMediaQuery("(max-width: 768px)"),
  };
}
