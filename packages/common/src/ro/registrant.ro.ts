export interface RegistrantRO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialty: string | string[];
  deploymentLocations: string[];
}
