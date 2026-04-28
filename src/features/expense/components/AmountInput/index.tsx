import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { styles } from './styles';

interface AmountInputProps {
  value: string;
  onChange: (raw: string) => void;
  error?: string;
}

const formatVND = (raw: string): string => {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  return Number(digits).toLocaleString('vi-VN');
};

export const AmountInput: React.FC<AmountInputProps> = ({ value, onChange, error }) => {
  const { colors } = useTheme();
  const [display, setDisplay] = useState(formatVND(value));

  const handleChange = (text: string) => {
    const raw = text.replace(/\D/g, '');
    setDisplay(formatVND(raw));
    onChange(raw);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.label }]}>Số tiền</Text>
      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: colors.inputBg,
            borderColor: error ? colors.error : colors.inputBorder,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={display}
          onChangeText={handleChange}
          keyboardType="number-pad"
          placeholder="0"
          placeholderTextColor={colors.placeholder}
        />
        <Text style={[styles.currency, { color: colors.primary }]}>₫</Text>
      </View>
      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
    </View>
  );
};
