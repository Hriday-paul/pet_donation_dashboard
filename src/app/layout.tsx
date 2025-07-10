import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import antTheme from "@/theme/antTheme";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import NextJsTopLoader from "@/components/shared/NextTopLoader";
import ReduxProvider from "@/components/shared/ReduxProvider";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | Amipeta",
    template: "%s | Amipeta",
  },
  description: "This is Official Application Dashboard for Amipeta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>
          <AntdRegistry>
            <ConfigProvider theme={antTheme}>
              <Toaster position="top-center" richColors />
              <NextJsTopLoader />
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
