import { StyleSheet, Text, View } from 'react-native';
import Svg, { G, Line, Rect, Text as SvgText } from 'react-native-svg';

import { colors, radii, spacing } from '@/theme';

const lineYs = [10, 30, 50, 70, 90, 110];
const noteXs = [80, 150, 220, 290];

export function TabStrip({ activeNote }: { activeNote: number }) {
  return (
    <View accessible accessibilityLabel="Tabulatura: cztery puste dźwięki na niskiej strunie E" style={styles.card}>
      <Text style={styles.eyebrow}>TABULATURA</Text>
      <View style={styles.ratio}>
        <Svg width="100%" height="100%" viewBox="0 0 360 128">
          {lineYs.map((y) => (
            <Line key={y} x1={30} y1={y} x2={350} y2={y} stroke="#4A3B2C" strokeWidth={1.5} />
          ))}
          {['T', 'A', 'B'].map((letter, index) => (
            <SvgText key={letter} x={8} y={lineYs[2 + index] + 5} fontWeight="800" fontSize={14} fill={colors.textMuted}>
              {letter}
            </SvgText>
          ))}
          {noteXs.map((x, index) => {
            const active = index === activeNote;

            return (
              <G key={x}>
                <Rect
                  x={x - 15}
                  y={lineYs[5] - 12}
                  width={30}
                  height={24}
                  rx={8}
                  fill={active ? colors.primary : '#110E0B'}
                  stroke={colors.primary}
                  strokeWidth={1.5}
                />
                <SvgText
                  x={x}
                  y={lineYs[5] + 6}
                  textAnchor="middle"
                  fontWeight="800"
                  fontSize={17}
                  fill={active ? colors.black : colors.text}
                >
                  0
                </SvgText>
              </G>
            );
          })}
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
    padding: spacing.md - 2,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#110E0B',
  },
  eyebrow: { color: colors.textMuted, fontSize: 11, fontWeight: '800', letterSpacing: 1.6 },
  ratio: { width: '100%', aspectRatio: 360 / 128 },
});
