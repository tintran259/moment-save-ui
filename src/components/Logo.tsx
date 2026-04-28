import React from 'react';
import { View, Text } from 'react-native';

interface LogoProps {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 88 }) => {
  const s = size;

  return (
    <View style={{ width: s + s * 0.12, height: s + s * 0.12 }}>
      {/* Main badge */}
      <View
        style={{
          width: s,
          height: s,
          borderRadius: s * 0.28,
          backgroundColor: '#6366F1',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#6366F1',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.45,
          shadowRadius: 18,
          elevation: 14,
        }}
      >
        {/* Subtle inner ring */}
        <View
          style={{
            position: 'absolute',
            width: s * 0.8,
            height: s * 0.8,
            borderRadius: s * 0.22,
            borderWidth: 1.5,
            borderColor: 'rgba(255,255,255,0.18)',
          }}
        />

        {/* Camera dot — top right */}
        <View
          style={{
            position: 'absolute',
            top: s * 0.13,
            right: s * 0.13,
            width: s * 0.17,
            height: s * 0.17,
            borderRadius: s * 0.085,
            backgroundColor: 'rgba(255,255,255,0.32)',
          }}
        />
        {/* Aperture dots — bottom left */}
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={{
              position: 'absolute',
              bottom: s * 0.15,
              left: s * (0.14 + i * 0.09),
              width: s * 0.06,
              height: s * 0.06,
              borderRadius: s * 0.03,
              backgroundColor: 'rgba(255,255,255,0.28)',
            }}
          />
        ))}

        {/* Bold M */}
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: s * 0.46,
            fontWeight: '800',
            letterSpacing: -1.5,
            lineHeight: s * 0.54,
          }}
        >
          M
        </Text>
      </View>

      {/* Coin badge — bottom right */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: s * 0.34,
          height: s * 0.34,
          borderRadius: s * 0.17,
          backgroundColor: '#F59E0B',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2.5,
          borderColor: '#FFFFFF',
          shadowColor: '#F59E0B',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.45,
          shadowRadius: 6,
          elevation: 8,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: s * 0.16,
            fontWeight: '800',
          }}
        >
          $
        </Text>
      </View>
    </View>
  );
};
