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
      <body className="">
        <Header />
        <div className="flex flex-col justify-between min-h-screen">
          <div className="flex-grow flex justify-center items-center">
            {" "}
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
