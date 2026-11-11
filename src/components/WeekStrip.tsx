import { StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { colors } from '@/theme';

const days = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];

export function WeekStrip({ todayDone }: { todayDone: boolean }) {
  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <View style={styles.week}>
      {days.map((day, index) => {
        const isToday = index === todayIndex;
        const done = isToday && todayDone;

        return (
          <View key={day} style={styles.day}>
            <View style={[styles.circle, isToday && styles.today, done && styles.done]}>
              {done ? <Icon name="check" size={16} color={colors.black} /> : null}
            </View>
            <Text style={[styles.label, isToday && styles.todayLabel]}>{isToday ? 'Dziś' : day}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  week: { flexDirection: 'row', justifyContent: 'space-between' },
  day: { alignItems: 'center', gap: 6 },
  circle: { width: 34, height: 34, borderRadius: 17, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  today: { borderStyle: 'solid', borderColor: colors.secondary, borderWidth: 2 },
  done: { backgroundColor: colors.primary, borderColor: colors.primary },
  label: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },
  todayLabel: { color: colors.secondary },
});
