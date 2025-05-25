import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { colors } from '@/constants/colors';

interface JournalEntryCardProps {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  color: string;
}

export default function JournalEntryCard({ 
  title, 
  date, 
  excerpt, 
  category, 
  color 
}: JournalEntryCardProps) {
  
  const formattedDate = format(new Date(date), 'MMM d, yyyy');

  return (
    <TouchableOpacity 
      style={[
        styles.card,
        { borderLeftColor: color }
      ]}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <Text style={styles.excerpt} numberOfLines={2}>
        {excerpt}
      </Text>
      <View style={[styles.categoryTag, { backgroundColor: `${color}20` }]}>
        <View style={[styles.categoryDot, { backgroundColor: color }]} />
        <Text style={[styles.categoryText, { color }]}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.neutral[900],
    marginRight: 8,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.neutral[500],
  },
  excerpt: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[700],
    marginBottom: 12,
    lineHeight: 20,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});