import { IsNotEmpty, IsString } from "class-validator";

export class CreateChatDto {



    @IsString()
    @IsNotEmpty()
    content: string;
    
    @IsString()
    @IsNotEmpty()
    userId: string;
    
    @IsString()
    @IsNotEmpty()
    doctorId: string;
    
    @IsString()
    @IsNotEmpty()
    patientId: string;
   
    
}