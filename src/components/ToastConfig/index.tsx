import React from 'react';
import { Text, View } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

const COLORS = {
  success: { bg: '#1A2E22', border: '#22C55E', icon: '#4ADE80' as const, text: '#DCFCE7' },
  error:   { bg: '#2E1A1A', border: '#EF4444', icon: '#F87171' as const, text: '#FEE2E2' },
  info:    { bg: '#1A1F2E', border: '#6366F1', icon: '#818CF8' as const, text: '#E0E7FF' },
};

const ICONS: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
  success: 'checkmark-circle',
  error:   'close-circle',
  info:    'information-circle',
};

interface ToastItemProps {
  type: 'success' | 'error' | 'info';
  text1?: string;
  text2?: string;
}

const ToastItem: React.FC<ToastItemProps> = ({ type, text1, text2 }) => {
  const c = COLORS[type];
  return (
    <View style={[styles.container, { backgroundColor: c.bg, borderColor: c.border }]}>
      <Ionicons name={ICONS[type]} size={22} color={c.icon} style={styles.icon} />
      <View style={styles.textWrap}>
        {text1 ? <Text style={[styles.title, { color: c.text }]} numberOfLines={1}>{text1}</Text> : null}
        {text2 ? <Text style={[styles.message, { color: c.text }]} numberOfLines={2}>{text2}</Text> : null}
      </View>
    </View>
  );
};

export const toastConfig: ToastConfig = {
  success: ({ text1, text2 }) => <ToastItem type="success" text1={text1} text2={text2} />,
  error:   ({ text1, text2 }) => <ToastItem type="error"   text1={text1} text2={text2} />,
  info:    ({ text1, text2 }) => <ToastItem type="info"    text1={text1} text2={text2} />,
};
