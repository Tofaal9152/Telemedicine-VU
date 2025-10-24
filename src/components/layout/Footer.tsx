import { teamMembers } from "@/constants/FooterData";
import AppImage from "../ui/AppImage";
const Footer = () => {
  return (
    <footer className="bg-white/95 dark:bg-gray-900/95  py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Telemedicine Project Team</h2>
          <p className="text-gray-300">
            A collaborative effort in healthcare technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4 mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 group-hover:border-blue-400 transition-colors">
                <AppImage
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-lg font-semibold mb-1 text-blue-400">
                {member.name}
              </h3>

              <p className="text-gray-300 mb-1">{member.role}</p>

              {member.id && (
                <p className="text-sm text-gray-400 mb-1">ID: {member.id}</p>
              )}

              {member.institution && (
                <p className="text-sm text-gray-400">{member.institution}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Telemedicine Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
