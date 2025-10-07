import * as React from 'react';
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
} from '@react-email/components';

interface PasswordResetEmailProps {
    userEmail: string;
    resetLink: string;
}

const PasswordResetEmail = ({ userEmail, resetLink, }: PasswordResetEmailProps) => {

    return (
        <Html lang="en" dir="ltr">
            <Head />
            <Preview>Reset your password - Action required</Preview>
            <Tailwind>
                <Body className="bg-gray-100 py-[40px] font-sans">
                    <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
                        {/* Header */}
                        <Section className="text-center mb-[32px]">
                            <Heading className="text-[24px] font-bold text-gray-900 m-0">
                                Password Reset Request
                            </Heading>
                        </Section>

                        {/* Main Content */}
                        <Section className="mb-[32px]">
                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                                Hello,
                            </Text>
                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                                We received a request to reset the password for your account associated with <strong>{userEmail}</strong>.
                            </Text>
                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                                If you made this request, click the button below to reset your password:
                            </Text>
                        </Section>

                        {/* Reset Button */}
                        <Section className="text-center mb-[32px]">
                            <Button
                                href={resetLink}
                                className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-medium no-underline box-border"
                            >
                                Reset Password
                            </Button>
                        </Section>

                        {/* Alternative Link */}
                        <Section className="mb-[32px]">
                            <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                                If the button doesn't work, copy and paste this link into your browser:
                            </Text>
                            <Link
                                href={resetLink}
                                className="text-blue-600 text-[14px] break-all"
                            >
                                {resetLink}
                            </Link>
                        </Section>


                        {/* Footer */}
                        <Section className="border-t border-gray-200 pt-[24px]">
                            <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                                If you need help, contact our support team at support@company.com
                            </Text>
                            <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                                Company Name, 123 Business Street, City, State 12345
                            </Text>
                            <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                                © 2024 Company Name. All rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};


export default PasswordResetEmail;