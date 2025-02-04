import { useState } from "react";
import Bitcoin from "./Bitcoin";
import EmailVerification from "./EmailVerification";
import Threshold from "./Threshold";
import Button from "@mui/joy/Button";
import axios from "axios";

export default function Form() {
  const [email, setEmail] = useState("");
  const [threshold, setThreshold] = useState("");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState({
    email: "",
    threshold: "",
    price: "",
  });
  const [success, setSuccess] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = { email: "", threshold: "", price: "" };

    // Validate Email
    if (email.length === 0) {
      formErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      formErrors.email = "Invalid email format.";
    }

    // Validate Threshold
    if (!threshold) {
      formErrors.threshold = "Threshold is required.";
    } else if (Number(threshold) < 0) {
      formErrors.threshold = "Threshold must be greater than zero.";
    } else if (Number(threshold) > price) {
      formErrors.threshold =
        "Threshold must be less than the current Bitcoin price.";
    }

    setErrors(formErrors);

    // Submit form only if there are no errors
    if (!formErrors.email && !formErrors.threshold && !formErrors.price) {
      try {
        // 👉 **Send Email & Threshold to Backend**
        const response = await axios.post("http://localhost:3000/dashboard", {
          email,
          threshold: Number(threshold), // Ensure it's a number
        });

        // ✅ **Show success message**
        setSuccess("✅ Form submitted successfully!");
        setErrors({ email: "", threshold: "", price: "" });

        console.log("Server Response:", response.data);
      } catch (error) {
        // ❌ **Handle API errors**
        console.error("❌ Error submitting form:", error);
        setSuccess("❌ Failed to submit. Please try again.");
      }
    } else {
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="MainForm">
      <div className="innerform">
        {/* 👉 Email input field */}
        <EmailVerification onEmailChange={setEmail} />
        {errors.email && (
          <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.email}</p>
        )}

        {/* 👉 Threshold input field */}
        <Threshold onThresholdChange={setThreshold} />
        {errors.threshold && (
          <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.threshold}</p>
        )}

        {/* 👉 Bitcoin price display */}
        <Bitcoin onBitcoinChange={setPrice} />
        {errors.price && (
          <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.price}</p>
        )}

        {/* 👉 Submit Button (Sends data to backend) */}
        <Button
          size="sm"
          variant="soft"
          color="neutral"
          type="submit"
          style={{ width: "60%" }}
        >
          Submit
        </Button>

        {/* 👉 Success Message */}
        {success && (
          <p style={{ color: "green", fontSize: "0.8rem" }}>{success}</p>
        )}
      </div>
    </form>
  );
}
