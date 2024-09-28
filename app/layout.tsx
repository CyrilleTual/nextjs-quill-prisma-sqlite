// app/layout.tsx

import Header from "@/components/header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="flex flex-col justify-center">
        <Header />
        <div className="flex-grow flex flex-col justify-center items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
