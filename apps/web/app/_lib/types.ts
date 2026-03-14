export type Triage = {
  urgency: "critical" | "high" | "normal";
  intent: "nutrition" | "symptom" | "vaccine" | "general" | "emergency";
  vet_recommendation?: "critical" | "high" | "monitor" | "none";
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  ts: string;
};

export type Pet = {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  sex: "Đực" | "Cái";
  weightKg: number;
  photoUrl?: string;
};

export type Vaccine = {
  id: string;
  petId: string;
  name: string;
  date: string;
  note?: string;
};

export type Reminder = {
  id: string;
  petId: string;
  title: string;
  time: string;
  repeat: string;
};

export type Lead = {
  name?: string;
  phone: string;
  email: string;
  petType: string;
};

export type AdminUser = {
  id: string;
  name: string;
  phone: string;
  email: string;
  pets: number;
  status: "active" | "trial" | "inactive";
  lastActive: string;
};
