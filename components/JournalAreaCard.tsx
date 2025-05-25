import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Briefcase, Heart, Activity, Brain, Smile, DollarSign } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface JournalAreaCardProps {
  title: string;
  icon: string;
  color: string;
  lastEntry: string;
}

export default function JournalAreaCard({ 
  title, 
  icon, 
  color, 
  lastEntry 
}: JournalAreaCardProps) {

  const getIcon = () => {
    switch(icon) {
      case 'briefcase':
        return <Briefcase size={20} color={colors.white} />;
      case 'heart':
        return <Heart size={20} color={colors.white} />;
      case 'activity':
        return <Activity size={20} color={colors.white} />;
      case 'brain':
        return <Brain size={20} color={colors.white} />;
      case 'smile':
        return <Smile size={20} color={colors.white} />;
      case 'dollar-sign':
        return <DollarSign size={20} color={colors.white} />;
      default:
        return <Briefcase size={20} color={colors.white} />;
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.card,
        { borderLeftColor: color }
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        {getIcon()}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.lastEntry}>Last entry: {lastEntry}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: '1%',
    marginBottom: 16,
    flexDirection: 'column',
    borderLeftWidth: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.neutral[800],
    marginBottom: 4,
  },
  lastEntry: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.neutral[500],
  },
});