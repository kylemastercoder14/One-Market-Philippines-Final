"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeClosed, Lock, User } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserProfile from "./user-profile";
import Link from "next/link";

const UserComponent = () => {
  const user = null;
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState({
    hasNumber: false,
    hasLetter: false,
    hasSpecialChar: false,
    isValidLength: false,
  });

  const checkPasswordRequirements = (password: string) => {
    setPasswordRequirements({
      hasNumber: /\d/.test(password),
      hasLetter: /[a-zA-Z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      isValidLength: password.length >= 6 && password.length <= 20,
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
        <h3 className="font-semibold text-center">Sign in / Register</h3>
        <div className="text-center bg-[#198754]/40 py-2 text-green-900 rounded-md flex items-center justify-center mt-2 gap-3">
          <Lock className="w-4 h-4" />
          <p className="text-xs">
            All data will be encrypted and securely transmitted.
          </p>
        </div>
        <form className="mt-5 flex flex-col relative">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Please enter your email address"
              required
            />
          </div>
          <div className="space-y-2 mt-3 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Please enter your password"
              value={password}
              onChange={(e) => {
                const pwd = e.target.value;
                setPassword(pwd);
                checkPasswordRequirements(pwd);
              }}
            />
            <Button
              onClick={handleShowPassword}
              type="button"
              className="absolute top-6 right-2 hover:bg-transparent text-muted-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
              size="icon"
              variant="ghost"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            <p
              className={`${
                password.length === 0
                  ? "text-gray-500"
                  : passwordRequirements.hasNumber &&
                      passwordRequirements.hasLetter &&
                      passwordRequirements.hasSpecialChar
                    ? "text-green-600"
                    : "text-red-600"
              }`}
            >
              {password.length === 0
                ? "•"
                : passwordRequirements.hasNumber &&
                passwordRequirements.hasLetter &&
                passwordRequirements.hasSpecialChar
                ? "✔"
                : "🗴"}{" "}
              Must contain numbers, letters, and special characters
            </p>
            <p
              className={`${
                password.length === 0
                  ? "text-gray-500"
                  : passwordRequirements.isValidLength
                    ? "text-green-600"
                    : "text-red-600"
              }`}
            >
              {password.length === 0 ? "•" : passwordRequirements.isValidLength ? "✔" : "🗴"} Must be 6-20
              characters long
            </p>
          </div>

          <Button className="rounded-full w-full mt-5">Continue</Button>
          <span className="cursor-pointer text-sm mt-3 text-muted-foreground underline hover:text-muted-foreground/80 text-center">
            Trouble signing in?
          </span>
          <span className="text-sm mt-7 text-muted-foreground text-center">
            Or continue with other ways
          </span>
          <div className="flex items-center gap-5 justify-center mt-4">
            <Image
              src="https://aimg.kwcdn.com/upload_aimg/login/8e2e59cd-5090-4feb-ae78-691e9971ed89.png.slim.png?imageView2/2/w/72/q/80/format/webp"
              alt="Google"
              width={40}
              height={40}
            />
            <Image
              src="/icons/facebook.svg"
              alt="Facebook"
              width={40}
              height={40}
            />
          </div>
          <span className="text-sm mt-7 text-center">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="underline cursor-pointer text-orange-600"
            >
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline cursor-pointer text-orange-600"
            >
              Privacy Policy
            </Link>
          </span>
        </form>
      </Modal>
      {user ? (
        <UserProfile />
      ) : (
        <div className="relative group">
          <button
            onClick={() => setShowLogin(true)}
            className="px-4 flex items-center gap-2 py-2 rounded-2xl hover:bg-zinc-300/70 text-black text-sm transition-colors duration-300"
          >
            <User className="w-6 h-6 rounded-full" />
            <div className="flex flex-col items-start">
              <span className="text-sm m-0">Sign in / Register</span>
              <span className="font-semibold text-sm m-0">
                Orders & Account
              </span>
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default UserComponent;
