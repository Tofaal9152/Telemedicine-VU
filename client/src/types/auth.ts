export type LoginType = {
  errors: {
    email?: string[];
    password?: string[];
    formError?: string[];
  };
};

export type PatientRegisterType = {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    age?: string[];
    gender?: string[];
    imageUrl?: string[];
    formError?: string[];
  };
};
export type DoctorRegisterType = {
  success?: boolean;
  message?: string;
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    age?: string[];
    gender?: string[];
    specialty?: string[];
    experience?: string[];
    bio?: string[];
    visitFee?: string[];
    registrationNumber?: string[];
    imageUrl?: string[];
    formError?: string[];
  };
};
export enum Role {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}

export type Session = {
  user: {
    id: string;
    email: string;
    name: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
};