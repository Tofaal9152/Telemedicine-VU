import { docSpecialties } from "@/constants/doctorsSpeciality";

const SelectDoctorSpeciality = () => {
  return (
    <select
      className="w-full p-2 border rounded-md bg-slate-950"
      name="specialty"
    >
      <option value="specialty">Select a specialty</option>
      {docSpecialties.map((specialty) => (
        <option key={specialty.id} value={specialty.specialty}>
          {specialty.specialty}
        </option>
      ))}
    </select>
  );
};

export default SelectDoctorSpeciality;
