import { styles } from "./styles"
import { useTheme } from "@/contexts/ThemeContext"
import { Text, TouchableOpacity, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';

interface Props {
  month: number;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  setShowYearPicker: (show: boolean) => void;
  selectedYear: number;
}

export const FilterReport = ({ month, year, onPrevMonth, onNextMonth, canGoPrev, canGoNext, setShowYearPicker, selectedYear }: Props) => {
  const { colors } = useTheme()
  return <View style={[styles.monthNav, { borderBottomColor: colors.border }]}>
    <View style={styles.monthNavCenter}>
      <TouchableOpacity
        onPress={onPrevMonth}
        disabled={!canGoPrev}
        style={[styles.monthNavBtn, { backgroundColor: colors.surface }]}
        hitSlop={8}
      >
        <Ionicons name="chevron-back" size={18} color={canGoPrev ? colors.text : colors.textTertiary} />
      </TouchableOpacity>

      <Text style={[styles.monthNavLabel, { color: colors.text }]}>
        Tháng {String(month).padStart(2, '0')}
      </Text>

      <TouchableOpacity
        onPress={onNextMonth}
        disabled={!canGoNext}
        style={[styles.monthNavBtn, { backgroundColor: colors.surface }]}
        hitSlop={8}
      >
        <Ionicons name="chevron-forward" size={18} color={canGoNext ? colors.text : colors.textTertiary} />
      </TouchableOpacity>
    </View>

    <TouchableOpacity
      style={[styles.yearBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={() => setShowYearPicker(true)}
      activeOpacity={0.75}
    >
      <Text style={[styles.yearBtnText, { color: colors.text }]}>{selectedYear}</Text>
      <Ionicons name="chevron-down" size={12} color={colors.textTertiary} />
    </TouchableOpacity>
  </View>
}