import { AdoptionProfile } from "./AdoptionProfile";
import { AdoptionRequestId } from "./AdoptionRequests";

export type RequestWithProfile = {
  request: AdoptionRequestId;
  profile: AdoptionProfile | null;
};