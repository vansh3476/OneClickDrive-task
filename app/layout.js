import { AuthProvider } from "../contexts/AuthContext";
import Layout from "../components/Layout";
import "./globals.css";
import { Suspense } from "react";
import { Loader } from "../components/Loader";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <Suspense
            fallback={
             <Loader/>
            }
          >
            <Layout>{children}</Layout>
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
