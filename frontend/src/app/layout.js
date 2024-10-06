import "./globals.css";
import { AuthProvider } from "@/lib/context/AuthProvider";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${poppins.className} bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
