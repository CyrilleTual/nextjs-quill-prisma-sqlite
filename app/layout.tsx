import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="flex flex-col h-screen">
        <div className="flex-grow">{children}</div>
      </body>
    </html>
  );
}
