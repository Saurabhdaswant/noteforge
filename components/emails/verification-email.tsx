import * as React from 'react';
import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Button,
    Hr,
    Tailwind,
} from '@react-email/components';

interface VerificationEmailProps {
    userName?: string;
    verificationUrl: string;
}

const UserVerificationEmail = ({ userName, verificationUrl }: VerificationEmailProps) => {

    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto px-[40px] py-[32px]">
                        {/* Header */}
                        <Section className="text-center mb-[32px]">
                            <Text className="text-[24px] font-bold text-gray-900 m-0">
                                Verify Your Email Address
                            </Text>
                        </Section>

                        {/* Main Content */}
                        <Section className="mb-[32px]">
                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                                Hi there,
                            </Text>
                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                                Thank you for signing up! To complete your registration and secure your account, please verify your email address by clicking the button below.
                            </Text>
                        </Section>

                        {/* Verification Button */}
                        <Section className="text-center mb-[32px]">
                            <Button
                                href={verificationUrl}
                                className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-semibold no-underline box-border hover:bg-blue-700"
                            >
                                Verify Email Address
                            </Button>
                        </Section>

                        {/* Alternative Link */}
                        <Section className="mb-[32px]">
                            <Text className="text-[14px] text-gray-600 leading-[20px] mb-[16px]">
                                If the button above doesn't work, copy and paste this link into your browser:
                            </Text>
                            <Text className="text-[14px] text-blue-600 break-all">
                                {verificationUrl}
                            </Text>
                        </Section>


                        <Hr className="border-gray-200 my-[24px]" />

                        {/* Footer */}
                        <Section className="text-center">
                            <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                                This email was sent to {userName}
                            </Text>
                            <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                                Your Company Name, 123 Business Street, City, State 12345
                            </Text>
                            <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                                © 2024 Your Company Name. All rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};



export default UserVerificationEmail;