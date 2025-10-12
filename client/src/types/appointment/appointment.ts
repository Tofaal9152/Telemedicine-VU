export type AppointmentType = {
  success?: boolean;
  message?: string;
  redirectUrl?: string;
  errors: {
    doctorId?: string;
    formError?: string[];
  };
};
