import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, Briefcase, Heart, Activity, Brain, Smile, DollarSign } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface PlannerTaskItemProps {
  title: string;
  category: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export default function PlannerTaskItem({ 
  title, 
  category, 
  completed, 
  priority 
}: PlannerTaskItemProps) {

  const getCategoryIcon = () => {
    switch(category) {
      case 'work':
        return <Briefcase size={16} color={colors.neutral[600]} />;
      case 'personal':
        return <Heart size={16} color={colors.neutral[600]} />;
      case 'wellness':
        return <Activity size={16} color={colors.neutral[600]} />;
      case 'mental':
        return <Brain size={16} color={colors.neutral[600]} />;
      case 'emotional':
        return <Smile size={16} color={colors.neutral[600]} />;
      case 'financial':
        return <DollarSign size={16} color={colors.neutral[600]} />;
      default:
        return <Briefcase size={16} color={colors.neutral[600]} />;
    }
  };

  const getPriorityColor = () => {
    switch(priority) {
      case 'high':
        return colors.error[500];
      case 'medium':
        return colors.warning[500];
      case 'low':
        return colors.success[500];
      default:
        return colors.neutral[500];
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.checkbox,
          completed && styles.checkboxCompleted
        ]}
      >
        {completed && <Check size={16} color={colors.white} />}
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        <Text 
          style={[
            styles.title,
            completed && styles.titleCompleted
          ]}
        >
          {title}
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.categoryContainer}>
            {getCategoryIcon()}
            <Text style={styles.categoryText}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </View>
          
          <View 
            style={[
              styles.priorityIndicator,
              { backgroundColor: getPriorityColor() }
            ]} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary[400],
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.neutral[800],
    marginBottom: 8,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.neutral[400],
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.neutral[600],
    marginLeft: 6,
  },
  priorityIndicator: {
    width: 24,
    height: 8,
    borderRadius: 4,
  },
});