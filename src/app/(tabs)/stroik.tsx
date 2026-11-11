import { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { AppButton } from '@/components/AppButton';
import { Pill, Screen, TopBar } from '@/components/Screen';
import { colors, displayText, radii, spacing } from '@/theme';

const notes = ['E', 'A', 'D', 'G', 'B', 'e'];
const readings = [-38, -22, -9, 6, -3, 1, 0];
const GAUGE = 300;

export default function TunerScreen() {
  const [selected, setSelected] = useState(0);
  const [listening, setListening] = useState(false);
  const [reading, setReading] = useState(0);
  const [tuned, setTuned] = useState<number[]>([]);
  const [rotation] = useState(() => new Animated.Value(0));
  const inTune = listening && Math.abs(reading) <= 3 && reading !== 0 ? true : tuned.includes(selected) && !listening;

  useEffect(() => {
    Animated.timing(rotation, { toValue: reading, duration: 350, useNativeDriver: true }).start();
  }, [reading, rotation]);

  useEffect(() => {
    if (!listening) {
      return undefined;
    }

    let index = 0;
    const timer = setInterval(() => {
      const next = readings[index];

      index += 1;
      setReading(next);

      if (index >= readings.length) {
        clearInterval(timer);
        setListening(false);
        setTuned((previous) => (previous.includes(selected) ? previous : [...previous, selected]));
      }
    }, 650);

    return () => clearInterval(timer);
  }, [listening, selected]);

  function status() {
    if (inTune) {
      return { text: 'Nastrojona', color: colors.success };
    }

    if (!listening) {
      return { text: 'Szarpnij strunę', color: colors.textMuted };
    }

    return { text: reading < 0 ? 'Za nisko, dokręć' : 'Za wysoko, poluzuj', color: colors.textMuted };
  }

  function selectString(index: number) {
    setListening(false);
    setSelected(index);
    setReading(0);
  }

  const current = status();

  return (
    <Screen>
      <TopBar title="STROIK" right={<Pill icon="award" tone="secondary" label="Zapowiedź" />} />

      <View style={styles.card}>
        <View style={styles.gauge}>
          <Svg width={GAUGE} height={190} viewBox="0 0 300 190">
            <Path d="M30 170a120 120 0 0 1 240 0" fill="none" stroke={colors.border} strokeWidth={14} strokeLinecap="round" />
            <Path d="M126 52a120 120 0 0 1 48 0" fill="none" stroke={colors.success} strokeWidth={14} strokeLinecap="round" />
            <Circle cx={150} cy={170} r={10} fill={colors.primary} />
          </Svg>
          <Animated.View
            style={[
              styles.needleWrap,
              {
                transform: [
                  { translateY: 61 },
                  { rotate: rotation.interpolate({ inputRange: [-50, 50], outputRange: ['-50deg', '50deg'] }) },
                  { translateY: -61 },
                ],
              },
            ]}
          >
            <View style={styles.needle} />
          </Animated.View>
        </View>
        <Text style={styles.note}>{notes[selected]}</Text>
        <Text accessibilityLiveRegion="polite" style={[styles.status, { color: current.color }]}>{current.text}</Text>
      </View>

      <View style={styles.strings}>
        {notes.map((note, index) => (
          <Pressable
            key={note + index}
            accessibilityRole="button"
            accessibilityLabel={`Struna ${note}`}
            accessibilityState={{ selected: selected === index }}
            onPress={() => selectString(index)}
            style={[styles.string, tuned.includes(index) && styles.stringTuned, selected === index && styles.stringOn]}
          >
            <Text style={[styles.stringText, tuned.includes(index) && styles.stringTextTuned, selected === index && styles.stringTextOn]}>{note}</Text>
          </Pressable>
        ))}
      </View>

      <AppButton
        label={listening ? 'Słucham…' : 'Słuchaj struny'}
        icon="mic"
        onPress={() => setListening((value) => !value)}
      />
      <Text style={styles.note2}>
        To tylko pokaz wyglądu. Prawdziwy pomiar dźwięku pojawi się po testach audio na Twoim sprzęcie.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', gap: spacing.xs, padding: spacing.lg - 4, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  gauge: { width: GAUGE, height: 190 },
  needleWrap: { position: 'absolute', left: 148, top: 48, width: 4, height: 122 },
  needle: { flex: 1, width: 4, borderRadius: 2, backgroundColor: colors.primary },
  note: { ...displayText, color: colors.text, fontSize: 96, lineHeight: 100 },
  status: { fontSize: 16, fontWeight: '800' },
  strings: { flexDirection: 'row', gap: spacing.sm },
  string: { flex: 1, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 999, borderWidth: 2, borderColor: colors.border, backgroundColor: colors.surface },
  stringTuned: { borderColor: colors.success },
  stringOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  stringText: { ...displayText, color: colors.text, fontSize: 26 },
  stringTextTuned: { color: colors.success },
  stringTextOn: { color: colors.black },
  note2: { color: colors.textMuted, fontSize: 13, lineHeight: 19, textAlign: 'center' },
});
