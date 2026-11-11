import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Line, Rect, Text as SvgText } from 'react-native-svg';

import { strings } from '@/data/lesson';
import { colors, fonts, radii } from '@/theme';

const WIDTH = 360;
const HEIGHT = 170;
const thickness = [1, 1.4, 1.8, 2.4, 3, 3.8];

export function Fretboard({ leftHanded }: { leftHanded: boolean }) {
  const x = (value: number) => (leftHanded ? WIDTH - value : value);

  return (
    <View
      accessible
      accessibilityLabel="Gryf gitary z zaznaczoną niską struną E"
      style={styles.board}
    >
      <View style={styles.ratio}>
        <Svg width="100%" height="100%" viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
          {[1, 2, 3, 4, 5].map((fret) => (
            <Line key={fret} x1={x(50 + fret * 60)} y1={14} x2={x(50 + fret * 60)} y2={146} stroke="#5A4528" strokeWidth={2} />
          ))}
          <Rect x={leftHanded ? WIDTH - 54 : 46} y={10} width={8} height={140} rx={2} fill="#E8D9C0" />
          {[3, 5].map((fret) => (
            <Circle key={fret} cx={x(50 + fret * 60 - 30)} cy={80} r={5} fill="#3B2D1B" />
          ))}
          {strings.map((name, index) => {
            const y = 20 + index * 24;
            const highlighted = index === strings.length - 1;

            return (
              <G key={name + index}>
                {highlighted && (
                  <Line x1={x(54)} y1={y} x2={x(340)} y2={y} stroke={colors.primary} strokeOpacity={0.35} strokeWidth={14} strokeLinecap="round" />
                )}
                <Line
                  x1={x(54)}
                  y1={y}
                  x2={x(340)}
                  y2={y}
                  stroke={highlighted ? colors.accent : colors.textMuted}
                  strokeWidth={thickness[index]}
                />
                <SvgText
                  x={x(22)}
                  y={y + 6}
                  textAnchor="middle"
                  fontFamily={fonts.display}
                  fontSize={20}
                  fill={highlighted ? colors.primary : colors.textMuted}
                >
                  {name}
                </SvgText>
              </G>
            );
          })}
          <Circle cx={x(80)} cy={140} r={13} fill={colors.primary} />
          <SvgText x={x(80)} y={146} textAnchor="middle" fontWeight="800" fontSize={15} fill={colors.black}>
            0
          </SvgText>
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    padding: 10,
    borderRadius: radii.lg - 2,
    borderWidth: 1,
    borderColor: '#4A3418',
    backgroundColor: '#22170E',
  },
  ratio: { width: '100%', aspectRatio: WIDTH / HEIGHT },
});
