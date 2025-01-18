import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  render,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeOnboardingProps {
  sellerId: string;
  storeName: string;
}

export const WelcomeOnboarding = ({
  sellerId,
  storeName,
}: WelcomeOnboardingProps) => (
  <Html>
    <Head />
    <Preview>Welcome to 1 Market Philippines | Seller Hub</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={coverSection}>
          <Section style={imageSection}>
            <Img
              src={
                "https://firebasestorage.googleapis.com/v0/b/personaapplication-b086b.appspot.com/o/logo.png?alt=media&token=9bce8b60-ce3c-4569-b217-09fdba9d6cee"
              }
              width="60"
              height="60"
              alt="Logo"
              style={logo}
            />
          </Section>
          <Section style={upperSection}>
            <Heading style={h1}>
              Welcome to 1 Market Philippines | Seller Hub
            </Heading>
            <Text style={mainText}>
              Congratulations, {storeName}! You&apos;re joining over hundreds of
              sellers around the community who use 1 Market Philippines to
              manage products and sell to customers.
            </Text>
            <Text>Here&apos;s how to get started:</Text>
          </Section>
          <ul>
            <li className="mb-20">
              Finish setting up your account.
              <Text className="text-sm text-gray-600">
                Provide all the required details in your seller dashboard to
                complete the setup.
              </Text>
            </li>
            <li className="mb-20">
              Wait for your application approval.
              <Text className="text-sm text-gray-600">
                Our team will review your application, which typically takes 1-2
                business days. You will be notified once approved.
              </Text>
            </li>
            <li className="mb-20">
              Add your first product.
              <Text className="text-sm text-gray-600">
                Start listing your products with accurate details, descriptions,
                and images to attract customers.
              </Text>
            </li>
          </ul>

          <Section className="text-center">
            <Link
              href='http://localhost:3000/seller/${sellerId}/dashboard'
              style={button}
            >
              Go to your dashboard
            </Link>
          </Section>
        </Section>

        <Text style={footerText}>
          This message was produced and distributed by 1 Market Philippines. ©
          2025. All rights reserved. AWS is a registered trademark of{" "}
          <Link
            href="https://onemarketphilippines.com"
            target="_blank"
            style={link}
          >
            onemarketphilippines.com
          </Link>
          . View our{" "}
          <Link
            href="https://onemarketphilippines.com/privacy-policy"
            target="_blank"
            style={link}
          >
            privacy policy
          </Link>
          .
        </Text>
      </Container>
    </Body>
  </Html>
);

export const WelcomeOnboardingHTML = (props: WelcomeOnboardingProps) =>
  render(<WelcomeOnboarding {...props} />, {
    pretty: true,
  });

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const logo = {
  display: "block",
  margin: "0 auto",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const button = {
  backgroundColor: "#ea580c",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#252f3d",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = {
  padding: "25px 35px",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
};

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const mainText = { ...text, marginBottom: "14px" };
