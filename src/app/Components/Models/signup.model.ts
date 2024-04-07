export interface SignUpObj {
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    email: string | null;
    department: string | null;
    mobileNumber: string | null;
    telephoneNumber: string | null;
    brandName: string | null;
    deliveryName: string | null;
    deliveryStreet: string | null;
    deliveryHouseNr: string | null;
    deliveryPostcode: string | null;
    deliveryCity: string | null;
    deliveryCountry: string | null;
    billingName: string | null;
    billingStreet: string | null;
    billingHouseNr: string | null;
    billingPostcode: string | null;
    billingCity: string | null;
    billingCountry: string | null;
    contactPersons: {
      id: string | null;
      name: string | null;
      telephone: string | null;
      mobile: string | null;
      email: string | null;
      country: string | null;
    }[];
  }