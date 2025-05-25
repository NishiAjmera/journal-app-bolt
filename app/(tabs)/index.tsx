import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from '@/components/Header';
import ProgressCard from '@/components/ProgressCard';
import JournalAreaCard from '@/components/JournalAreaCard';
import { colors } from '@/constants/colors';
import { journalAreas } from '@/constants/journalAreas';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <Header title="Dashboard" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.progressCardsContainer}
          >
            <ProgressCard 
              title="Journal Streak" 
              value="7" 
              unit="days"
              color={colors.primary[500]} 
              progress={0.7}
              icon="trending-up"
            />
            <ProgressCard 
              title="Weekly Entries" 
              value="12" 
              unit="entries"
              color={colors.secondary[500]} 
              progress={0.6}
              icon="edit"
            />
            <ProgressCard 
              title="Mood Average" 
              value="Good" 
              unit=""
              color={colors.success[500]} 
              progress={0.8}
              icon="smile"
            />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Journal Areas</Text>
          <View style={styles.journalAreasGrid}>
            {journalAreas.map((area) => (
              <JournalAreaCard
                key={area.id}
                title={area.title}
                icon={area.icon}
                color={area.color}
                lastEntry={area.lastEntry}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Reflection</Text>
          <View style={styles.reflectionCard}>
            <Text style={styles.reflectionPrompt}>
              What are you grateful for today?
            </Text>
            <View style={styles.reflectionButton}>
              <Text style={styles.reflectionButtonText}>
                Reflect Now
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.neutral[900],
    marginBottom: 16,
  },
  progressCardsContainer: {
    paddingRight: 16,
    paddingBottom: 8,
  },
  journalAreasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  reflectionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  reflectionPrompt: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.neutral[800],
    marginBottom: 16,
  },
  reflectionButton: {
    backgroundColor: colors.primary[500],
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  reflectionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.white,
  },
});