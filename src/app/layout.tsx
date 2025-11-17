import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "..: Sectools :..",
  description: "Share sensitive info tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased min-h-screen flex flex-col bg-background`}>
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-center text-xl font-medium text-foreground tracking-wider">
              ..... SecTools .....
            </h1>
          </div>
        </header>
        {children}
        <footer className="border-t border-border bg-card mt-auto">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-sm text-muted-foreground">
              Secure message sharing tool • Your privacy matters
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
