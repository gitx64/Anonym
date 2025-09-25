import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Container,
} from "@react-email/components";

export const anonym_uri = ""

interface EmailProps {
  username: string;
  otp: string;
}

export default function VerificationSendTemplate({ username, otp }: EmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your verification code is {otp}</Preview>

      <Container
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5e5e5",
          borderRadius: "8px",
          padding: "32px",
          maxWidth: "480px",
          margin: "40px auto",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <Heading
          as="h2"
          style={{
            color: "#111827",
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          Anonym | Email Verification
        </Heading>

        <Text style={{ fontSize: "14px", color: "#374151", marginBottom: "24px" }}>
          Hi <strong>{username}</strong>,  
          <br />
          Use the verification code below to complete your sign-in. This code will
          expire in 10 minutes.
        </Text>

        <Section style={{ textAlign: "center", margin: "24px 0" }}>
          <Row>
            <Text
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                letterSpacing: "4px",
                color: "#2563eb",
              }}
            >
              {otp}
            </Text>
          </Row>
        </Section>

        <Text style={{ fontSize: "13px", color: "#6b7280", marginTop: "24px" }}>
          If you didn’t request this, you can safely ignore this email.
        </Text>

        <Section style={{ marginTop: "32px", textAlign: "center" }}>
          <Button
            href={anonym_uri}
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "12px 20px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            Go to App
          </Button>
        </Section>
      </Container>
    </Html>
  );
}

