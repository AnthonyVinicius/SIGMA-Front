import { registerIfApi } from "./registerIfApi";
import { sigmaApi } from "./sigmaApi";

export const ApiRegistry = {
  registerIF: registerIfApi,
  sigma: sigmaApi,
};
