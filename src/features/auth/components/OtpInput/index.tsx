import React, { memo, useRef, useState, useCallback } from 'react';
import { View, TextInput, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { styles } from './styles';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const OTP_LENGTH = 6;

const OtpInputComponent: React.FC<OtpInputProps> = ({ value, onChange, error }) => {
  const { colors } = useTheme();
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const digits = Array.from({ length: OTP_LENGTH }, (_, i) => value[i] ?? '');

  const handleChange = useCallback(
    (text: string, index: number) => {
      const digit = text.replace(/\D/g, '').slice(-1);
      if (!digit) return;

      const newDigits = [...digits];
      newDigits[index] = digit;
      onChange(newDigits.join(''));

      if (index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [digits, onChange],
  );

  const handleKeyPress = useCallback(
    (e: { nativeEvent: { key: string } }, index: number) => {
      if (e.nativeEvent.key !== 'Backspace') return;

      const newDigits = [...digits];

      if (digits[index]) {
        newDigits[index] = '';
        onChange(newDigits.join(''));
      } else if (index > 0) {
        newDigits[index - 1] = '';
        onChange(newDigits.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    },
    [digits, onChange],
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.label }]}>Nhập mã OTP</Text>

      <View style={styles.row}>
        {digits.map((digit, index) => {
          const isFocused = focusedIndex === index;
          const isFilled  = digit !== '';
          const hasError  = !!error;

          return (
            <TextInput
              key={index}
              ref={(ref) => { inputRefs.current[index] = ref; }}
              style={[
                styles.box,
                {
                  backgroundColor: colors.inputBg,
                  color: colors.text,
                  borderColor: hasError ? colors.error : isFocused ? colors.primary : isFilled ? colors.primary + '99' : colors.inputBorder,
                  shadowColor: isFocused ? colors.primary : 'transparent',
                  shadowOpacity: isFocused ? 0.4 : 0,
                  shadowRadius: isFocused ? 8 : 0,
                  shadowOffset: { width: 0, height: 0 },
                  elevation: isFocused ? 5 : 0,
                  transform: [{ scale: isFocused ? 1.07 : 1 }],
                },
              ]}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
              keyboardType="number-pad"
              maxLength={1}
              caretHidden
              autoFocus={index === 0}
              textAlign="center"
            />
          );
        })}
      </View>

      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}
    </View>
  );
};

export const OtpInput = memo(OtpInputComponent);
