import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { PhoneInput } from '../../components/PhoneInput';
import { useSendOtp } from '../../hooks/useSendOtp';
import { useTheme } from '@/contexts/ThemeContext';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { PHONE_REGEX } from '@/constants/validation';
import { styles } from './styles';

interface EnterPhoneForm {
  phoneNumber: string;
}

export const EnterPhoneScreen: React.FC = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { mutate: sendOtp, isPending, error } = useSendOtp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EnterPhoneForm>({
    defaultValues: { phoneNumber: '' },
  });

  const onSubmit = (data: EnterPhoneForm) => {
    sendOtp(
      { phoneNumber: data.phoneNumber },
      {
        onSuccess: () => {
          router.push({
            pathname: '/(auth)/verify-otp',
            params: { phoneNumber: data.phoneNumber },
          });
        },
      },
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.toggleWrapper}>
        <ThemeToggle />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoWrapper}>
          <Logo size={88} />
          <Text style={[styles.appName, { color: colors.text }]}>
            Moment<Text style={{ color: colors.primary }}>Save</Text>
          </Text>
          <Text style={[styles.appTagline, { color: colors.textSecondary }]}>
            Ghi lại khoản chi · Không quên khoảnh khắc
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <PhoneInput
            control={control}
            error={errors.phoneNumber}
            rules={{
              required: 'Vui lòng nhập số điện thoại',
              pattern: {
                value: PHONE_REGEX,
                message: 'Số điện thoại không hợp lệ',
              },
            }}
          />

          {error && (
            <Text style={[styles.apiError, { color: colors.error }]}>
              {(error as Error).message || 'Có lỗi xảy ra, vui lòng thử lại'}
            </Text>
          )}

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.primary },
              isPending && styles.buttonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            activeOpacity={0.8}
          >
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Gửi mã OTP</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
