import React, { memo } from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';
import { useTheme } from '@/contexts/ThemeContext';
import { styles } from './styles';

interface PhoneInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  control: Control<{ phoneNumber: string }>;
  error?: FieldError;
  rules?: RegisterOptions<{ phoneNumber: string }, 'phoneNumber'>;
}

const PhoneInputComponent: React.FC<PhoneInputProps> = ({ control, error, rules, ...rest }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.label }]}>Số điện thoại</Text>
      <Controller
        control={control}
        name="phoneNumber"
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.inputBg,
                borderColor: error ? colors.error : colors.inputBorder,
                color: colors.text,
              },
            ]}
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
            placeholder="0912 345 678"
            placeholderTextColor={colors.placeholder}
            maxLength={11}
            {...rest}
          />
        )}
      />
      {error && <Text style={[styles.errorText, { color: colors.error }]}>{error.message}</Text>}
    </View>
  );
};

export const PhoneInput = memo(PhoneInputComponent);
