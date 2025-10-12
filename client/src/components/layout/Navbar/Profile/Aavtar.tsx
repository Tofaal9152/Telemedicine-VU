import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2Icon } from "lucide-react";

const Aavtar = ({ image, className }: { image?: any; className: string }) => {
  return (
    <Avatar className={`${className} cursor-pointer`}>
      <AvatarImage src={image == "" ? null : image} />
      <AvatarFallback>
        <User2Icon />
      </AvatarFallback>
    </Avatar>
  );
};

export default Aavtar;
