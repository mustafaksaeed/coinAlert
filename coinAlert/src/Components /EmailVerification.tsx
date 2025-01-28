import React from "react";
import Input from "@mui/joy/Input";

export default function EmailValidationForm({
  onEmailChange,
}: {
  onEmailChange: (email: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEmailChange(e.target.value);
  };

  return (
    <div className="email">
      <label>Email:</label>
      <Input
        style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }}
        type="email"
        id="email"
        placeholder="Enter your Email"
        onChange={handleChange}
        variant="outlined"
        size="lg"
        color="neutral"
      />
    </div>
  );
}
