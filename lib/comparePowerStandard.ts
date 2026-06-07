import { comparePowerCompatibility } from "@/lib/comparePowerCompatibility";

export function comparePowerStandard(originCountryCode: string, destinationCountryCode: string) {
  return comparePowerCompatibility(originCountryCode, destinationCountryCode);
}
