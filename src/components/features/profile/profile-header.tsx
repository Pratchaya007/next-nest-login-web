import { auth } from "@/lib/auth/auth";
import ProfileAvatar from "./profile-avatar";
import ProfileInformaion from "./profile-information";

export default async function ProfileHeader() {
  const session = await auth();

  return (
    <div>
      {/* Avatar Upload */}
      <ProfileAvatar avatarUrl={session?.user?.avatarUrl} />

      {/* ProfileName */}
      <ProfileInformaion name={session?.user?.name}/>
    </div>
  );
}
