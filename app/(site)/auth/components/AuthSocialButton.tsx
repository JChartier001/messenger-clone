import React from "react";
import { IconType } from "react-icons";
import Button from "@/app/components/ui/Button";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  isLoading?: boolean;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
  isLoading,
}) => {
  return (
    <Button type="button" onClick={onClick} fullWidth disabled={isLoading}>
      <Icon />
    </Button>
  );
};

export default AuthSocialButton;
