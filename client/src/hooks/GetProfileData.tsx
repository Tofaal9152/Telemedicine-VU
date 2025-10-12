import { useFetchData } from "./useFetchData";

const GetProfileData = ({ role }: { role: string }) => {
  const endPoint = role === "PATIENT" ? "/patient/profile" : "/doctor/profile";
  const queryKey = ["profileData"];
  const query = useFetchData<any>(endPoint, queryKey);
  return { query, queryKey, fetcherUrl: endPoint };
};

export default GetProfileData;
