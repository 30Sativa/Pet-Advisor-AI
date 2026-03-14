import type { AdminUser, Pet, Reminder, Vaccine } from "@/app/_lib/types";

export const pets: Pet[] = [
  {
    id: "pet-1",
    name: "Milo",
    species: "Chó",
    breed: "Corgi",
    age: "2 tuổi",
    sex: "Đực",
    weightKg: 12.4,
  },
  {
    id: "pet-2",
    name: "Luna",
    species: "Mèo",
    breed: "Anh lông ngắn",
    age: "3 tuổi",
    sex: "Cái",
    weightKg: 4.2,
  },
  {
    id: "pet-3",
    name: "Bông",
    species: "Chó",
    breed: "Poodle",
    age: "5 tuổi",
    sex: "Cái",
    weightKg: 6.1,
  },
];

export const vaccines: Vaccine[] = [
  {
    id: "vac-1",
    petId: "pet-1",
    name: "Dại (Rabies)",
    date: "2025-11-02",
    note: "Nhắc lại sau 12 tháng",
  },
  {
    id: "vac-2",
    petId: "pet-1",
    name: "7 bệnh",
    date: "2025-10-15",
    note: "Đã hoàn thành mũi 2",
  },
  {
    id: "vac-3",
    petId: "pet-2",
    name: "Care 4",
    date: "2025-12-01",
    note: "Hẹn mũi nhắc lại",
  },
];

export const reminders: Reminder[] = [
  {
    id: "rem-1",
    petId: "pet-1",
    title: "Tái khám da liễu",
    time: "2026-04-02T09:00:00+07:00",
    repeat: "1 tháng/lần",
  },
  {
    id: "rem-2",
    petId: "pet-2",
    title: "Nhắc tiêm vaccine",
    time: "2026-03-25T10:30:00+07:00",
    repeat: "Hàng năm",
  },
  {
    id: "rem-3",
    petId: "pet-3",
    title: "Tắm & grooming",
    time: "2026-03-21T15:00:00+07:00",
    repeat: "2 tuần/lần",
  },
];

export const adminUsers: AdminUser[] = [
  {
    id: "user-1",
    name: "Nguyễn Minh",
    phone: "0912 345 678",
    email: "minh.nguyen@email.com",
    pets: 2,
    status: "active",
    lastActive: "2026-03-14T09:12:00+07:00",
  },
  {
    id: "user-2",
    name: "Trần Thảo",
    phone: "0987 222 111",
    email: "thao.tran@email.com",
    pets: 1,
    status: "trial",
    lastActive: "2026-03-13T21:45:00+07:00",
  },
  {
    id: "user-3",
    name: "Lê Quốc",
    phone: "0909 555 222",
    email: "quoc.le@email.com",
    pets: 3,
    status: "inactive",
    lastActive: "2026-03-02T08:20:00+07:00",
  },
];
