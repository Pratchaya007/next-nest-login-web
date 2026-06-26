"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { uploadAvatar } from "@/lib/actions/user.action";
import { Camera, FileImage, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

interface ProfileAvatarProps {
  avatarUrl?: string | null;
}

export default function ProfileAvatar({ avatarUrl }: ProfileAvatarProps) {
  const fileInputEl = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter()
  // console.log('ddddllsflslfsd',file)

  const handleOnClick = () => {
    startTransition(async () => {
      if (file) {
        await uploadAvatar(file);
        setOpen(false)
        setFile(null)
        router.refresh()
      }
    });
  };

  const imageUrl = file ? URL.createObjectURL(file) : avatarUrl; //Create New URL เวลาเราเลือกรูปสามารถแสดงได้

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(current) => {
          if (current === false) {
            setFile(null);
            if (fileInputEl.current) fileInputEl.current.value = ""; //ในกรณีที่เลือกรูปซ้ำกัน❗️
          }
          setOpen(current);
        }}
      >
        <form>
          <div className=" relative">
            <Avatar className="size-35 border">
              <AvatarImage src={avatarUrl ?? "/profile_icon.png"} />
            </Avatar>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="absolute bottom-3 right-2 size-6 rounded-full shadow"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </DialogTrigger>

            {/* Content */}
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
                <div className="relative bg-muted aspect-1095/405 rounded-lg overflow-hidden flex justify-center items-center">
                  {imageUrl ? (
                    <Image
                      alt="profile"
                      src={imageUrl}
                      fill
                      className=" object-cover"
                    />
                  ) : (
                    <FileImage className="size-20 text-muted-foreground" />
                  )}
                </div>
              </DialogHeader>

              {/* Footer */}
              <DialogFooter>
                <div>
                  {file && (
                    <Button onClick={handleOnClick} disabled={isPending}>
                      upload
                    </Button>
                  )}
                  <Button
                    variant={"outline"}
                    onClick={() => fileInputEl.current?.click()}
                    disabled={isPending}
                  >
                    Choose Photo
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </div>
        </form>
      </Dialog>

      <input
        type="file"
        className="hidden"
        ref={fileInputEl}
        onChange={(e) => {
          // console.log(e.target.files)
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />
    </>
  );
}
