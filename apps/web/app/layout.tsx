import type { Metadata } from "next";
import { Be_Vietnam_Pro, Spectral } from "next/font/google";
import "./globals.css";

const bodyFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const displayFont = Spectral({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "AI PetOmni",
    template: "%s | AI PetOmni",
  },
  description:
    "Nền tảng số hóa hệ sinh thái thú cưng tại Việt Nam, kết hợp hồ sơ sức khỏe số và trợ lý AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
