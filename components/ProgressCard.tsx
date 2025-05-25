import { View, Text, StyleSheet } from 'react-native';
import { Activity, TrendingUp, CreditCard as Edit, Smile } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface ProgressCardProps {
  title: string;
  value: string;
  unit: string;
  color: string;
  progress: number;
  icon: string;
}

export default function ProgressCard({ 
  title, 
  value, 
  unit, 
  color, 
  progress, 
  icon 
}: ProgressCardProps) {
  
  const getIcon = () => {
    switch(icon) {
      case 'trending-up':
        return <TrendingUp size={20} color={color} />;
      case 'edit':
        return <Edit size={20} color={color} />;
      case 'smile':
        return <Smile size={20} color={color} />;
      default:
        return <Activity size={20} color={color} />;
    }
  };
  
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        {getIcon()}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color }]}>{value}</Text>
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </View>
      
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${progress * 100}%`, backgroundColor: color }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[700],
    marginLeft: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  value: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginRight: 4,
  },
  unit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[500],
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: colors.neutral[200],
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
});