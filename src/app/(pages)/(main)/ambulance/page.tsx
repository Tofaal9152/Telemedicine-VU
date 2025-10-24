"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Hospital,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";

const ambulanceData = [
  {
    id: 1,
    hospitalName: "Square Hospitals Ltd.",
    contactNumber: "10616",
    location: "Dhaka",
    availability: true,
  },
  {
    id: 2,
    hospitalName: "United Hospital Limited",
    contactNumber: "10666",
    location: "Gulshan, Dhaka",
    availability: true,
  },
  {
    id: 3,
    hospitalName: "Evercare Hospital Dhaka",
    contactNumber: "10678",
    location: "Bashundhara, Dhaka",
    availability: true,
  },
  {
    id: 4,
    hospitalName: "Dhaka Medical College Hospital",
    contactNumber: "02-8626812",
    location: "Dhaka",
    availability: false,
  },
  {
    id: 5,
    hospitalName: "Popular Diagnostic Center",
    contactNumber: "09613-787801",
    location: "Dhanmondi, Dhaka",
    availability: true,
  },
  {
    id: 6,
    hospitalName: "Labaid Specialized Hospital",
    contactNumber: "10606",
    location: "Dhanmondi, Dhaka",
    availability: true,
  },
  {
    id: 7,
    hospitalName: "National Heart Foundation Hospital",
    contactNumber: "02-58054708",
    location: "Mirpur, Dhaka",
    availability: false,
  },
  {
    id: 8,
    hospitalName: "Chittagong Medical College Hospital",
    contactNumber: "031-619441",
    location: "Chattogram",
    availability: true,
  },
  {
    id: 9,
    hospitalName: "Rajshahi Medical College Hospital",
    contactNumber: "0721-775346",
    location: "Rajshahi",
    availability: true,
  },
  {
    id: 10,
    hospitalName: "Sylhet MAG Osmani Medical College",
    contactNumber: "0821-716045",
    location: "Sylhet",
    availability: true,
  },
  {
    id: 11,
    hospitalName: "Barisal Sher-E-Bangla Medical College",
    contactNumber: "0431-217812",
    location: "Barisal",
    availability: false,
  },
  {
    id: 12,
    hospitalName: "Khulna Medical College Hospital",
    contactNumber: "041-760241",
    location: "Khulna",
    availability: true,
  },
  {
    id: 13,
    hospitalName: "Mymensingh Medical College Hospital",
    contactNumber: "091-51303",
    location: "Mymensingh",
    availability: true,
  },
  {
    id: 14,
    hospitalName: "Rangpur Medical College",
    contactNumber: "0521-62470",
    location: "Rangpur",
    availability: false,
  },
  {
    id: 15,
    hospitalName: "BIRDEM General Hospital",
    contactNumber: "02-9661551",
    location: "Shahbagh, Dhaka",
    availability: true,
  },
  {
    id: 16,
    hospitalName: "Ibn Sina Hospital",
    contactNumber: "10615",
    location: "Dhanmondi, Dhaka",
    availability: true,
  },
  {
    id: 17,
    hospitalName: "Holy Family Red Crescent Medical College",
    contactNumber: "02-9337301",
    location: "Eskaton, Dhaka",
    availability: false,
  },
  {
    id: 18,
    hospitalName: "Enam Medical College Hospital",
    contactNumber: "01716-000000",
    location: "Savar, Dhaka",
    availability: true,
  },
  {
    id: 19,
    hospitalName: "National Institute of Neurosciences",
    contactNumber: "02-9140752",
    location: "Agargaon, Dhaka",
    availability: true,
  },
  {
    id: 20,
    hospitalName: "Shaheed Suhrawardy Medical College",
    contactNumber: "02-9122560",
    location: "Sher-E-Bangla Nagar, Dhaka",
    availability: true,
  },
  {
    id: 21,
    hospitalName: "Kurmitola General Hospital",
    contactNumber: "02-55062350",
    location: "Cantonment, Dhaka",
    availability: true,
  },
  {
    id: 22,
    hospitalName: "Sir Salimullah Medical College Hospital (Mitford)",
    contactNumber: "02-7310061",
    location: "Old Dhaka",
    availability: true,
  },
  {
    id: 23,
    hospitalName: "Dhaka Shishu Hospital",
    contactNumber: "02-9128301",
    location: "Sher-E-Bangla Nagar, Dhaka",
    availability: false,
  },
  {
    id: 24,
    hospitalName: "BRB Hospital",
    contactNumber: "10647",
    location: "Panthapath, Dhaka",
    availability: true,
  },
  {
    id: 25,
    hospitalName: "TMSS Medical College & Hospital",
    contactNumber: "051-51237",
    location: "Bogura",
    availability: true,
  },
  {
    id: 26,
    hospitalName: "Islami Bank Hospital",
    contactNumber: "09611-472472",
    location: "Mirpur, Dhaka",
    availability: true,
  },
  {
    id: 27,
    hospitalName: "Ad-Din Women’s Medical College Hospital",
    contactNumber: "02-7130864",
    location: "Moghbazar, Dhaka",
    availability: true,
  },
];


const AmbulancePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAmbulances = ambulanceData.filter((ambulance) => {
    const term = searchTerm.toLowerCase();
    return (
      ambulance.hospitalName.toLowerCase().includes(term) ||
      ambulance.location.toLowerCase().includes(term) ||
      ambulance.contactNumber.includes(term) ||
      (ambulance.availability ? "available" : "not available").includes(term)
    );
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
         Ambulance Directory
      </h1>

      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search hospital, city, phone or availability..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAmbulances.map((ambulance) => (
          <div
            key={ambulance.id}
            className="p-5 rounded-2xl shadow-xl border  hover:shadow-2xl transition-all space-y-3"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Hospital className="w-5 h-5 " />
              {ambulance.hospitalName}
            </h2>
            <p className="flex text-white items-center gap-2 ">
              <MapPin className="w-4 h-4 text-emerald-500" />
              {ambulance.location}
            </p>
            <p className="flex text-white items-center gap-2 ">
              <Phone className="w-4 h-4" />
              {ambulance.contactNumber}
            </p>
            <Button
              
              className={`w-full justify-center mt-2 ${
                ambulance.availability
                  ? "text-green-600 border-green-500"
                  : "text-red-600 border-red-500"
              }`}
            >
              {ambulance.availability ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Available
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-1" />
                  Not Available
                </>
              )}
            </Button>
          </div>
        ))}
      </div>

      {filteredAmbulances.length === 0 && (
        <p className="text-center ">No ambulances found.</p>
      )}
    </div>
  );
};

export default AmbulancePage;
