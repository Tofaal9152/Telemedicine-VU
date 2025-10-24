import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectGenderProps = {
  defaultValue?: string;
  
};

const SelectGender = ({ defaultValue }: SelectGenderProps) => {
  return (
    <Select name="gender" defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="male">Male</SelectItem>
        <SelectItem value="female">Female</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectGender;
