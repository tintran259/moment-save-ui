import React, { useEffect, useRef } from 'react';
import { Animated, DimensionValue, ScrollView, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { styles } from './styles';

export const ReportSkeleton: React.FC = () => {
  const { colors, isDark } = useTheme();
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1,   duration: 700, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, []);

  const bg = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.07)';

  // DimensionValue lets TypeScript accept '40%', '100%', etc. for width
  const Line = ({ w, h }: { w?: DimensionValue; h: number }) => (
    <Animated.View
      style={[styles.line, { width: w ?? '100%', height: h, backgroundColor: bg }, { opacity: shimmer }]}
    />
  );

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    >
      {/* Summary card */}
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Line w="40%" h={12} />
        <Line w="65%" h={38} />
        <Line w="45%" h={11} />
      </View>

      {/* Bar chart card */}
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Line w="55%" h={14} />
        {[100, 70, 85, 55, 90, 60, 75].map((pct, i) => (
          <View key={i} style={styles.barRow}>
            <Animated.View style={[styles.barLabel, { backgroundColor: bg }, { opacity: shimmer }]} />
            <Animated.View style={[styles.barTrack, { width: `${pct}%` as `${number}%`, backgroundColor: bg }, { opacity: shimmer }]} />
            <Animated.View style={[styles.barAmt,   { backgroundColor: bg }, { opacity: shimmer }]} />
          </View>
        ))}
      </View>

      {/* Top-expense image card */}
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Animated.View style={[styles.image, { backgroundColor: bg }, { opacity: shimmer }]} />
        <Line w="50%" h={13} />
        <Line w="35%" h={11} />
      </View>

      {/* Stats grid */}
      <View style={styles.statsRow}>
        {[0, 1, 2].map(i => (
          <Animated.View key={i} style={[styles.statCard, { backgroundColor: bg }, { opacity: shimmer }]} />
        ))}
      </View>
    </ScrollView>
  );
};
