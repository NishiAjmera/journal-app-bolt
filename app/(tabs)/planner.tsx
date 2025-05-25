import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { format, addDays, isSameDay } from 'date-fns';
import Header from '@/components/Header';
import PlannerTaskItem from '@/components/PlannerTaskItem';
import { colors } from '@/constants/colors';
import { plannerTasks } from '@/data/plannerTasks';

export default function PlannerScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();
  
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, i));
  
  const filteredTasks = plannerTasks.filter(task => 
    isSameDay(new Date(task.date), selectedDate)
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <Header title="Daily Planner" />
      
      <View style={styles.datePickerContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.datePickerContent}
        >
          {days.map((day, index) => {
            const isSelected = isSameDay(day, selectedDate);
            const isToday = isSameDay(day, today);
            
            return (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.dateItem,
                  isSelected && styles.dateItemSelected
                ]}
                onPress={() => setSelectedDate(day)}
              >
                <Text style={[
                  styles.dayName,
                  isSelected && styles.dateTextSelected
                ]}>
                  {format(day, 'EEE')}
                </Text>
                <Text style={[
                  styles.dayNumber,
                  isSelected && styles.dateTextSelected,
                  isToday && !isSelected && styles.todayText
                ]}>
                  {format(day, 'd')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Morning Intentions</Text>
          <View style={styles.intentionCard}>
            <Text style={styles.intentionPrompt}>
              Set your intentions for the day
            </Text>
            <TouchableOpacity style={styles.intentionButton}>
              <Text style={styles.intentionButtonText}>
                Add Intention
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <PlannerTaskItem
                key={task.id}
                title={task.title}
                category={task.category}
                completed={task.completed}
                priority={task.priority}
              />
            ))
          ) : (
            <View style={styles.emptyTasksContainer}>
              <Text style={styles.emptyTasksText}>
                No tasks scheduled for today
              </Text>
              <TouchableOpacity style={styles.addTaskButton}>
                <Text style={styles.addTaskButtonText}>
                  Add a Task
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Evening Reflection</Text>
          <View style={styles.reflectionCard}>
            <Text style={styles.reflectionPrompt}>
              What went well today? What could be improved?
            </Text>
            <TouchableOpacity style={styles.reflectionButton}>
              <Text style={styles.reflectionButtonText}>
                Add Reflection
              </Text>
            </TouchableOpacity>
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
  datePickerContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  datePickerContent: {
    paddingHorizontal: 8,
  },
  dateItem: {
    width: 54,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginHorizontal: 6,
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  dateItemSelected: {
    backgroundColor: colors.primary[600],
  },
  dayName: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.neutral[500],
    marginBottom: 4,
  },
  dayNumber: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.neutral[900],
  },
  dateTextSelected: {
    color: colors.white,
  },
  todayText: {
    color: colors.primary[600],
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.neutral[900],
    marginBottom: 16,
  },
  intentionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  intentionPrompt: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.neutral[800],
    marginBottom: 16,
  },
  intentionButton: {
    backgroundColor: colors.secondary[500],
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  intentionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.white,
  },
  emptyTasksContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyTasksText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[500],
    marginBottom: 16,
  },
  addTaskButton: {
    backgroundColor: colors.primary[500],
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addTaskButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.white,
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
    backgroundColor: colors.accent[500],
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