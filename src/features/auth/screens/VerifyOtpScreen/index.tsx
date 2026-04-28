import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AxiosError } from 'axios';
import { OtpInput } from '../../components/OtpInput';
import { useVerifyOtp } from '../../hooks/useVerifyOtp';
import { useSendOtp } from '../../hooks/useSendOtp';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { styles } from './styles';

const RESEND_COOLDOWN = 15;

export const VerifyOtpScreen: React.FC = () => {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [resendError, setResendError] = useState<string | null>(null);
  const { colors } = useTheme();

  const { mutate: verifyOtp, isPending, error, reset } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useSendOtp();

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOtpChange = useCallback(
    (value: string) => {
      if (error) reset();
      setOtp(value);
    },
    [error, reset],
  );

  const handleVerify = () => {
    if (otp.length !== 6) return;
    verifyOtp(
      { phoneNumber: phoneNumber ?? '', otp },
      { onError: () => setOtp('') },
    );
  };

  const handleResend = () => {
    setResendError(null);
    resendOtp(
      { phoneNumber: phoneNumber ?? '' },
      {
        onSuccess: () => setCountdown(RESEND_COOLDOWN),
        onError: () => setResendError('Gửi lại thất bại, vui lòng thử lại'),
      },
    );
  };

  const otpError = error
    ? (error as AxiosError<{ message: string }>)?.response?.data?.message ?? 'Mã OTP không đúng'
    : undefined;

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.toggleWrapper}>
        <ThemeToggle />
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Xác thực OTP</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Mã OTP đã được gửi đến{'\n'}
            <Text style={[styles.phone, { color: colors.text }]}>{phoneNumber}</Text>
          </Text>
        </View>

        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          error={otpError}
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.primary },
            (isPending || otp.length !== 6) && styles.buttonDisabled,
          ]}
          onPress={handleVerify}
          disabled={isPending || otp.length !== 6}
          activeOpacity={0.8}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Xác nhận</Text>
          )}
        </TouchableOpacity>

        {resendError && (
          <Text style={[styles.resendError, { color: colors.error }]}>{resendError}</Text>
        )}

        <View style={styles.resendRow}>
          <Text style={[styles.resendLabel, { color: colors.textSecondary }]}>
            Không nhận được mã?{' '}
          </Text>
          {countdown > 0 ? (
            <Text style={[styles.countdown, { color: colors.textTertiary }]}>
              Gửi lại sau {countdown}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend} disabled={isResending}>
              <Text style={[styles.resendLink, { color: colors.primary }]}>
                {isResending ? 'Đang gửi...' : 'Gửi lại'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
