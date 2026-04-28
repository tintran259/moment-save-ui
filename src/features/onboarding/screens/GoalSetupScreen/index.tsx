import React, { useEffect, useRef } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useSetUserGoal } from '@/features/user/hooks/useSetUserGoal';
import { useGoalCalculation } from '../../hooks/useGoalCalculation';
import { GoalField } from '@/utils/calculateGoal';
import { formatCompact } from '@/utils/format';
import { styles } from './styles';

interface FieldConfig {
  field: GoalField;
  label: string;
  period: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  example: string;
}

const FIELDS: FieldConfig[] = [
  { field: 'daily', label: 'Mỗi ngày', period: '/ngày', icon: 'sunny-outline', example: 'vd: 100.000' },
  { field: 'monthly', label: 'Mỗi tháng', period: '/tháng', icon: 'calendar-outline', example: 'vd: 3.000.000' },
  { field: 'yearly', label: 'Mỗi năm', period: '/năm', icon: 'ribbon-outline', example: 'vd: 36.000.000' },
];

export const GoalSetupScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const { mutateAsync: setUserGoal, isPending } = useSetUserGoal();
  const router = useRouter();

  const { sourceField, rawInput, calculated, handleInput, handleReset, isFieldDisabled, getDisplayValue, canSave } =
    useGoalCalculation();

  const entranceAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(entranceAnim, { toValue: 1, damping: 16, stiffness: 140, useNativeDriver: true }).start();
  }, []);

  const calcAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(calcAnim, { toValue: calculated ? 1 : 0, duration: 220, useNativeDriver: true }).start();
  }, [!!calculated]);

  const handleSave = async () => {
    if (!calculated || !sourceField) return;
    await setUserGoal({ sourceField, sourceValue: parseInt(rawInput, 10) });
    router.replace('/(protected)');
  };

  const slideIn = {
    opacity: entranceAnim,
    transform: [{ translateY: entranceAnim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back button — only when navigated from inside the app (e.g. Drawer) */}
        {/* {router.canGoBack() && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backBtn, { backgroundColor: colors.surface }]}
            hitSlop={8}
          >
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </TouchableOpacity>
        )} */}

        {/* Header */}
        <Animated.View style={slideIn}>
          <View style={styles.headerIcon}>
            <Ionicons name="flag-outline" size={28} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Đặt mục tiêu chi tiêu</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Nhập vào <Text style={{ fontWeight: '700', color: colors.text }}>một</Text> trong ba ô bên dưới.{'\n'}
            Chúng tôi sẽ tự động tính các khoản còn lại.
          </Text>
        </Animated.View>

        {/* Goal cards */}
        <Animated.View
          style={[
            styles.cards,
            {
              opacity: entranceAnim,
              transform: [{ translateY: entranceAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
            },
          ]}
        >
          {FIELDS.map((cfg) => {
            const isActive = sourceField === cfg.field;
            const isDisabled = isFieldDisabled(cfg.field);
            const displayVal = getDisplayValue(cfg.field);

            return (
              <View
                key={cfg.field}
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.surface,
                    borderColor: isActive ? colors.primary : colors.border,
                    borderWidth: isActive ? 2 : 1,
                  },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.cardIconWrap, { backgroundColor: colors.primaryLight }]}>
                    <Ionicons name={cfg.icon} size={16} color={colors.primary} />
                  </View>
                  <Text style={[styles.cardLabel, { color: colors.text }]}>{cfg.label}</Text>

                  {isDisabled && (
                    <Animated.View
                      style={[styles.autoBadge, { backgroundColor: colors.primaryLight, opacity: calcAnim }]}
                    >
                      <Ionicons name="flash" size={10} color={colors.primary} />
                      <Text style={[styles.autoBadgeText, { color: colors.primary }]}>Tự tính</Text>
                    </Animated.View>
                  )}

                  {isActive && (
                    <TouchableOpacity onPress={handleReset} style={styles.resetBtn} hitSlop={8}>
                      <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
                    </TouchableOpacity>
                  )}
                </View>

                {isDisabled ? (
                  <TouchableOpacity
                    style={[
                      styles.calcDisplay,
                      { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' },
                    ]}
                    onPress={handleReset}
                    activeOpacity={0.7}
                  >
                    <Animated.Text
                      style={[styles.calcValue, { color: colors.textSecondary, opacity: calcAnim }]}
                    >
                      {calculated ? formatCompact(calculated[cfg.field]) : '—'} ₫
                    </Animated.Text>
                    <Text style={[styles.calcPeriod, { color: colors.textTertiary }]}>
                      {cfg.period} · nhấn để đổi
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={[
                      styles.inputWrap,
                      {
                        backgroundColor: isActive
                          ? colors.inputBg
                          : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                        borderColor: isActive ? colors.primary : colors.inputBorder,
                      },
                    ]}
                  >
                    <TextInput
                      value={displayVal}
                      onChangeText={(text) => handleInput(text, cfg.field)}
                      placeholder={cfg.example}
                      placeholderTextColor={colors.placeholder}
                      keyboardType="numeric"
                      style={[styles.input, { color: colors.text }]}
                    />
                    <Text style={[styles.inputUnit, { color: colors.textTertiary }]}>₫</Text>
                  </View>
                )}
              </View>
            );
          })}
        </Animated.View>

        {/* Calculation summary */}
        {calculated && sourceField && (
          <Animated.View style={[styles.summary, { backgroundColor: colors.primaryLight, opacity: calcAnim }]}>
            <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
            <Text style={[styles.summaryText, { color: colors.primary }]}>
              {'Dựa trên '}
              <Text style={{ fontWeight: '700' }}>
                {calculated[sourceField].toLocaleString('vi-VN')} ₫
                {sourceField === 'daily' ? '/ngày' : sourceField === 'monthly' ? '/tháng' : '/năm'}
              </Text>
              {' → '}
              {sourceField !== 'daily' && (
                <Text>
                  {'~'}
                  <Text style={{ fontWeight: '700' }}>{formatCompact(calculated.daily)} ₫</Text>
                  {'/ngày và '}
                </Text>
              )}
              {sourceField !== 'monthly' && (
                <Text>
                  {'~'}
                  <Text style={{ fontWeight: '700' }}>{formatCompact(calculated.monthly)} ₫</Text>
                  {'/tháng'}
                  {sourceField === 'daily' && ' và '}
                </Text>
              )}
              {sourceField !== 'yearly' && (
                <Text>
                  {'~'}
                  <Text style={{ fontWeight: '700' }}>{formatCompact(calculated.yearly)} ₫</Text>
                  {'/năm'}
                </Text>
              )}
            </Text>
          </Animated.View>
        )}

        {/* Actions */}
        <Animated.View style={[styles.actions, slideIn]}>
          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: colors.primary }, (!canSave || isPending) && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={!canSave || isPending}
            activeOpacity={0.85}
          >
            <Text style={styles.saveBtnText}>Bắt đầu</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('/(protected)')} activeOpacity={0.6} style={styles.skipBtn}>
            <Text style={[styles.skipText, { color: colors.textTertiary }]}>Bỏ qua, thiết lập sau</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
