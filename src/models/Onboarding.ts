import mongoose, { Schema, Document } from "mongoose";

export interface IOnboarding extends Document {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mls: string;
  licenseNumber: string;

  // Location
  city: string;
  state: string;

  // Service Areas
  primaryArea: string;
  primaryRadius: string;
  secondaryArea: string;
  secondaryRadius: string;

  // Plan & Assignment
  accountManager: string;
  selectedPlan: string;

  // Addresses
  billingAddress: string;
  shippingAddress: string;

  // Meta
  createdAt: Date;
  status: string;
}

const OnboardingSchema: Schema = new Schema(
  {
    // Personal Info
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    mls: { type: String, required: true },
    licenseNumber: { type: String, required: true },

    // Location
    city: { type: String, required: true },
    state: { type: String, required: true },

    // Service Areas
    primaryArea: { type: String, required: true },
    primaryRadius: { type: String, required: true },
    secondaryArea: { type: String, required: true },
    secondaryRadius: { type: String, required: true },

    // Plan & Assignment
    accountManager: { type: String, default: "" },
    selectedPlan: { type: String, required: true },

    // Addresses
    billingAddress: { type: String, required: true },
    shippingAddress: { type: String, required: true },

    // Meta
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Prevent model recompilation in development
export default mongoose.models.Onboarding ||
  mongoose.model<IOnboarding>("Onboarding", OnboardingSchema);
