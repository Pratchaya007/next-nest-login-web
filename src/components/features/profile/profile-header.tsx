import { auth } from "@/lib/auth/auth";
import ProfileAvatar from "./profile-avatar";

export default async function ProfileHeader() {
  const session = await auth();

  return (
    <div>
      {/* Avatar Upload */}
      <ProfileAvatar avatarUrl={session?.user?.avatarUrl} />
    </div>
  );
}
