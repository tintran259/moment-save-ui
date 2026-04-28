import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { showToast } from '@/utils/toast';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { AppLayout } from '@/components/AppLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { styles } from './styles';

interface PhotoMeta {
  coords?: { latitude: number; longitude: number };
  takenAt?: Date;
}

interface CapturePreviewPhaseProps {
  imageUri: string;
  isSubmitting: boolean;
  isUploading: boolean;
  onRetake: () => void;
  onSave: (amount: number, locationName?: string) => void;
  photoMeta?: PhotoMeta;
}

export const CapturePreviewPhase: React.FC<CapturePreviewPhaseProps> = ({
  imageUri,
  isSubmitting,
  isUploading,
  onRetake,
  onSave,
  photoMeta,
}) => {
  const [rawAmount, setRawAmount] = useState('');
  const [display, setDisplay] = useState('');
  const [locationName, setLocationName] = useState('');
  const [capturedAt] = useState(() => photoMeta?.takenAt ?? new Date());
  const [savedToDevice, setSavedToDevice] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const amountRef = useRef<TextInput>(null);
  const { colors, isDark } = useTheme();

  useEffect(() => {
    setLocationName('');
    let cancelled = false;

    (async () => {
      try {
        let coords = photoMeta?.coords;
        if (!coords) {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted' || cancelled) return;
          const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
          coords = loc.coords;
        }
        if (cancelled) return;
        const [place] = await Location.reverseGeocodeAsync(coords);
        if (place && !cancelled) {
          const parts = [place.subregion ?? place.district, place.city ?? place.region].filter(Boolean);
          setLocationName(parts.join(', '));
        }
      } catch {
        if (!cancelled) showToast.info('Không lấy được vị trí hiện tại');
      }
    })();

    return () => { cancelled = true; };
  }, [photoMeta]);

  const dateStr = capturedAt.toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh',
  });
  const timeStr = capturedAt.toLocaleTimeString('vi-VN', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Ho_Chi_Minh',
  });

  const handleAmountChange = (text: string) => {
    const raw = text.replace(/\D/g, '');
    setRawAmount(raw);
    setDisplay(raw ? Number(raw).toLocaleString('vi-VN') : '');
  };

  const handleSaveToDevice = async () => {
    if (savedToDevice || isSaving) return;
    setIsSaving(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        showToast.info('Vui lòng cấp quyền thư viện ảnh trong cài đặt.', 'Cần quyền truy cập');
        return;
      }
      await MediaLibrary.saveToLibraryAsync(imageUri);
      setSavedToDevice(true);
      showToast.success('Đã lưu ảnh vào thư viện');
    } catch {
      showToast.error('Không thể lưu ảnh xuống máy');
    } finally {
      setIsSaving(false);
    }
  };

  const hasFilled = rawAmount.length > 0;
  const sideColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)';
  const sideBorder = isDark ? 'rgba(255,255,255,0.1)' : colors.border;

  return (
    <AppLayout showFooter={false} keyboardAvoiding>
      {/* ── Photo card ── */}
      <View style={[styles.card, { borderColor: colors.border }]}>
        <Image source={{ uri: imageUri }} style={styles.cardImage} resizeMode="cover" />

        {/* Top row: back + download */}
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.circleBtn} onPress={onRetake}>
            <Ionicons name="arrow-back" size={18} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.circleBtn, savedToDevice && styles.circleBtnSaved]}
            onPress={handleSaveToDevice}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : savedToDevice ? (
              <Ionicons name="checkmark" size={18} color="#4ADE80" />
            ) : (
              <Ionicons name="download-outline" size={18} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        {/* Timestamp */}
        <View style={styles.timestampOverlay}>
          {locationName ? (
            <Text style={styles.timestampLocation} numberOfLines={1}>
              {locationName}
            </Text>
          ) : null}
          <Text style={styles.timestampDate}>{dateStr}</Text>
          <Text style={styles.timestampTime}>{timeStr}</Text>
        </View>

        {/* Amount pill */}
        <TouchableOpacity
          style={[styles.amountPill, hasFilled && styles.amountPillFilled]}
          activeOpacity={0.85}
          onPress={() => amountRef.current?.focus()}
        >
          <Text style={styles.currencySign}>₫</Text>
          <TextInput
            ref={amountRef}
            style={styles.amountInput}
            value={display}
            onChangeText={handleAmountChange}
            keyboardType="number-pad"
            placeholder="Nhập số tiền"
            placeholderTextColor="rgba(255,255,255,0.55)"
          />
        </TouchableOpacity>
      </View>

      {/* ── Action bar ── */}
      <View style={styles.actionBar}>
        {/* Retake */}
        <TouchableOpacity
          style={[styles.sideActionBtn, { backgroundColor: sideColor, borderColor: sideBorder }]}
          onPress={onRetake}
          activeOpacity={0.75}
        >
          <Ionicons name="camera-outline" size={24} color={colors.text} />
        </TouchableOpacity>

        {/* Save */}
        <TouchableOpacity
          style={[
            styles.saveCircle,
            { backgroundColor: colors.primary, shadowColor: colors.primary },
            isSubmitting && styles.saveCircleDisabled,
          ]}
          onPress={() => onSave(Number(rawAmount), locationName || undefined)}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Ionicons name="checkmark" size={34} color="#fff" />
          )}
        </TouchableOpacity>

        {/* Wallet / category (placeholder) */}
        <TouchableOpacity
          style={[styles.sideActionBtn, { backgroundColor: sideColor, borderColor: sideBorder }]}
          activeOpacity={0.75}
        >
          <Ionicons name="pricetag-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {isSubmitting && (
        <Text style={[styles.loadingLabel, { color: colors.textSecondary }]}>
          {isUploading ? 'Đang tải ảnh lên...' : 'Đang lưu...'}
        </Text>
      )}
    </AppLayout>
  );
};
