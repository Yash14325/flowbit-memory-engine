import { getCorrections } from "../memory/correctionMemory";
import { getVendorMemory } from "../memory/vendorMemory";

export function recallMemory(invoice: any) {
  return {
    vendorMem: getVendorMemory(invoice.vendor),
    corrections: getCorrections()
  };
}
