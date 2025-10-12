"use client";

import type React from "react";

import imagePath from "@/constants/imagePath";
import GetProfileData from "@/hooks/GetProfileData";
import { Award, Calendar, CheckCircle, Mail, User, Users } from "lucide-react";
import Image from "next/image";

const HeroSection = ({ role }: { role: any }) => {
  const { query } = GetProfileData({ role });

  if (query.isPending) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white">
        <div className="animate-pulse flex space-x-8">
          <div className="rounded-full bg-white/20 h-48 w-48"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-8 bg-white/20 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-white/20 rounded"></div>
              <div className="h-4 bg-white/20 rounded w-5/6"></div>
              <div className="h-4 bg-white/20 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userData = query.data;
  const imageUrl =
    role === "DOCTOR" ? imagePath.doctorImage : imagePath.patientImage;

  return (
    <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 text-white border border-white/20 hover:bg-white/15 transition-all duration-500 hover:shadow-3xl ">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Profile Image */}
        <div className="w-full lg:w-1/3 flex justify-center group">
          <div className="relative">
           
            <Image
              src={userData?.imageUrl || imageUrl}
              width={240}
              height={240}
              alt="Profile"
              className="rounded-full ring-2 ring-white/20 w-[10rem] h-[10rem] md:w-[12rem] md:h-[12rem] object-cover"
            />
            {userData?.doctor?.isApproved && (
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-white shadow-lg animate-bounce">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="w-full lg:w-2/3 space-y-6">
          {userData ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-fade-in">
                  Welcome back, {userData.name}!
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full animate-expand"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                  value={userData.email}
                />
                <InfoCard
                  icon={<User className="w-5 h-5" />}
                  label="Role"
                  value={userData.role}
                />
                <InfoCard
                  icon={<Users className="w-5 h-5" />}
                  label="Age"
                  value={userData.age}
                />
                <InfoCard
                  icon={<User className="w-5 h-5" />}
                  label="Gender"
                  value={userData.gender}
                />
                <InfoCard
                  icon={<Calendar className="w-5 h-5" />}
                  label="Joined"
                  value={new Date(userData.createdAt).toLocaleDateString()}
                  className="md:col-span-2"
                />
              </div>

              {userData.patient && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <User className="w-6 h-6 text-blue-300" />
                    Patient Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard label="Patient ID" value={userData.patient.id} />
                    <InfoCard label="User ID" value={userData.patient.userId} />
                  </div>
                </div>
              )}

              {userData.doctor && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-emerald-300" />
                    Doctor Information
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InfoCard label="Doctor ID" value={userData.doctor.id} />
                      <InfoCard
                        label="Specialty"
                        value={userData.doctor.specialty}
                      />
                      <InfoCard
                        label="Experience"
                        value={userData.doctor.experience}
                      />
                      <InfoCard
                        label="Status"
                        value={
                          userData.doctor.isApproved ? "Approved" : "Pending"
                        }
                        className={
                          userData.doctor.isApproved
                            ? "text-green-300"
                            : "text-yellow-300"
                        }
                      />
                    </div>
                    {userData.doctor.bio && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-sm text-blue-100 leading-relaxed">
                          {userData.doctor.bio}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Welcome to HealthCare Pro!
              </h1>
              <p className="text-xl text-blue-100">
                Your health journey starts here
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 6rem;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-expand {
          animation: expand 1s ease-out 0.5s both;
        }
      `}</style>
    </section>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
  className = "",
}: {
  icon?: React.ReactNode;
  label: string;
  value: any;
  className?: string;
}) => (
  <div
    className={`bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-all duration-200 hover:scale-105 ${className}`}
  >
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-sm font-medium text-blue-200">{label}</span>
    </div>
    <p className="font-semibold text-white line-clamp-1">{value}</p>
  </div>
);

export default HeroSection;
